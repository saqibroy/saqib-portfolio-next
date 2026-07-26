'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';

const systems = [
  {
    id: 'ai', label: 'Contract assistant',
    text: 'Two React applications share Django-backed contract data. The chatbot uses a multi-step LLM flow to gather missing details, then creates or updates an editing session. The generated contract opens in the configurator with editable fields populated.',
    nodes: ['Django data', 'React chatbot', 'FastAPI AI', 'Editing session', 'Generated contract', 'Contract configurator'],
  },
  {
    id: 'content', label: 'Content & search',
    text: 'Git-backed CMS content is transformed for a REST Content API. Next.js and project-site consumers read the shared content; the central search interface queries the API across selected namespaces.',
    nodes: ['Editors / CMS', 'Git content', 'REST Content API', 'Next.js sites', 'Central search', 'Project results'],
  },
  {
    id: 'automation', label: 'Automation pipeline',
    text: 'Jobs move from ATS and provider adapters through normalisation, deterministic eligibility, fit scoring, deduplication, and persistence before immediate or digest alert routing.',
    nodes: ['Providers', 'Adapters', 'Normalised job', 'Eligibility', 'Fit score', 'Dedupe / persistence', 'Alerts'],
  },
] as const;

const nodePositions = [
  [25, 48], [200, 48], [375, 48], [375, 174], [200, 174], [25, 174], [200, 300],
] as const;

const connectorPaths = [
  'M 165 83 H 200', 'M 340 83 H 375', 'M 445 118 V 174', 'M 375 209 H 340', 'M 200 209 H 165', 'M 95 244 V 335 H 200',
];

function labelLines(label: string) {
  const [first, second] = label.split(' / ');
  if (second) return [first, `/ ${second}`];
  const words = label.split(' ');
  return words.length > 1 ? [words[0], words.slice(1).join(' ')] : [label];
}

export function SystemShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = useId();
  const system = systems[active];

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % systems.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const move = (direction: 1 | -1) => {
    const next = (active + direction + systems.length) % systems.length;
    setActive(next);
    setPaused(true);
    tabRefs.current[next]?.focus();
  };

  return <section className="system-showcase" aria-labelledby="system-showcase-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="system-showcase-heading"><p className="eyebrow">Selected systems</p><h2 id="system-showcase-title" className="sr-only">Selected systems</h2></div>
    <div className="system-showcase-tabs" role="tablist" aria-label="Selected systems">
      {systems.map((item, index) => <button key={item.id} ref={(element) => { tabRefs.current[index] = element; }} type="button" role="tab" aria-selected={active === index} aria-controls={panelId} tabIndex={active === index ? 0 : -1} onClick={() => { setActive(index); setPaused(true); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }}>{item.label}</button>)}
    </div>
    <div id={panelId} className={`system-showcase-panel system-showcase-panel--${system.id}`} role="tabpanel" aria-live="polite">
      <AnimatePresence mode="wait"><motion.svg key={system.id} viewBox="0 0 540 410" role="img" aria-label={`${system.label} architecture`}>
        <defs><marker id="system-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" /></marker></defs>
        {connectorPaths.slice(0, system.nodes.length - 1).map((path, index) => <motion.path key={path} d={path} markerEnd="url(#system-arrow)" initial={{ pathLength: reducedMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * .12, duration: .45 }} />)}
        {system.nodes.map((node, index) => { const [x, y] = nodePositions[index]; const lines = labelLines(node); return <g key={node}><rect x={x} y={y} width="140" height="70" rx="8" /><text x={x + 70} y={lines.length === 1 ? y + 42 : y + 30} textAnchor="middle">{lines.map((line, lineIndex) => <tspan key={line} x={x + 70} dy={lineIndex === 0 ? 0 : 19}>{line}</tspan>)}</text></g>; })}
      </motion.svg></AnimatePresence>
      <details><summary>Read the {system.label.toLowerCase()} summary</summary><p>{system.text}</p></details>
    </div>
    <noscript><div className="system-showcase-all-flows" aria-label="All selected systems, text version">{systems.map((item) => <details key={item.id}><summary>{item.label}</summary><p>{item.text}</p></details>)}</div></noscript>
  </section>;
}
