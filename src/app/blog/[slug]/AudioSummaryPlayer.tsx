'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Play, Settings, Loader2, Sparkles, Zap } from 'lucide-react';

interface AudioSummaryPlayerProps {
  postContent: string;
  postTitle: string;
}

const AudioSummaryPlayer: React.FC<AudioSummaryPlayerProps> = ({ postContent, postTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      // Filter for English voices only
      const englishVoices = availableVoices.filter(voice => 
        voice.lang.startsWith('en')
      );
      setVoices(englishVoices.length > 0 ? englishVoices : availableVoices);
      
      // Find a good default voice (prefer female English voices)
      const defaultVoice = englishVoices.findIndex(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('karen')
      );
      if (defaultVoice !== -1) {
        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Generate summary using Gemini
  const generateSummary = async () => {
    setIsGenerating(true);
    setError('');
    setProgress(0);
    
    try {
      const response = await fetch('/api/generate-audio-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: postContent,
          model: 'gemini',
          voice: voices[selectedVoice]?.name || 'default',
          speed: speed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      
      if (data.summary) {
        setSummary(data.summary);
        if (data.warning) {
          setError(data.warning);
        }
      } else {
        throw new Error('No summary received');
      }
    } catch (err) {
      console.error('Summary generation error:', err);
      setError('Failed to generate AI summary. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!summary) {
      generateSummary();
      return;
    }

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setProgress(0);
    } else {
      const utterance = new SpeechSynthesisUtterance(summary);
      
      if (voices[selectedVoice]) {
        utterance.voice = voices[selectedVoice];
      }
      
      utterance.rate = speed;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(0);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setProgress(0);
        setError('Speech synthesis failed. Please try again.');
      };

      // Simulate progress (since we can't get real progress from Speech API)
      const words = summary.split(' ').length;
      const estimatedDuration = (words / (speed * 2.5)) * 1000; // Rough estimate
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100 / (estimatedDuration / 100));
        });
      }, 100);
      
      speechRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        {/* Gradient background with blur */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        
        {/* Main container */}
        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-2xl p-8 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                {isGenerating && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse">
                    <Sparkles className="w-3 h-3 text-white m-0.5" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Audio Summary</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-gray-300 font-medium">Powered by Gemini AI</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                showSettings 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
              title="Voice Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-6 p-6 bg-gray-800/30 rounded-xl border border-gray-600/30 backdrop-blur-sm animate-in slide-in-from-top duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Voice Selection
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(parseInt(e.target.value))}
                      className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:border-blue-500/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      {voices.map((voice, index) => (
                        <option key={index} value={index} className="bg-gray-900">
                          {voice.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Playback Speed: {speed}x
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((speed - 0.5) / 1.5) * 100}%, #374151 ${((speed - 0.5) / 1.5) * 100}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.5x</span>
                      <span>2x</span>
                    </div>
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
            <div className="mb-6 p-6 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-green-900/10 rounded-xl border border-gray-600/30 backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">AI Generated Summary</h4>
                  <p className="text-gray-200 leading-relaxed font-medium text-sm">
                    {isPlaying ? summary : (summary.length > 120 ? `${summary.substring(0, 120)}...` : summary)}
                  </p>
                </div>
              </div>
              {isPlaying && (
                <div className="mt-4 bg-gray-800/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Main Play Button */}
          <div className="flex justify-center">
            <button
              onClick={togglePlay}
              disabled={isGenerating}
              className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isGenerating
                  ? 'bg-gray-600 cursor-not-allowed'
                  : isPlaying
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg shadow-red-500/25'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25'
              }`}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center gap-3">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Generating Summary...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="w-6 h-6" />
                    <span>Pause Summary</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    <span>{summary ? 'Play Summary' : 'Generate & Play Summary'}</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Info Footer */}
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>AI-powered intelligent summarization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Browser-based text-to-speech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioSummaryPlayer;