import type { CaseStudy } from "@/content/types";

const laneLabels = {
  interface: "Product interface",
  service: "Application services",
  data: "Data and AI",
  delivery: "Quality and delivery",
} as const;

export function ArchitectureDiagram({
  architecture,
}: {
  architecture: CaseStudy["architecture"];
}) {
  return (
    <figure className="architecture-figure">
      <figcaption>
        <p className="kicker">Architecture / data flow</p>
        <h2>{architecture.title}</h2>
        <p>{architecture.description}</p>
      </figcaption>
      <div className="architecture-map">
        {(Object.keys(laneLabels) as (keyof typeof laneLabels)[]).map((lane) => {
          const nodes = architecture.nodes.filter((node) => node.lane === lane);
          if (nodes.length === 0) return null;
          return (
            <section key={lane} className="architecture-lane">
              <h3>{laneLabels[lane]}</h3>
              <div>
                {nodes.map((node) => (
                  <article key={node.id} id={`node-${node.id}`}>
                    <strong>{node.label}</strong>
                    <span>{node.detail}</span>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <ol className="architecture-edges" aria-label="Data flow">
        {architecture.edges.map((edge, index) => {
          const from = architecture.nodes.find((node) => node.id === edge.from);
          const to = architecture.nodes.find((node) => node.id === edge.to);
          return (
            <li key={`${edge.from}-${edge.to}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{from?.label}</strong>
              <span aria-hidden="true">→</span>
              <strong>{to?.label}</strong>
              <small>{edge.label}</small>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

