const steps = [
  'Observe production',
  'Triage failures',
  'Add evaluation case',
  'Fix responsible layer',
  'Run regression suite',
  'Deploy and monitor',
] as const

export function RagReliabilityLoop() {
  return (
    <figure className="rag-visual rag-reliability-loop">
      <figcaption>Production failures should become permanent regression tests</figcaption>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <p>
        The loop is complete only when a disputed answer can be reproduced, fixed
        and protected against recurrence.
      </p>
    </figure>
  )
}
