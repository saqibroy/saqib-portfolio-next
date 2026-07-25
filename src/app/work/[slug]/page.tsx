import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/seo/JsonLd';
import { ArchitectureMap } from '@/components/work/ArchitectureMap';
import { caseStudies, type CaseStudy, type CaseStudySectionKey } from '@/content/caseStudies';
import { portfolioContent } from '@/content/portfolio';

type Props = { params: Promise<{ slug: string }> };

type Chapter = {
  id: string;
  label: string;
  fields: Array<{ key: CaseStudySectionKey; label: string }>;
};

const chapters: Chapter[] = [
  {
    id: 'context',
    label: 'Context and constraints',
    fields: [
      { key: 'context', label: 'Context' },
      { key: 'problem', label: 'Problem' },
      { key: 'constraints', label: 'Constraints' },
    ],
  },
  {
    id: 'role',
    label: 'Role and responsibilities',
    fields: [{ key: 'role', label: 'Role and responsibilities' }],
  },
  {
    id: 'architecture',
    label: 'Architecture and data flow',
    fields: [
      { key: 'architecture', label: 'Architecture' },
      { key: 'requestDataFlow', label: 'Request and data flow' },
    ],
  },
  {
    id: 'decisions',
    label: 'Decisions and trade-offs',
    fields: [
      { key: 'decisions', label: 'Decision' },
      { key: 'alternatives', label: 'Alternative considered' },
      { key: 'tradeOffs', label: 'Trade-off' },
    ],
  },
  {
    id: 'reliability',
    label: 'Reliability and accessibility',
    fields: [{ key: 'reliabilitySecurityAccessibility', label: 'Reliability, security, and accessibility' }],
  },
  {
    id: 'testing',
    label: 'Testing and delivery',
    fields: [{ key: 'testingDelivery', label: 'Testing and delivery' }],
  },
  {
    id: 'outcome',
    label: 'Outcome and evidence',
    fields: [
      { key: 'outcome', label: 'Outcome' },
      { key: 'evidence', label: 'Evidence' },
      { key: 'nextImprovements', label: 'Next improvement' },
    ],
  },
];

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((entry) => entry.slug === slug);
  return item
    ? { title: item.title, description: item.summary, alternates: { canonical: `/work/${slug}` } }
    : { title: 'Case study not found' };
}

function NarrativeBlocks({
  item,
  chapter,
}: {
  item: CaseStudy;
  chapter: Chapter;
}) {
  return (
    <div className={`dossier-narrative dossier-narrative--${chapter.id}`}>
      {chapter.fields.map(({ key, label }) => {
        const value = item.sections[key];
        return value ? (
          <div key={key}>
            <h3>{label}</h3>
            <p>{value}</p>
          </div>
        ) : null;
      })}
    </div>
  );
}

function ArchitectureText({ item }: { item: CaseStudy }) {
  const outgoing = new Map(
    item.architecture.nodes.map((node) => [
      node.id,
      item.architecture.edges.filter((edge) => edge.source === node.id),
    ]),
  );
  const nodesById = new Map(item.architecture.nodes.map((node) => [node.id, node]));

  return (
    <details className="architecture-text-equivalent" open>
      <summary>Read the architecture as text</summary>
      <ol>
        {item.architecture.nodes.map((node) => (
          <li key={node.id}>
            <strong>{node.label}</strong>
            {node.detail ? <span>{node.detail}</span> : null}
            {(outgoing.get(node.id) ?? []).length > 0 ? (
              <span>
                Connects to{' '}
                {(outgoing.get(node.id) ?? [])
                  .map((edge) => `${nodesById.get(edge.target)?.label}${edge.label ? ` (${edge.label})` : ''}`)
                  .join(', ')}.
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </details>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = caseStudies.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const evidenceRecords = item.evidenceRefs
    .map((id) => portfolioContent.evidence.find((evidence) => evidence.id === id))
    .filter(Boolean);
  const publicEvidence = evidenceRecords.find((evidence) => evidence?.url);
  const availableChapters = chapters.filter((chapter) =>
    chapter.fields.some(({ key }) => Boolean(item.sections[key])),
  );

  return (
    <article className="case-study dossier">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: item.title,
          description: item.summary,
          url: `https://ssohail.com/work/${item.slug}`,
          author: { '@type': 'Person', name: 'Saqib Sohail' },
          keywords: item.capabilities.join(', '),
        }}
      />

      <nav className="dossier-breadcrumb" aria-label="Breadcrumb">
        <Link href="/work">Work</Link>
        <span aria-hidden="true"> / </span>
        <span>{item.title}</span>
      </nav>

      <header className="dossier-hero">
        <div className="dossier-hero-copy">
          <p className="eyebrow">{item.visibility === 'private-redacted' ? 'Private / redacted case study' : 'Public case study'}</p>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          {publicEvidence?.url ? (
            <a className="dossier-evidence-link" href={publicEvidence.url} target="_blank" rel="noreferrer">
              View public repository <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>

        <dl className="dossier-facts">
          <div>
            <dt>Status</dt>
            <dd>Published</dd>
          </div>
          <div>
            <dt>Capabilities</dt>
            <dd>{item.capabilities.join(' · ')}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{item.stack.join(' · ')}</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>{publicEvidence?.url ? 'Public repository' : 'Approved portfolio brief'}</dd>
          </div>
        </dl>

        <section className="dossier-outcomes" aria-label="Outcomes">
          {item.outcomes.map((outcome) => (
            <article key={`${outcome.value}-${outcome.label}`}>
              <strong>{outcome.value}</strong>
              <h2>{outcome.label}</h2>
              {outcome.context ? <p>{outcome.context}</p> : null}
            </article>
          ))}
        </section>

        {item.evidenceBoundary ? (
          <aside className="evidence-boundary" aria-label="Evidence boundary">
            <span aria-hidden="true">BOUNDARY</span>
            <p>{item.evidenceBoundary}</p>
          </aside>
        ) : null}
      </header>

      <div className="dossier-layout">
        <aside className="dossier-toc">
          <p>On this page</p>
          <nav aria-label="Case study sections">
            <ol>
              {availableChapters.map((chapter, index) => (
                <li key={chapter.id}>
                  <a href={`#${chapter.id}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {chapter.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="dossier-content">
          {availableChapters.map((chapter, index) => (
            <section key={chapter.id} id={chapter.id} className={`dossier-chapter dossier-chapter--${chapter.id}`}>
              <header>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{chapter.label}</h2>
              </header>

              {chapter.id === 'architecture' ? (
                <>
                  <NarrativeBlocks item={item} chapter={chapter} />
                  <figure className="dossier-architecture">
                    <figcaption>Interactive system map</figcaption>
                    <ArchitectureMap nodes={item.architecture.nodes} edges={item.architecture.edges} title={item.title} />
                    <ArchitectureText item={item} />
                  </figure>
                </>
              ) : (
                <NarrativeBlocks item={item} chapter={chapter} />
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
