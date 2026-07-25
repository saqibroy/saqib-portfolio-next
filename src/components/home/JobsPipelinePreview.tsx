'use client';

import { useState } from 'react';

const nodes = [
  ['Providers', 'ATS and provider adapters collect source-specific role data.'],
  ['Normalisation', 'Different payloads become one consistent job model.'],
  ['Eligibility', 'Deterministic Germany and Berlin rules run before scoring.'],
  ['Fit score', 'Role relevance remains a separate, reviewable decision.'],
  ['Deduplication', 'Previously processed roles do not trigger repeat alerts.'],
  ['Alerts', 'New matches route to immediate or digest notifications.'],
] as const;

export function JobsPipelinePreview() {
  const [active, setActive] = useState(0);

  return (
    <section className="jobs-pipeline-preview" aria-label="Jobs Tracker pipeline preview">
      <div className="jobs-pipeline-nodes" role="list">
        {nodes.map(([label, detail], index) => (
          <div key={label} role="listitem"><button
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            onPointerEnter={() => setActive(index)}
          >
            {label}
            <span className="sr-only">: {detail}</span>
          </button></div>
        ))}
      </div>
      <p aria-live="polite">{nodes[active][1]}</p>
    </section>
  );
}
