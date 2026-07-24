import type { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies } from '@/content/caseStudies';

export const metadata: Metadata = { title: 'Work', description: 'Selected engineering case studies by Saqib Sohail.', alternates: { canonical: '/work' } };

export default function WorkPage() {
  return <div className="work-page">
    <header className="work-hero"><p className="eyebrow">Selected work</p><h1>Engineering decisions in context</h1><p>Reviewed case studies across product frontend architecture, service integration, platform modernisation, and delivery.</p></header>
    <section className="work-grid" aria-label="Case studies">{caseStudies.map((item) => <article key={item.slug} className="work-card">
      <p className="project-card-label">{item.visibility === 'private-redacted' ? 'Private / redacted' : 'Public project'}</p><h2>{item.title}</h2><p>{item.summary}</p>
      <ul>{item.capabilities.map((value) => <li key={value}>{value}</li>)}</ul><Link href={`/work/${item.slug}`}>Read case study →</Link>
    </article>)}</section>
  </div>;
}
