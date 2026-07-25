'use client';

import { motion, useReducedMotion } from 'framer-motion';

const nodes = [
  ['Client', 28, 56], ['Link API', 180, 56], ['PostgreSQL', 332, 56],
  ['Visitor', 28, 190], ['Redirect service', 180, 190], ['Cache', 332, 190], ['PostgreSQL', 484, 190],
] as const;

const paths = [
  'M 126 78 H 180', 'M 278 78 H 332', 'M 126 212 H 180', 'M 306 212 H 332', 'M 430 212 H 484', 'M 243 234 V 276 H 510',
];

export function UrlShortenerArchitecture() {
  const reducedMotion = useReducedMotion();
  return <figure className="url-shortener-architecture">
    <figcaption>Two paths, with analytics off the redirect critical path</figcaption>
    <svg viewBox="0 0 620 340" role="img" aria-label="Creation path from client to Link API to PostgreSQL, redirect path from visitor to redirect service to cache to PostgreSQL, and an asynchronous analytics branch.">
      <defs><marker id="url-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" /></marker></defs>
      <text className="url-path-label" x="28" y="28">Create link</text><text className="url-path-label" x="28" y="162">Redirect</text>
      {paths.map((path, index) => <motion.path key={path} d={path} markerEnd="url(#url-arrow)" initial={{ pathLength: reducedMotion ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .45, delay: index * .1 }} />)}
      {nodes.map(([label, x, y], index) => <g key={`${label}-${index}`}><rect x={x} y={y} width="98" height="44" rx="7" /><text x={x + 49} y={y + 27} textAnchor="middle">{label}</text></g>)}
      <g className="url-analytics-node"><rect x="440" y="254" width="142" height="44" rx="7" /><text x="511" y="273" textAnchor="middle">Async analytics</text><text x="511" y="287" textAnchor="middle">event processing</text></g>
      {!reducedMotion ? <motion.circle r="5" initial={{ offsetDistance: '0%' }} whileInView={{ offsetDistance: '100%' }} viewport={{ once: true, amount: .6 }} transition={{ duration: 1.25, delay: .35 }} style={{ offsetPath: "path('M 126 212 H 180 H 332 H 484')" }} /> : null}
    </svg>
    <details className="url-shortener-text-equivalent"><summary>Read the request paths as text</summary><ul><li><strong>Create:</strong> Client → Link API → PostgreSQL.</li><li><strong>Redirect:</strong> Visitor → Redirect service → Cache → PostgreSQL.</li><li><strong>Analytics:</strong> The redirect service sends an event asynchronously, outside the critical redirect response.</li></ul></details>
  </figure>;
}
