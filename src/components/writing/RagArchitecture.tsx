const stages = [
  { label: 'User question', type: 'Input', x: 20, y: 135 },
  { label: 'Query processing', type: 'Rewrite + classify', x: 190, y: 135 },
  { label: 'Retrieval', type: 'Hybrid search', x: 380, y: 55 },
  { label: 'Reranking', type: 'Select evidence', x: 550, y: 55 },
  { label: 'Evidence check', type: 'Sufficient?', x: 380, y: 215 },
  { label: 'Generate answer', type: 'Structured output', x: 550, y: 215 },
  { label: 'Validate', type: 'Claims + sources', x: 720, y: 215 },
  { label: 'Refuse / escalate', type: 'Safe failure', x: 550, y: 330 },
] as const

const width = 145
const height = 62

export function RagArchitecture() {
  return (
    <figure className="rag-visual rag-architecture">
      <figcaption>
        Retrieval is only one stage in a production answer path
      </figcaption>

      <svg
        viewBox="0 0 900 430"
        role="img"
        aria-labelledby="rag-architecture-title rag-architecture-description"
      >
        <title id="rag-architecture-title">Production RAG answer architecture</title>
        <desc id="rag-architecture-description">
          A user question is processed, used to retrieve and rerank evidence, checked
          for sufficiency, then either generates a validated cited answer or follows
          a refusal and escalation path.
        </desc>

        <defs>
          <marker
            id="rag-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" />
          </marker>
        </defs>

        <g className="rag-relationships">
          <path d="M165 166 L190 166" markerEnd="url(#rag-arrow)" />
          <path d="M335 155 L380 96" markerEnd="url(#rag-arrow)" />
          <path d="M525 86 L550 86" markerEnd="url(#rag-arrow)" />
          <path d="M622 117 L500 215" markerEnd="url(#rag-arrow)" />
          <path d="M525 246 L550 246" markerEnd="url(#rag-arrow)" />
          <path d="M695 246 L720 246" markerEnd="url(#rag-arrow)" />
          <path className="rag-safe-path" d="M452 277 L550 350" markerEnd="url(#rag-arrow)" />
        </g>

        <g className="rag-edge-labels">
          <text x="520" y="174">candidate passages</text>
          <text x="535" y="232">enough evidence</text>
          <text x="455" y="322">weak or conflicting</text>
        </g>

        {stages.map((stage) => (
          <g key={stage.label} className="rag-node">
            <rect x={stage.x} y={stage.y} width={width} height={height} rx="7" />
            <text x={stage.x + width / 2} y={stage.y + 25} textAnchor="middle">
              {stage.label}
            </text>
            <text
              className="rag-node-type"
              x={stage.x + width / 2}
              y={stage.y + 45}
              textAnchor="middle"
            >
              {stage.type}
            </text>
          </g>
        ))}
      </svg>

      <details className="rag-text-equivalent">
        <summary>Read the architecture as text</summary>
        <ol>
          <li>The application classifies and, where useful, rewrites the question.</li>
          <li>Hybrid retrieval finds candidate passages and a reranker orders them.</li>
          <li>An evidence check tests whether the sources are sufficient and consistent.</li>
          <li>Supported questions receive structured, cited answers that are validated.</li>
          <li>Weak or conflicting evidence follows a refusal or human-escalation path.</li>
        </ol>
      </details>
    </figure>
  )
}
