const nodes = [
  { label: 'Link creator', type: 'External actor', x: 20, y: 90 },
  { label: 'Visitor', type: 'External actor', x: 20, y: 265 },
  { label: 'Next.js application', type: 'UI + API + redirects', x: 235, y: 175 },
  { label: 'PostgreSQL', type: 'Data store', x: 475, y: 90 },
  { label: 'Cache', type: 'Cache', x: 475, y: 265 },
  { label: 'Analytics worker', type: 'Async component', x: 650, y: 265 },
] as const;

const nodeWidth = 145;
const nodeHeight = 64;

function arrow(sourceX: number, sourceY: number, targetX: number, targetY: number) {
  return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
}

export function UrlShortenerArchitecture() {
  return <figure className="url-shortener-architecture">
    <figcaption>One Next.js application: creation UI, API route handlers, and redirects</figcaption>
    <svg viewBox="0 0 820 405" aria-hidden="true">
      <defs><marker id="url-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" /></marker></defs>
      <g className="url-system-boundary"><rect x="205" y="40" width="595" height="335" rx="8" /><text x="221" y="65">URL shortener</text></g>
      <g className="url-architecture-relationships">
        <path d={arrow(165, 122, 235, 207)} markerEnd="url(#url-arrow)" />
        <path d={arrow(165, 297, 235, 239)} markerEnd="url(#url-arrow)" />
        <path d={arrow(380, 207, 475, 122)} markerEnd="url(#url-arrow)" />
        <path d={arrow(380, 239, 475, 297)} markerEnd="url(#url-arrow)" />
        <path d={arrow(547, 265, 547, 154)} markerEnd="url(#url-arrow)" />
        <path className="url-async-path" d={arrow(380, 239, 650, 297)} markerEnd="url(#url-arrow)" />
      </g>
      {nodes.map((node) => <g key={node.label} className={`url-architecture-node url-architecture-node--${node.type.toLowerCase().replaceAll(' ', '-').replaceAll(':', '')}`}><rect x={node.x} y={node.y} width={nodeWidth} height={nodeHeight} rx="7" /><text x={node.x + nodeWidth / 2} y={node.y + 27} textAnchor="middle">{node.label}</text><text className="url-architecture-node-type" x={node.x + nodeWidth / 2} y={node.y + 48} textAnchor="middle">{node.type}</text></g>)}
      <g className="url-architecture-labels">
        <text x="190" y="158" textAnchor="middle">submits original URL</text>
        <text x="190" y="276" textAnchor="middle">visits short URL</text>
        <text x="425" y="151" textAnchor="middle">creates mapping</text>
        <text x="425" y="282" textAnchor="middle">resolves code</text>
        <text x="572" y="211" textAnchor="middle">cache miss</text>
        <text x="520" y="355" textAnchor="middle">event; not on redirect response</text>
      </g>
    </svg>
    <details className="url-shortener-text-equivalent"><summary>Read the architecture as text</summary><ul><li><strong>Single application:</strong> one Next.js deployment contains the creation UI, the <code>POST /api/links</code> handler, and the short-link redirect route.</li><li><strong>Create:</strong> a link creator submits an original URL. The Next.js handler validates it, generates a code, and stores the mapping in PostgreSQL.</li><li><strong>Redirect:</strong> a visitor reaches the Next.js redirect route, which checks the cache before PostgreSQL on a miss.</li><li><strong>Analytics:</strong> the redirect route emits an event to an asynchronous worker; it does not delay the redirect response.</li></ul></details>
  </figure>;
}
