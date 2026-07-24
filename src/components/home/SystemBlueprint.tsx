"use client";

import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import { motion, MotionConfig, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SystemBlueprintCanvas = dynamic(
  () =>
    import("./SystemBlueprintCanvas").then(
      (module) => module.SystemBlueprintCanvas,
    ),
  { ssr: false },
);

const layers = [
  {
    number: "01",
    label: "Product interface",
    detail: "React · Next.js · TypeScript",
  },
  {
    number: "02",
    label: "Application services",
    detail: "Django · FastAPI · Node.js",
  },
  {
    number: "03",
    label: "Data and AI",
    detail: "SQL · vector retrieval · LLM integration",
  },
  {
    number: "04",
    label: "Quality and delivery",
    detail: "Accessibility · performance · testing · Docker / CI",
  },
] as const;

const narrative = [
  {
    number: "01",
    title: "Capture structured input",
    detail: "Merge fields and clause choices become explicit application data.",
  },
  {
    number: "02",
    title: "Coordinate the product flow",
    detail: "The application backend validates and routes the request.",
  },
  {
    number: "03",
    title: "Retrieve and infer",
    detail: "The AI service combines LLM inference with vector retrieval.",
  },
  {
    number: "04",
    title: "Return editable content",
    detail: "Contract content returns to the browser-based editor.",
  },
] as const;

function canUseWebGlEnhancement() {
  if (typeof window === "undefined") return false;

  const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
  const hasEnoughMemory =
    navigatorWithMemory.deviceMemory === undefined ||
    navigatorWithMemory.deviceMemory >= 4;

  return (
    window.matchMedia("(min-width: 960px)").matches &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    navigator.hardwareConcurrency >= 4 &&
    hasEnoughMemory
  );
}

export function SystemBlueprint() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [replayToken, setReplayToken] = useState(0);
  const [webGlEnabled, setWebGlEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [narrativeStep, setNarrativeStep] = useState(0);
  const hasAutoPlayed = useRef(false);
  const replayStopTimer = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWebGlEnabled(canUseWebGlEnhancement());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(
    () => () => {
      if (replayStopTimer.current !== null) {
        window.clearTimeout(replayStopTimer.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!inView || reduceMotion || hasAutoPlayed.current) return;

    hasAutoPlayed.current = true;
    const startFrame = window.requestAnimationFrame(() => setPlaying(true));
    const stopTimer = window.setTimeout(() => setPlaying(false), 7400);

    return () => {
      window.cancelAnimationFrame(startFrame);
      window.clearTimeout(stopTimer);
    };
  }, [inView, reduceMotion]);

  useEffect(() => {
    if (!playing) return;

    const timers = [
      window.setTimeout(() => setNarrativeStep(0), 0),
      window.setTimeout(() => setNarrativeStep(1), 1550),
      window.setTimeout(() => setNarrativeStep(2), 3450),
      window.setTimeout(() => setNarrativeStep(3), 5350),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [playing, replayToken]);

  function replayFlow() {
    if (replayStopTimer.current !== null) {
      window.clearTimeout(replayStopTimer.current);
    }
    setNarrativeStep(0);
    setReplayToken((value) => value + 1);
    setPlaying(true);
    replayStopTimer.current = window.setTimeout(() => {
      setPlaying(false);
      replayStopTimer.current = null;
    }, 7400);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        aria-labelledby="blueprint-title"
        className="blueprint-grid relative overflow-hidden border border-rule-dark bg-navy-soft"
        data-webgl={webGlEnabled ? "enabled" : "fallback"}
        data-animation={playing ? "running" : "idle"}
      >
        <div className="flex flex-col gap-5 border-b border-rule-dark px-5 py-5 sm:flex-row sm:items-end sm:justify-between lg:px-7">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-verdigris">
              Interactive system blueprint
            </p>
            <h2
              id="blueprint-title"
              className="mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl"
            >
              From structured input to editable contract.
            </h2>
          </div>
          <button
            type="button"
            onClick={replayFlow}
            className="inline-flex w-fit items-center gap-2 border border-rule-dark bg-navy px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/75 transition-colors hover:border-cerulean hover:text-white"
            aria-label="Replay system request flow"
          >
            <RotateCcw aria-hidden="true" size={14} />
            Replay flow
          </button>
        </div>

        <p className="sr-only">
          A request starts in a React, Next.js and TypeScript interface, moves
          through the Django application flow to a FastAPI service for LLM inference
          and vector retrieval, then returns through the application service to the
          interface. Accessibility, performance, testing and delivery concerns span
          the complete flow.
        </p>

        <div className="relative h-[17rem] overflow-hidden sm:h-[20rem] lg:h-[22rem]">
          <svg
            key={`svg-${replayToken}`}
            viewBox="0 0 900 360"
            role="img"
            aria-label="Request and response path across three application boundaries with a cross-cutting quality rail"
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              webGlEnabled ? "opacity-20" : "opacity-100"
            }`}
          >
            <defs>
              <linearGradient id="quality-rail" x1="0" x2="1">
                <stop stopColor="#0081a7" />
                <stop offset="1" stopColor="#00afb9" />
              </linearGradient>
            </defs>
            {[135, 385, 635].map((x, index) => (
              <g key={x}>
                <rect
                  x={x}
                  y="75"
                  width="130"
                  height="145"
                  fill="#0b2a37"
                  stroke={index === 1 ? "#00afb9" : "#4d908e"}
                  strokeWidth="2"
                />
                <path
                  d={`M ${x} 75 l 24 -18 h 130 l -24 18`}
                  fill="#102f3c"
                  stroke={index === 1 ? "#00afb9" : "#4d908e"}
                  strokeWidth="2"
                />
                <text
                  x={x + 16}
                  y="112"
                  fill="#ffffff"
                  fontFamily="var(--font-ibm-mono)"
                  fontSize="18"
                >
                  0{index + 1}
                </text>
                <circle cx={x + 108} cy="98" r="4" fill="#00afb9" />
              </g>
            ))}
            <path
              d="M 90 155 C 150 155 165 148 220 148 S 375 148 450 148 S 625 148 700 148 S 785 166 822 166"
              fill="none"
              stroke="#536f79"
              strokeWidth="2"
              strokeDasharray="6 9"
            />
            {!reduceMotion && inView ? (
              <motion.circle
                data-testid="request-marker"
                r="7"
                fill="#00afb9"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 4.2, ease: "easeInOut" }}
                style={{
                  offsetPath:
                    "path('M 90 155 C 150 155 165 148 220 148 S 375 148 450 148 S 625 148 700 148 S 785 166 822 166')",
                  filter: "drop-shadow(0 0 8px #00afb9)",
                }}
              />
            ) : (
              <circle cx="822" cy="166" r="7" fill="#00afb9" />
            )}
            <rect
              x="135"
              y="270"
              width="630"
              height="5"
              fill="url(#quality-rail)"
            />
            <path
              d="M 200 270 V 235 M 450 270 V 235 M 700 270 V 235"
              stroke="#4d908e"
              strokeWidth="2"
            />
            <text
              x="135"
              y="305"
              fill="#83a5af"
              fontFamily="var(--font-ibm-mono)"
              fontSize="12"
              letterSpacing="2"
            >
              04 · CROSS-CUTTING QUALITY AND DELIVERY
            </text>
          </svg>

          {webGlEnabled ? (
            <SystemBlueprintCanvas
              replayToken={replayToken}
              active={inView && !reduceMotion && playing}
            />
          ) : null}

          <div
            className="absolute bottom-4 left-4 right-4 z-10 border border-rule-dark bg-navy/92 px-4 py-3 backdrop-blur-sm sm:left-auto sm:w-[21rem] lg:bottom-5 lg:right-5"
            aria-live="polite"
          >
            <div className="flex gap-4">
              <span className="font-mono text-[0.68rem] text-verdigris">
                {narrative[narrativeStep].number}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {narrative[narrativeStep].title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  {narrative[narrativeStep].detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ol
          className="grid list-none border-t border-rule-dark p-0 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="System boundaries"
        >
          {layers.map((layer) => (
            <li
              key={layer.number}
              className="min-h-28 border-b border-rule-dark p-4 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="font-mono text-[0.68rem] text-verdigris">
                {layer.number}
              </span>
              <h3 className="mt-2 font-sans text-sm font-semibold text-white">
                {layer.label}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-white/55">
                {layer.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </MotionConfig>
  );
}
