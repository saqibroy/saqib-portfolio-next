import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/seo/JsonLd';
import { ArchitectureMap } from '@/components/work/ArchitectureMap';
import { caseStudies, type CaseStudy } from '@/content/caseStudies';
import { portfolioContent } from '@/content/portfolio';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((entry) => entry.slug === slug);
  return item ? { title: item.title, description: item.summary, alternates: { canonical: `/work/${slug}` } } : { title: 'Case study not found' };
}

function ArchitectureText({ item }: { item: CaseStudy }) {
  const outgoing = new Map(item.visual.nodes.map((node) => [node.id, item.visual.edges.filter((edge) => edge.source === node.id)]));
  const nodesById = new Map(item.visual.nodes.map((node) => [node.id, node]));

  return <details className="architecture-text-equivalent">
    <summary>Read the system as text</summary>
    <ol>{item.visual.nodes.map((node) => <li key={node.id}><strong>{node.label}</strong>{node.detail ? <span>{node.detail}</span> : null}{(outgoing.get(node.id) ?? []).length > 0 ? <span>Connects to {(outgoing.get(node.id) ?? []).map((edge) => `${nodesById.get(edge.target)?.label}${edge.label ? ` (${edge.label})` : ''}`).join(', ')}.</span> : null}</li>)}</ol>
  </details>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = caseStudies.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const evidence = portfolioContent.evidence.find((entry) => entry.id === item.evidence.evidenceId);

  return <article className="case-study">
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: item.title, description: item.summary, url: `https://ssohail.com/work/${item.slug}`, author: { '@type': 'Person', name: 'Saqib Sohail' }, keywords: item.stack.join(', ') }} />
    <nav className="case-study-breadcrumb" aria-label="Breadcrumb"><Link href="/work">Work</Link><span aria-hidden="true"> / </span><span>{item.title}</span></nav>

    <header className="case-study-snapshot">
      <div className="case-study-snapshot-copy">
        <p className="eyebrow">{item.visibility === 'private-redacted' ? 'Private / redacted' : 'Public project'}</p>
        <h1>{item.title}</h1><p>{item.summary}</p>
        <dl><div className="case-study-snapshot-role"><dt>Role</dt><dd>{item.role}</dd></div><div><dt>Result</dt><dd>{item.result}</dd></div><div><dt>Stack</dt><dd>{item.stack.join(' · ')}</dd></div></dl>
      </div>
    </header>

    <section className="case-study-system" aria-labelledby="system-title">
      <div className="case-study-section-heading"><p className="eyebrow">System architecture</p><h2 id="system-title">The building blocks in view</h2></div>
      <figure className="case-study-architecture"><ArchitectureMap title={item.title} visual={item.visual} /><ArchitectureText item={item} /></figure>
    </section>

    <section className="case-study-decisions" aria-labelledby="decisions-title">
      <div className="case-study-section-heading"><p className="eyebrow">Key decisions</p><h2 id="decisions-title">What shaped the implementation</h2></div>
      <div>{item.decisions.map((decision) => <article key={decision.title}><h3>{decision.title}</h3><dl><div><dt>Reason</dt><dd>{decision.reason}</dd></div><div><dt>Trade-off</dt><dd>{decision.tradeoff}</dd></div></dl></article>)}</div>
    </section>

    <section className="case-study-outcome" aria-labelledby="outcome-title">
      <div className="case-study-section-heading"><p className="eyebrow">Outcome</p><h2 id="outcome-title">Verified delivery</h2></div>
      <div className="case-study-outcomes">{item.outcomes.map((outcome) => <article key={`${outcome.value}-${outcome.label}`}><strong>{outcome.value}</strong><h3>{outcome.label}</h3>{outcome.context ? <p>{outcome.context}</p> : null}</article>)}</div>
      {evidence?.url ? <div className="case-study-evidence"><a href={evidence.url} target="_blank" rel="noreferrer">{item.evidence.label} <span aria-hidden="true">↗</span></a></div> : null}
    </section>
  </article>;
}
