import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, caseStudySectionKeys } from '@/content/caseStudies';

type Props = { params: Promise<{ slug: string }> };
const labels = { context:'Context', problem:'Problem', constraints:'Constraints', role:'Role', architecture:'Architecture', requestDataFlow:'Request and data flow', decisions:'Decisions', alternatives:'Alternatives considered', tradeOffs:'Trade-offs', reliabilitySecurityAccessibility:'Reliability, security, and accessibility', testingDelivery:'Testing and delivery', outcome:'Outcome', nextImprovements:'Next improvements', evidence:'Evidence' } as const;

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = caseStudies.find((entry) => entry.slug === slug); return item ? { title: item.title, description: item.summary, alternates: { canonical: `/work/${slug}` } } : { title: 'Case study not found' }; }

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params; const item = caseStudies.find((entry) => entry.slug === slug); if (!item) notFound();
  return <article className="case-study">
    <nav aria-label="Breadcrumb"><Link href="/work">Work</Link><span aria-hidden="true"> / </span><span>{item.title}</span></nav>
    <header><p className="eyebrow">{item.visibility === 'private-redacted' ? 'Private / redacted case study' : 'Public case study'}</p><h1>{item.title}</h1><p>{item.summary}</p></header>
    <dl className="case-study-facts"><div><dt>Capabilities</dt><dd>{item.capabilities.join(' · ')}</dd></div><div><dt>Stack</dt><dd>{item.stack.join(' · ')}</dd></div></dl>
    <figure className="architecture-flow"><figcaption>System flow</figcaption><ol>{item.flow.map((step) => <li key={step}>{step}</li>)}</ol><p className="sr-only">{item.flow.join(' then ')}</p></figure>
    <div className="case-study-body">{caseStudySectionKeys.map((key) => item.sections[key] ? <section key={key}><h2>{labels[key]}</h2><p>{item.sections[key]}</p></section> : null)}</div>
    {item.outcomes.length > 0 && <section className="case-study-outcomes"><h2>Outcomes at a glance</h2><ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>}
  </article>;
}
