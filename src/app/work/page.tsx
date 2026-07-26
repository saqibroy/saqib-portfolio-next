import type { Metadata } from 'next';
import Link from 'next/link';

import { caseStudies } from '@/content/caseStudies';

export const metadata: Metadata = { title: 'Work', description: 'Selected engineering case studies by Saqib Sohail.', alternates: { canonical: '/work' } };

export default function WorkPage() {
  return <div className="work-page">
    <header className="work-hero"><p className="eyebrow">Selected work</p><h1>Product systems in context</h1><p>Concise case studies covering product workflows, platform modernisation, and public engineering projects.</p></header>
    <section className="work-grid" aria-label="Case studies">{caseStudies.map((item) => <article key={item.slug} className="work-card">
      <div className="work-card-heading"><p className="project-card-label">{item.visibility === 'private-redacted' ? 'Private / redacted' : 'Public project'}</p><h2>{item.title}</h2></div>
      <div className="work-card-details"><p>{item.summary}</p><p className="work-card-result"><strong>Result:</strong> {item.result}</p><ul aria-label={`${item.title} stack`}>{item.stack.slice(0, 5).map((value) => <li key={value}>{value}</li>)}</ul><Link href={`/work/${item.slug}`}>Read case study →</Link></div>
    </article>)}</section>
  </div>;
}
