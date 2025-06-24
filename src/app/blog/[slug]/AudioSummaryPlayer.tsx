'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Play, Settings, Loader2, Sparkles, Zap, Download, RefreshCw, VolumeX, Trash2, Database } from 'lucide-react';

interface AudioSummaryPlayerProps {
  postContent: string;
  postTitle: string;
}

interface GoogleVoice {
  id: string;
  language_code: string;
  name: string;
  gender: string;
  description: string;
}

interface CachedSummary {
  text: string;
  contentHash: string;
  timestamp: number;
}

interface CachedAudio {
  blob: string; // Base64 encoded blob
  voice: string;
  speed: number;
  pitch: number;
  summaryHash: string;
  timestamp: number;
}

const AudioSummaryPlayer: React.FC<AudioSummaryPlayerProps> = ({ postContent, postTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [availableVoices, setAvailableVoices] = useState<GoogleVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('en-US-Standard-C');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0.0);
  const [volume, setVolume] = useState(1.0);
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Cache status indicators
  const [summaryFromCache, setSummaryFromCache] = useState(false);
  const [audioFromCache, setAudioFromCache] = useState(false);
  const [cacheSize, setCacheSize] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // TTS Microservice URL
  const TTS_SERVICE_URL = process.env.NEXT_PUBLIC_TTS_SERVICE_URL || 'https://ai-tts-service.onrender.com';

  // Cache configuration
  const CACHE_EXPIRY_HOURS = 240; // 24 hours
  const MAX_CACHE_SIZE_MB = 50; // 50MB limit

  // Generate hash for content
  const generateHash = (content: string): string => {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  };

  // Convert blob to base64 for localStorage
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Convert base64 to blob
  const base64ToBlob = (base64: string): Blob => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'audio/wav' });
  };

  // Cache helper functions
  const getCachedSummary = (contentHash: string): CachedSummary | null => {
    try {
      const cached = localStorage.getItem(`tts_summary_${contentHash}`);
      if (cached) {
        const data: CachedSummary = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_EXPIRY_HOURS * 60 * 60 * 1000) {
          return data;
        }
        localStorage.removeItem(`tts_summary_${contentHash}`);
      }
    } catch (error) {
      console.error('Error reading cached summary:', error);
    }
    return null;
  };

  const setCachedSummary = (contentHash: string, text: string): void => {
  try {
    const data: CachedSummary = {
      text,
      contentHash,
      timestamp: Date.now()
    };
    localStorage.setItem(`tts_summary_${contentHash}`, JSON.stringify(data));
  } catch (error: unknown) { // Explicitly type error as unknown (optional, but good for clarity)
    console.error('Error caching summary:', error);
    // Handle quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') { // Check if error is DOMException
      clearOldCache();
    } else if (error instanceof Error) { // General Error type check
      // Handle other types of errors if needed
      console.error('An unexpected error occurred:', error.message);
    }
  }
};

  const getCachedAudio = (audioKey: string): CachedAudio | null => {
    try {
      const cached = localStorage.getItem(`tts_audio_${audioKey}`);
      if (cached) {
        const data: CachedAudio = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_EXPIRY_HOURS * 60 * 60 * 1000) {
          return data;
        }
        localStorage.removeItem(`tts_audio_${audioKey}`);
      }
    } catch (error) {
      console.error('Error reading cached audio:', error);
    }
    return null;
  };

  const setCachedAudio = async (audioKey: string, audioBlob: Blob, audioData: Omit<CachedAudio, 'blob' | 'timestamp'>): Promise<void> => {
  try {
    const base64 = await blobToBase64(audioBlob);
    const data: CachedAudio = {
      ...audioData,
      blob: base64,
      timestamp: Date.now()
    };
    localStorage.setItem(`tts_audio_${audioKey}`, JSON.stringify(data));
  } catch (error: unknown) {
    console.error('Error caching audio:', error);
    // Handle quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      clearOldCache();
    } else if (error instanceof Error) {
      console.error('An unexpected error occurred during audio caching:', error.message);
    }
  }
};

  const calculateCacheSize = (): void => {
    try {
      let totalSize = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('tts_summary_') || key.startsWith('tts_audio_'))) {
          const value = localStorage.getItem(key);
          if (value) {
            totalSize += new Blob([value]).size;
          }
        }
      }
      setCacheSize(Math.round(totalSize / (1024 * 1024) * 100) / 100);
    } catch (error) {
      console.error('Error calculating cache size:', error);
    }
  };

  const clearCache = (): void => {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('tts_summary_') || key.startsWith('tts_audio_'))) {
          keys.push(key);
        }
      }
      keys.forEach(key => localStorage.removeItem(key));
      
      // Clean up current audio
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
      
      setSummary('');
      setSummaryFromCache(false);
      setAudioFromCache(false);
      setCacheSize(0);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  const clearOldCache = (): void => {
    try {
      const keys = [];
      const now = Date.now();
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('tts_summary_') || key.startsWith('tts_audio_'))) {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              const data = JSON.parse(value);
              if (now - data.timestamp > CACHE_EXPIRY_HOURS * 60 * 60 * 1000) {
                keys.push(key);
              }
            } catch (e) {
              keys.push(key); // Remove corrupted entries
            }
          }
        }
      }
      
      keys.forEach(key => localStorage.removeItem(key));
      calculateCacheSize();
    } catch (error) {
      console.error('Error clearing old cache:', error);
    }
  };

  // Load available voices
  useEffect(() => {
    const loadVoices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${TTS_SERVICE_URL}/voices`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.voices && Array.isArray(data.voices)) {
            setAvailableVoices(data.voices);
            if (data.voices.length > 0 && !data.voices.find((v: GoogleVoice) => v.id === selectedVoice)) {
              setSelectedVoice(data.voices[0].id);
            }
          }
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Failed to load voices:', error);
        setError('Failed to connect to TTS service. Please check your connection.');
        // Fallback voices
        setAvailableVoices([
          { id: 'en-GB-Standard-B', language_code: 'en-GB', name: 'en-GB-Standard-B', gender: 'MALE', description: 'British male voice' },
          { id: 'en-US-Standard-C', language_code: 'en-US', name: 'en-US-Standard-C', gender: 'FEMALE', description: 'Standard female voice' },
          { id: 'en-US-Wavenet-D', language_code: 'en-US', name: 'en-US-Wavenet-D', gender: 'MALE', description: 'WaveNet male voice (deep)' },
          { id: "en-GB-Standard-A", language_code: "en-GB", name: "en-GB-Standard-A", gender: 'FEMALE', description: "British female voice" },
          { id: "en-AU-Standard-A", language_code: "en-AU", name: "en-AU-Standard-A", gender: "FEMALE", description: "Australian female voice" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadVoices();
    clearOldCache(); // Clean up expired cache on load
  }, [TTS_SERVICE_URL]);

  // Check for cached summary on mount and content change
  useEffect(() => {
    const contentHash = generateHash(postContent);
    const cached = getCachedSummary(contentHash);
    
    if (cached) {
      setSummary(cached.text);
      setSummaryFromCache(true);
    } else {
      setSummaryFromCache(false);
    }
    
    calculateCacheSize();
  }, [postContent]);

  // Generate summary with caching
  const generateSummary = async () => {
    const contentHash = generateHash(postContent);
    
    // Check cache first
    const cached = getCachedSummary(contentHash);
    if (cached) {
      setSummary(cached.text);
      setSummaryFromCache(true);
      return cached.text;
    }

    setIsGenerating(true);
    setError('');
    setSummaryFromCache(false);
    
    try {
      const response = await fetch('/api/generate-audio-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: postContent,
          model: 'gemini',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      
      if (data.summary) {
        setSummary(data.summary);
        setCachedSummary(contentHash, data.summary);
        
        if (data.warning) {
          setError(data.warning);
        }
        
        calculateCacheSize();
        return data.summary;
      } else {
        throw new Error('No summary received');
      }
    } catch (err) {
      console.error('Summary generation error:', err);
      const fallbackSummary = postContent.substring(0, 500) + (postContent.length > 500 ? '...' : '');
      setSummary(fallbackSummary);
      setCachedSummary(contentHash, fallbackSummary);
      setError('Using original content as summary. AI summary service unavailable.');
      return fallbackSummary;
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate audio with caching
  const generateAudio = async () => {
    if (!summary) return null;

    const summaryHash = generateHash(summary);
    const audioKey = `${summaryHash}_${selectedVoice}_${speed}_${pitch}`;
    
    // Check cache first
    const cached = getCachedAudio(audioKey);
    if (cached) {
      try {
        const audioBlob = base64ToBlob(cached.blob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setAudioFromCache(true);
        return url;
      } catch (error) {
        console.error('Error loading cached audio:', error);
        // Remove corrupted cache entry
        localStorage.removeItem(`tts_audio_${audioKey}`);
      }
    }

    setIsGeneratingAudio(true);
    setError('');
    setAudioFromCache(false);

    try {
      const response = await fetch(`${TTS_SERVICE_URL}/generate-speech`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: summary,
          voice: selectedVoice,
          speed: speed,
          pitch: pitch,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`TTS Service Error: ${response.status} - ${errorText}`);
      }

      const audioBlob = await response.blob();
      
      // Revoke previous URL
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      // Cache the audio
      await setCachedAudio(audioKey, audioBlob, {
        voice: selectedVoice,
        speed,
        pitch,
        summaryHash
      });
      
      calculateCacheSize();
      return url;
    } catch (err) {
      console.error('Audio generation error:', err);
      setError(`Failed to generate audio: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return null;
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const togglePlay = async () => {
    if (!summary) {
      await generateSummary();
      return;
    }

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    let url = audioUrl;
    if (!url) {
      url = await generateAudio();
      if (!url) return;
    }

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
      
      audioRef.current.onloadstart = () => setIsPlaying(true);
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      };
      audioRef.current.onerror = (e) => {
        console.error('Audio playback error:', e);
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        setError('Audio playback failed. Please try again.');
      };
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current && audioRef.current.duration) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
          const progress = (currentTime / duration) * 100;
          setProgress(progress || 0);
          setCurrentTime(currentTime);
        }
      };

      try {
        await audioRef.current.play();
      } catch (err) {
        console.error('Playback error:', err);
        setError('Failed to play audio. Please try again.');
        setIsPlaying(false);
      }
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${postTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-summary.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const regenerateAudio = async () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    
    const url = await generateAudio();
    if (url && audioRef.current) {
      audioRef.current.src = url;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update audio properties when they change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.playbackRate = speed;
      }
    }
  }, [volume, speed, isPlaying]);

  // Regenerate audio when voice or pitch changes
  useEffect(() => {
    if (audioUrl && summary) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      setProgress(0);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.src = '';
      }
    }
  }, [selectedVoice, pitch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const getVoiceIcon = (gender: string) => {
    return gender === 'MALE' ? '👨' : '👩';
  };

  const getVoiceTypeColor = (description: string) => {
    if (description.includes('Neural')) return 'from-purple-500 to-pink-500';
    if (description.includes('WaveNet')) return 'from-blue-500 to-cyan-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <audio ref={audioRef} preload="none" />
      
      <div className="relative group">
        {/* Animated gradient background */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        
        {/* Main container */}
        <div className="relative bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 rounded-3xl p-8 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                {(isGenerating || isGeneratingAudio) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">AI Audio Summary</h3>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-gray-300 font-medium">Powered by Gemini AI + Google Cloud TTS</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Cache indicators */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-xl">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-300">{cacheSize.toFixed(2)}MB</span>
                {(summaryFromCache || audioFromCache) && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Using cached data"></div>
                )}
              </div>
              
              <button
                onClick={clearCache}
                className="p-3 rounded-xl bg-gray-800/50 text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-all duration-300 hover:scale-105"
                title="Clear Cache"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              {audioUrl && (
                <>
                  <button
                    onClick={regenerateAudio}
                    disabled={isGeneratingAudio}
                    className="p-3 rounded-xl bg-gray-800/50 text-gray-400 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    title="Regenerate Audio"
                  >
                    <RefreshCw className={`w-5 h-5 ${isGeneratingAudio ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={downloadAudio}
                    className="p-3 rounded-xl bg-gray-800/50 text-gray-400 hover:bg-green-600/20 hover:text-green-400 transition-all duration-300 hover:scale-105"
                    title="Download Audio"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </>
              )}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  showSettings 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
                title="Voice Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cache Status */}
          {(summaryFromCache || audioFromCache) && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-400" />
                <p className="text-green-300 text-sm font-medium">
                  {summaryFromCache && audioFromCache ? 'Using cached summary and audio' :
                   summaryFromCache ? 'Using cached summary' :
                   'Using cached audio'} - Instant loading!
                </p>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-8 p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-600/30 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Voice Settings
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Voice Selection */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-200">
                    Google Cloud Voice
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {isLoading ? (
                      <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-xl">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400 mr-2" />
                        <span className="text-gray-400">Loading voices...</span>
                      </div>
                    ) : (
                      availableVoices.map((voice) => (
                        <button
                          key={voice.id}
                          onClick={() => setSelectedVoice(voice.id)}
                          className={`p-4 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] ${
                            selectedVoice === voice.id
                              ? 'bg-gradient-to-r ' + getVoiceTypeColor(voice.description) + ' text-white shadow-lg border-transparent'
                              : 'bg-gray-800/30 text-gray-300 border-gray-600/30 hover:bg-gray-700/30 hover:border-gray-500/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getVoiceIcon(voice.gender)}</span>
                            <div className="flex-1">
                              <div className="font-medium">{voice.description}</div>
                              <div className="text-xs opacity-75 mt-1">
                                {voice.language_code} • {voice.gender}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Audio Controls */}
                <div className="space-y-6">
                  {/* Speed Control */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      Playback Speed: {speed}x
                    </label>
                    <input
                      type="range"
                      min="0.25"
                      max="4"
                      step="0.25"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.25x</span>
                      <span>1x</span>
                      <span>4x</span>
                    </div>
                  </div>
                  
                  {/* Pitch Control */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      Voice Pitch: {pitch > 0 ? '+' : ''}{pitch}
                    </label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      step="1"
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Lower</span>
                      <span>Normal</span>
                      <span>Higher</span>
                    </div>
                  </div>
                  
                  {/* Volume Control */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                      {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      Volume: {Math.round(volume * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Summary Preview */}
          {summary && !isGenerating && (
            <div className="mb-8 p-6 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-green-900/10 rounded-2xl border border-gray-600/30 backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    AI Generated Summary
                    {summaryFromCache && (
                      <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                        Cached
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    {summary}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              {(isPlaying || progress > 0) && (
                <div className="space-y-2">
                  <div className="bg-gray-800/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  {audioFromCache && (
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <Database className="w-3 h-3" />
                      <span>Audio loaded from cache</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Main Play Button */}
          <div className="flex justify-center">
            <button
              onClick={togglePlay}
              disabled={isGenerating || isGeneratingAudio}
              className={`group relative overflow-hidden px-12 py-6 rounded-3xl font-bold text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl ${
                isGenerating || isGeneratingAudio
                  ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                  : isPlaying
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-red-500/25'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
              }`}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center gap-4">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    <span>Generating Summary...</span>
                  </>
                ) : isGeneratingAudio ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    <span>Generating Audio...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="w-7 h-7" />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-7 h-7" />
                    <span>{summary ? 'Play AI Audio' : 'Generate & Play Summary'}</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Info Footer */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>AI-powered intelligent summarization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Google Cloud Neural TTS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Multiple voice types & controls</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-3 h-3 text-amber-400" />
                <span>Smart caching system</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          border: 2px solid white;
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          border: 2px solid white;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default AudioSummaryPlayer;