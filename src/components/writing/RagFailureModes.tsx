const failureModes = [
  {
    stage: '01',
    title: 'Ingestion',
    description: 'Missing documents, broken parsing, weak chunk boundaries or lost table structure.',
  },
  {
    stage: '02',
    title: 'Governance',
    description: 'Outdated, duplicated, contradictory or unapproved source material.',
  },
  {
    stage: '03',
    title: 'Retrieval',
    description: 'The correct evidence exists but does not rank highly enough.',
  },
  {
    stage: '04',
    title: 'Context',
    description: 'Useful passages are truncated, noisy or mixed with conflicting evidence.',
  },
  {
    stage: '05',
    title: 'Generation',
    description: 'The answer adds, combines or overgeneralises claims beyond the evidence.',
  },
  {
    stage: '06',
    title: 'Citation',
    description: 'A real source is shown, but it does not support every material claim.',
  },
] as const

export function RagFailureModes() {
  return (
    <figure className="rag-visual rag-failure-modes">
      <figcaption>Six places a grounded assistant can still become unreliable</figcaption>
      <div className="rag-failure-grid">
        {failureModes.map((mode) => (
          <article key={mode.stage}>
            <span>{mode.stage}</span>
            <h3>{mode.title}</h3>
            <p>{mode.description}</p>
          </article>
        ))}
      </div>
    </figure>
  )
}
