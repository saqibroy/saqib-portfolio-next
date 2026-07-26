const nodes = [
  { label: 'Link creator', type: 'External actor', x: 20, y: 70 },
  { label: 'Visitor', type: 'External actor', x: 20, y: 270 },
  {
    label: 'Next.js application',
    type: 'UI + API + redirects',
    x: 220,
    y: 170,
  },
  { label: 'PostgreSQL', type: 'Source of truth', x: 455, y: 70 },
  { label: 'Redis cache', type: 'Optional cache', x: 455, y: 270 },
  { label: 'Event queue', type: 'Async buffer', x: 635, y: 205 },
  { label: 'Analytics worker', type: 'Async processor', x: 635, y: 305 },
] as const

const nodeWidth = 145
const nodeHeight = 64

function arrow(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
) {
  return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`
}

export function UrlShortenerArchitecture() {
  return (
    <figure className="url-shortener-architecture">
      <figcaption>
        One Next.js application with separate create, redirect and analytics flows
      </figcaption>

      <svg
        viewBox="0 0 820 420"
        role="img"
        aria-labelledby="url-architecture-title url-architecture-description"
      >
        <title id="url-architecture-title">URL shortener architecture</title>
        <desc id="url-architecture-description">
          A link creator submits a long URL to a Next.js application, which validates
          it and stores the mapping in PostgreSQL. A visitor opens a short URL, and
          the application checks Redis before falling back to PostgreSQL. Click
          events are published to a queue and processed asynchronously.
        </desc>

        <defs>
          <marker
            id="url-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" />
          </marker>
        </defs>

        <g className="url-system-boundary">
          <rect x="195" y="35" width="605" height="350" rx="8" />
          <text x="212" y="60">
            URL shortener
          </text>
        </g>

        <g className="url-architecture-relationships">
          <path
            d={arrow(165, 102, 220, 198)}
            markerEnd="url(#url-arrow)"
          />
          <path
            d={arrow(165, 302, 220, 232)}
            markerEnd="url(#url-arrow)"
          />

          <path
            d={arrow(365, 198, 455, 102)}
            markerEnd="url(#url-arrow)"
          />

          <path
            d={arrow(365, 232, 455, 302)}
            markerEnd="url(#url-arrow)"
          />
          <path
            className="url-cache-miss-path"
            d={arrow(365, 214, 455, 134)}
            markerEnd="url(#url-arrow)"
          />
          <path
            className="url-cache-fill-path"
            d={arrow(455, 150, 365, 246)}
            markerEnd="url(#url-arrow)"
          />

          <path
            className="url-async-path"
            d={arrow(365, 246, 635, 237)}
            markerEnd="url(#url-arrow)"
          />
          <path
            className="url-async-path"
            d={arrow(707, 269, 707, 305)}
            markerEnd="url(#url-arrow)"
          />
        </g>

        {nodes.map((node) => (
          <g
            key={node.label}
            className={`url-architecture-node url-architecture-node--${node.type
              .toLowerCase()
              .replaceAll(' ', '-')
              .replaceAll(':', '')}`}
          >
            <rect
              x={node.x}
              y={node.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="7"
            />
            <text
              x={node.x + nodeWidth / 2}
              y={node.y + 27}
              textAnchor="middle"
            >
              {node.label}
            </text>
            <text
              className="url-architecture-node-type"
              x={node.x + nodeWidth / 2}
              y={node.y + 48}
              textAnchor="middle"
            >
              {node.type}
            </text>
          </g>
        ))}

        <g className="url-architecture-labels">
          <text x="184" y="145" textAnchor="middle">
            submits original URL
          </text>
          <text x="185" y="285" textAnchor="middle">
            visits short URL
          </text>

          <text x="420" y="145" textAnchor="middle">
            creates mapping
          </text>
          <text x="412" y="282" textAnchor="middle">
            1. cache lookup
          </text>
          <text x="424" y="184" textAnchor="middle">
            2. DB fallback
          </text>
          <text x="420" y="255" textAnchor="middle">
            3. populate cache
          </text>

          <text x="505" y="225" textAnchor="middle">
            click event
          </text>
          <text x="746" y="292" textAnchor="middle">
            consume
          </text>
        </g>
      </svg>

      <details className="url-shortener-text-equivalent">
        <summary>Read the architecture as text</summary>
        <ul>
          <li>
            <strong>Single application:</strong> one Next.js deployment contains
            the creation UI, the <code>POST /api/links</code> handler and the
            short-link redirect route.
          </li>
          <li>
            <strong>Create:</strong> a link creator submits an original URL. The
            Next.js handler validates it, generates a code and stores the mapping
            in PostgreSQL.
          </li>
          <li>
            <strong>Redirect:</strong> a visitor reaches the Next.js redirect
            route. The application checks Redis first and queries PostgreSQL on a
            cache miss, then populates the cache.
          </li>
          <li>
            <strong>Analytics:</strong> the redirect route publishes a click event
            to a queue. A separate worker consumes it asynchronously, so analytics
            processing does not delay the redirect response.
          </li>
        </ul>
      </details>
    </figure>
  )
}