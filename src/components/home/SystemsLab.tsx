'use client';

import dynamic from 'next/dynamic';
import { Component, type ErrorInfo, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import type { Capability } from '@/content/portfolio';

const SystemTopologyCanvas = dynamic(
  () => import('./SystemTopologyCanvas').then((module) => module.SystemTopologyCanvas),
  { ssr: false },
);

const stages = [
  {
    label: 'Product problem',
    chapter: 'Frame the system',
    description: 'Start with the user decision, operational constraint, and evidence the product must make understandable.',
  },
  {
    label: 'Interface',
    chapter: 'Model the interaction',
    description: 'Turn complex workflows into accessible controls, explicit state, and responsive product feedback.',
  },
  {
    label: 'API boundary',
    chapter: 'Define the contract',
    description: 'Keep validation, errors, and ownership legible where browser and backend responsibilities meet.',
  },
  {
    label: 'Service',
    chapter: 'Separate responsibilities',
    description: 'Use service boundaries to contain integration complexity without hiding the end-to-end product flow.',
  },
  {
    label: 'Data/AI',
    chapter: 'Bound uncertain capability',
    description: 'Treat retrieval and model output as constrained inputs to a product workflow, not as the interface itself.',
  },
  {
    label: 'Production',
    chapter: 'Close the delivery loop',
    description: 'Make testing, observability, accessibility, and deployment part of the design rather than a final hand-off.',
  },
] as const;

const lenses = ['Frontend', 'Full-stack', 'Applied AI'] as const;
type Lens = (typeof lenses)[number];

const lensCopy: Record<Lens, { title: string; description: string; capabilityIds: string[] }> = {
  Frontend: {
    title: 'Frontend lens',
    description: 'Interaction architecture, state boundaries, accessibility, and delivery performance stay connected to the product problem.',
    capabilityIds: ['product-frontend-architecture', 'accessibility-and-performance'],
  },
  'Full-stack': {
    title: 'Full-stack lens',
    description: 'Interface decisions continue through API contracts, service integration, persistence, and production delivery.',
    capabilityIds: ['full-stack-feature-ownership', 'api-and-service-integration', 'testing-and-delivery'],
  },
  'Applied AI': {
    title: 'Applied-AI lens',
    description: 'Structured input, retrieval, and inference remain behind explicit service boundaries with predictable user-facing outcomes.',
    capabilityIds: ['applied-ai-integration', 'api-and-service-integration'],
  },
};

type NetworkInformation = { saveData?: boolean };

function canRenderWebGL() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

class CanvasBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Systems Lab canvas unavailable; semantic fallback retained.', error, info.componentStack);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function SystemsLab({ capabilities }: { capabilities: readonly Capability[] }) {
  const [lens, setLens] = useState<Lens>('Frontend');
  const [activeStage, setActiveStage] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const labRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const detailsId = useId();
  const lensDetails = lensCopy[lens];

  useEffect(() => {
    const element = labRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting && canRenderWebGL()) setCanvasReady(true);
      },
      { rootMargin: '320px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cleanup = () => {};
    let cancelled = false;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const triggers = chapterRefs.current.flatMap((chapter, index) =>
        chapter
          ? [
              ScrollTrigger.create({
                trigger: chapter,
                start: 'top 62%',
                end: 'bottom 38%',
                onEnter: () => setActiveStage(index),
                onEnterBack: () => setActiveStage(index),
              }),
            ]
          : [],
      );
      cleanup = () => triggers.forEach((trigger) => trigger.kill());
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  const moveLens = (current: Lens, direction: 1 | -1) => {
    const index = (lenses.indexOf(current) + direction + lenses.length) % lenses.length;
    setLens(lenses[index]);
    tabRefs.current[index]?.focus();
  };

  const staticDiagram = (
    <div className="systems-lab-static" data-testid="systems-lab-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );

  return (
    <div ref={labRef} className="systems-lab" data-canvas={canvasReady ? 'ready' : 'fallback'}>
      <div className="systems-lab-toolbar">
        <div className="systems-lab-tabs" role="tablist" aria-label="System flow lenses">
          {lenses.map((item) => (
            <button
              key={item}
              ref={(element) => {
                tabRefs.current[lenses.indexOf(item)] = element;
              }}
              type="button"
              role="tab"
              aria-selected={lens === item}
              aria-controls={detailsId}
              tabIndex={lens === item ? 0 : -1}
              onClick={() => setLens(item)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') moveLens(item, 1);
                if (event.key === 'ArrowLeft') moveLens(item, -1);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <p>Choose a lens, then explore each system boundary.</p>
      </div>

      <div className="systems-lab-layout">
        <div className="systems-lab-visual">
          <div className="systems-lab-visual-frame">
            <p className="systems-lab-kicker" aria-hidden="true">SYSTEM / 0{activeStage + 1}</p>
            {canvasReady ? (
              <CanvasBoundary fallback={staticDiagram}>
                <SystemTopologyCanvas activeStage={activeStage} lens={lens} active={visible} />
              </CanvasBoundary>
            ) : staticDiagram}
            <ol className="systems-lab-stage-controls" aria-label="System stages">
              {stages.map((stage, index) => (
                <li key={stage.label}>
                  <button
                    type="button"
                    aria-current={activeStage === index ? 'step' : undefined}
                    onClick={() => setActiveStage(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {stage.label}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <section id={detailsId} className="systems-lab-details" role="tabpanel" aria-live="polite">
            <p className="eyebrow">{lensDetails.title}</p>
            <h3>{stages[activeStage].label}</h3>
            <p>{lensDetails.description}</p>
            <ul aria-label={`${lens} capability evidence`}>
              {capabilities
                .filter((capability) => lensDetails.capabilityIds.includes(capability.id))
                .map((capability) => <li key={capability.id}>{capability.title}</li>)}
            </ul>
          </section>
        </div>

        <div className="systems-lab-chapters">
          {stages.map((stage, index) => (
            <section
              key={stage.label}
              ref={(element) => {
                chapterRefs.current[index] = element;
              }}
              className={activeStage === index ? 'is-active' : ''}
              aria-labelledby={`system-stage-${index}`}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3 id={`system-stage-${index}`}>{stage.chapter}</h3>
              <p>{stage.description}</p>
              <button type="button" onClick={() => setActiveStage(index)}>Focus {stage.label}</button>
            </section>
          ))}
        </div>
      </div>

      <p className="systems-lab-text">
        <span className="sr-only">Equivalent system flow: </span>
        {stages.map((stage) => stage.label).join(' → ')}
      </p>
    </div>
  );
}
