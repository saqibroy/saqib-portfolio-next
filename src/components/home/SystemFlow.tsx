'use client';

import { useId, useState } from 'react';

import type { Capability } from '@/content/portfolio';

const nodes = ['Product problem', 'Interface', 'API', 'Service', 'Data/AI', 'Production'] as const;
const lenses = ['Frontend', 'Full-stack', 'Applied AI'] as const;
type Lens = (typeof lenses)[number];

const lensDetails: Record<Lens, { title: string; description: string; nodes: string[] }> = {
  Frontend: {
    title: 'Frontend lens',
    description: 'Start with an accessible interface, clear state boundaries, and an interaction model that survives real product complexity.',
    nodes: ['Product problem', 'Interface', 'API'],
  },
  'Full-stack': {
    title: 'Full-stack lens',
    description: 'Connect interface decisions to APIs, service responsibilities, data flow, and production integration.',
    nodes: ['Interface', 'API', 'Service', 'Production'],
  },
  'Applied AI': {
    title: 'Applied-AI lens',
    description: 'Treat data and AI as bounded product capabilities: structured input, service contracts, retrieval, and user-facing outcomes.',
    nodes: ['Product problem', 'Service', 'Data/AI', 'Production'],
  },
};

export function SystemFlow({ capabilities }: { capabilities: readonly Capability[] }) {
  const [lens, setLens] = useState<Lens>('Frontend');
  const [selectedNode, setSelectedNode] = useState<(typeof nodes)[number]>('Product problem');
  const detailsId = useId();
  const detail = lensDetails[lens];
  const selectNextLens = (current: Lens, direction: 1 | -1) => {
    const nextIndex = (lenses.indexOf(current) + direction + lenses.length) % lenses.length;
    setLens(lenses[nextIndex]);
  };

  return (
    <div className="system-flow">
      <div className="system-flow-tabs" role="tablist" aria-label="System flow lenses">
        {lenses.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={lens === item}
            aria-controls={detailsId}
            tabIndex={lens === item ? 0 : -1}
            onClick={() => setLens(item)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') selectNextLens(item, 1);
              if (event.key === 'ArrowLeft') selectNextLens(item, -1);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="system-flow-nodes" aria-label="Product system flow">
        <svg className="system-flow-connections" aria-hidden="true" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M 7 5 H 93" />
        </svg>
        {nodes.map((node, index) => (
          <button
            key={node}
            type="button"
            className={detail.nodes.includes(node) ? 'is-active' : ''}
            aria-pressed={selectedNode === node}
            onClick={() => setSelectedNode(node)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {node}
          </button>
        ))}
      </div>
      <section id={detailsId} className="system-flow-details" role="tabpanel" aria-live="polite">
        <h3>{detail.title}</h3>
        <p>{detail.description} Selected focus: {selectedNode}.</p>
        <ul>
          {capabilities.filter((capability) => detail.description.toLowerCase().includes('ai') ? capability.id === 'applied-ai-integration' : true).slice(0, 3).map((capability) => <li key={capability.id}>{capability.title}</li>)}
        </ul>
      </section>
      <p className="system-flow-text">{nodes.join(' → ')}</p>
    </div>
  );
}
