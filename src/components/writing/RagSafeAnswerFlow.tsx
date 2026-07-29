const outcomes = [
  {
    label: 'Supported answer',
    description: 'Current, consistent evidence directly answers the question.',
  },
  {
    label: 'Clarification required',
    description: 'A missing detail such as country, product or date changes the answer.',
  },
  {
    label: 'Refuse or escalate',
    description: 'Evidence is weak, missing or conflicting, so the assistant does not guess.',
  },
] as const

export function RagSafeAnswerFlow() {
  return (
    <figure className="rag-visual rag-reliability-loop rag-safe-answer-flow">
      <figcaption>A safe assistant selects an outcome based on evidence</figcaption>
      <ol>
        {outcomes.map((outcome, index) => (
          <li key={outcome.label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{outcome.label}</strong>
            <small>{outcome.description}</small>
          </li>
        ))}
      </ol>
    </figure>
  )
}
