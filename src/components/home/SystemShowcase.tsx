'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';

const systems = [
  {
    id: 'ai', label: 'Applied AI',
    text: 'Structured contract input moves through the React editor and Django application API to a bounded FastAPI service for retrieval, model output, and structured document updates. Stripe remains a separate access branch.',
    nodes: ['Structured input', 'React editor', 'Django API', 'FastAPI AI', 'Vector retrieval / RAG', 'Model', 'Structured update'],
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

export function SystemShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = useId();
  const system = systems[active];

  useEffect(() => {
    setEnhanced(true);
  }, []);

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

  return <section className={`system-showcase${enhanced ? ' system-showcase--enhanced' : ''}`} aria-labelledby="system-showcase-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="system-showcase-heading"><p className="eyebrow">Selected systems</p><h2 id="system-showcase-title">Real flows, not generic diagrams</h2></div>
    <div className="system-showcase-tabs" role="tablist" aria-label="Selected systems">
      {systems.map((item, index) => <button key={item.id} ref={(element) => { tabRefs.current[index] = element; }} type="button" role="tab" aria-selected={active === index} aria-controls={panelId} tabIndex={active === index ? 0 : -1} onClick={() => { setActive(index); setPaused(true); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }}>{item.label}</button>)}
    </div>
    <div id={panelId} className={`system-showcase-panel system-showcase-panel--${system.id}`} role="tabpanel" aria-live="polite">
      <AnimatePresence mode="wait"><motion.svg key={system.id} viewBox="0 0 720 330" role="img" aria-label={`${system.label} architecture`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <defs><marker id="system-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" /></marker></defs>
        {['M 160 101 H 195', 'M 325 101 H 360', 'M 490 101 H 525', 'M 590 132 V 213 H 30', 'M 160 213 H 195', 'M 325 213 H 360'].map((path, index) => <motion.path key={path} d={path} markerEnd="url(#system-arrow)" initial={{ pathLength: reducedMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * .12, duration: .45 }} />)}
        {system.nodes.map((node, index) => { const x = 30 + (index % 4) * 165; const y = index < 4 ? 70 : 182; const [first, second] = node.split(' / '); return <g key={node}><rect x={x} y={y} width="130" height="62" rx="8" /><text x={x + 65} y={second ? y + 23 : y + 34} textAnchor="middle"><tspan x={x + 65}>{first}</tspan>{second ? <tspan x={x + 65} dy="14">/ {second}</tspan> : null}</text>{!reducedMotion && index === Math.min(active + 1, system.nodes.length - 1) ? <motion.circle cx={x + 65} cy={y + 52} r="4" initial={{ opacity: 0, scale: 1 }} animate={{ opacity: [0, 1, 0], scale: [1, 1.7, 1] }} transition={{ duration: 1.8 }} /> : null}</g>; })}
      </motion.svg></AnimatePresence>
      <p>{system.text}</p>
      <details><summary>Read the {system.label.toLowerCase()} flow as text</summary><ol>{system.nodes.map((node) => <li key={node}>{node}</li>)}</ol></details>
    </div>
    <div className="system-showcase-all-flows" aria-label="All selected systems, text version">{systems.map((item) => <details key={item.id} open><summary>{item.label}</summary><p>{item.text}</p><ol>{item.nodes.map((node) => <li key={node}>{node}</li>)}</ol></details>)}</div>
  </section>;
}
