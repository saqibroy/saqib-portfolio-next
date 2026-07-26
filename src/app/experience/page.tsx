import type { Metadata } from 'next';
import Link from 'next/link';

import { portfolioContent } from '@/content/portfolio';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience, selected engineering evidence, education, languages, and CV downloads for Saqib Sohail.',
  alternates: { canonical: '/experience' },
};

const dateFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
const formatPeriod = (startDate: string, endDate: string) => `${dateFormatter.format(new Date(`${startDate}-01T00:00:00`))} – ${dateFormatter.format(new Date(`${endDate}-01T00:00:00`))}`;

const capabilityGroups = [
  { title: 'Product frontend architecture', description: 'Interfaces and workflows shaped around real product state and editorial use.', technologies: 'React · Next.js · TypeScript · Vue', links: [{ label: 'Velsa workflow', href: '/work/ai-assisted-contract-workflow' }, { label: 'Tactical Tech', href: '/work/tactical-tech-platform-modernisation' }] },
  { title: 'Full-stack systems and APIs', description: 'Clear browser, API, service, and data boundaries for end-to-end delivery.', technologies: 'Django · FastAPI · REST APIs · Go', links: [{ label: 'Contract system', href: '/work/ai-assisted-contract-workflow' }, { label: 'Crawler dashboard', href: '/work/web-crawler-dashboard' }] },
  { title: 'Applied AI integration', description: 'Conversational assistance, Django-backed editing sessions, and explicit service boundaries.', technologies: 'FastAPI · RAG · vector retrieval · LLM integration', links: [{ label: 'Contract assistant workflow', href: '/work/ai-assisted-contract-workflow' }, { label: 'Velsa role', href: '#velsa-technologies' }] },
  { title: 'Accessibility, performance, and delivery', description: 'Accessible public delivery, focused performance work, and tested automation.', technologies: 'WCAG 2.1 · code splitting · Docker · CI', links: [{ label: 'Tactical Tech', href: '/work/tactical-tech-platform-modernisation' }, { label: 'Jobs Tracker', href: '/work/jobs-tracker-bot' }] },
] as const;

export default function ExperiencePage() {
  const { profile, roles, education } = portfolioContent;
  const [velsa, tactical, ...earlierRoles] = roles;

  return <article className="experience-page">
    <header className="experience-hero">
      <p className="eyebrow">Experience</p>
      <h1>{profile.title}</h1>
      <p>{profile.summary}</p>
      <p className="experience-signature"><strong>8+ years</strong><span aria-hidden="true">·</span><strong>5+ public-facing platforms</strong><span aria-hidden="true">·</span>{profile.location}</p>
      <div className="homepage-actions">
        <a className="button button-primary" href={profile.downloads.ats} download>Download ATS CV</a>
        <a className="button button-secondary" href={profile.downloads.visual} download>Download visual CV</a>
      </div>
    </header>

    <section className="experience-section experience-evidence" aria-labelledby="experience-evidence-title">
      <div><p className="eyebrow">Evidence map</p><h2 id="experience-evidence-title">How the work connects</h2></div>
      <div className="capability-evidence-grid">{capabilityGroups.map((group, index) => <article key={group.title}>
        <span className="capability-mark" aria-hidden="true">0{index + 1}</span><h3>{group.title}</h3><p>{group.description}</p><p className="capability-technologies">{group.technologies}</p>
        <div>{group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
      </article>)}</div>
    </section>

    <section className="experience-section" aria-labelledby="experience-roles">
      <div><p className="eyebrow">Employment</p><h2 id="experience-roles">Selected roles</h2></div>
      <ol className="experience-timeline">
        {[velsa, tactical].map((role) => <li key={role.id} id={role.id}><article>
          <div className="role-heading"><div><h3>{role.title}</h3><p>{role.company} · {role.location}</p></div><time dateTime={role.startDate}>{formatPeriod(role.startDate, role.endDate)}</time></div>
          <p className="role-tech">{role.technologies.join(' · ')}</p><ul>{role.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          {role.highlights.length > 3 ? <details><summary>More from this role</summary><ul>{role.highlights.slice(3).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></details> : null}
        </article></li>)}
        <li className="experience-earlier"><details><summary>Earlier full-stack roles</summary><ol>{earlierRoles.map((role) => <li key={role.id} id={role.id}><div><h3>{role.title}</h3><p>{role.company} · {role.location}</p></div><time dateTime={role.startDate}>{formatPeriod(role.startDate, role.endDate)}</time><p className="role-tech">{role.technologies.join(' · ')}</p></li>)}</ol></details></li>
      </ol>
    </section>

    <section className="experience-section experience-details" aria-labelledby="experience-details">
      <div><p className="eyebrow">Education & languages</p><h2 id="experience-details">Foundations and communication</h2>{education.map((item) => <article key={item.id}><h3>{item.credential}</h3><p>{item.institution} · {item.location}</p><time dateTime={item.startDate}>{formatPeriod(item.startDate, item.endDate)}</time><p>{item.details}</p></article>)}</div>
      <div className="language-panel"><h3>Languages</h3><dl>{profile.languages.map((language) => <div key={language.name}><dt>{language.name}</dt><dd>{language.proficiency}</dd></div>)}</dl><Link className="button button-secondary" href="/work">View selected work</Link></div>
    </section>
  </article>;
}
