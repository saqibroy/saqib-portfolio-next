'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'ai' | 'content' | 'jobs' | 'crawler';

const labels: Record<Variant, string[]> = {
  ai: ['Input', 'React editor', 'Django', 'FastAPI AI', 'RAG', 'Structured update'],
  content: ['CMS editor', 'Git content', 'REST API', 'Next.js sites', 'Search UI', 'Results'],
  jobs: ['Providers', 'Adapters', 'Rules', 'Fit score', 'Deduplicate', 'Alerts'],
  crawler: ['User', 'React dashboard', 'Go / Gin API', 'Crawl lifecycle', 'GORM', 'MySQL'],
};

export function ProjectSystemVisual({ variant }: { variant: Variant }) {
  const reducedMotion = useReducedMotion();
  const nodes = labels[variant];
  const name = variant === 'ai' ? 'AI-assisted contract workflow' : variant === 'content' ? 'Tactical Tech content and search' : variant === 'jobs' ? 'Jobs Tracker' : 'Web Crawler Dashboard';
  const caption = variant === 'ai' ? 'Retrieval and model output return as structured application state; access remains a separate Stripe branch.' : variant === 'content' ? 'Shared content delivery and search integration, based on the Phase 13 repository audit.' : variant === 'jobs' ? 'Accepted roles continue to alerts; non-matching roles exit before notification.' : 'Authenticated dashboard actions move through the API to an explicit crawl lifecycle and stored state.';
  return <figure className={`project-system-visual project-system-visual--${variant}`} aria-label={`${name} system diagram`}>
    <svg viewBox="0 0 640 250" role="img" aria-hidden="true"><defs><marker id={`arrow-${variant}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" /></marker></defs>{nodes.slice(0, -1).map((_, index) => { const y = 102 + (index % 2) * 42; const nextY = 102 + ((index + 1) % 2) * 42; return <motion.path key={index} d={`M ${96 + index * 98} ${y} L ${118 + index * 98} ${nextY}`} markerEnd={`url(#arrow-${variant})`} initial={{ pathLength: reducedMotion ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: .65 }} transition={{ duration: .35, delay: index * .08 }} />; })}{nodes.map((node, index) => <g key={node}><rect x={20 + index * 98} y={80 + (index % 2) * 42} width="76" height="44" rx="6" /><text x={58 + index * 98} y={100 + (index % 2) * 42} textAnchor="middle">{node}</text></g>)}</svg>
    <figcaption>{caption}</figcaption>
  </figure>;
}
