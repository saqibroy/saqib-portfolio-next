import type { Metadata } from 'next';
import Link from 'next/link';

import { portfolioContent } from '@/content/portfolio';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience, evidence-backed capabilities, education, languages, and CV downloads for Saqib Sohail.',
  alternates: { canonical: '/experience' },
};

const dateFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
const formatPeriod = (startDate: string, endDate: string) => `${dateFormatter.format(new Date(`${startDate}-01T00:00:00`))} – ${dateFormatter.format(new Date(`${endDate}-01T00:00:00`))}`;

export default function ExperiencePage() {
  const { profile, roles, education, capabilities } = portfolioContent;
  const rolesById = new Map(roles.map((role) => [role.id, role]));

  return <article className="experience-page">
    <header className="experience-hero">
      <p className="eyebrow">Experience</p>
      <h1>{profile.title}</h1>
      <p>{profile.summary}</p>
      <p className="experience-location">{profile.location}</p>
      <div className="homepage-actions">
        <a className="button button-primary" href={profile.downloads.ats} download>Download ATS CV</a>
        <a className="button button-secondary" href={profile.downloads.visual} download>Download visual CV</a>
      </div>
    </header>

    <section className="experience-section" aria-labelledby="experience-capabilities">
      <p className="eyebrow">Capabilities</p><h2 id="experience-capabilities">Evidence-backed areas of practice</h2>
      <div className="experience-capabilities">{capabilities.map((capability) => <article key={capability.id}>
        <h3>{capability.title}</h3><p>{capability.description}</p>
        <div>{capability.relatedRoleIds.map((id) => rolesById.get(id)).filter(Boolean).map((role) => <a key={role!.id} href={`#${role!.id}`}>{role!.company}</a>)}</div>
      </article>)}</div>
    </section>

    <section className="experience-section" aria-labelledby="experience-roles">
      <p className="eyebrow">Employment</p><h2 id="experience-roles">Roles and contributions</h2>
      <ol className="role-list">{roles.map((role) => <li key={role.id} id={role.id}>
        <div className="role-heading"><div><h3>{role.title}</h3><p>{role.company} · {role.location}</p></div><time dateTime={role.startDate}>{formatPeriod(role.startDate, role.endDate)}</time></div>
        <p className="role-tech">{role.technologies.join(' · ')}</p><ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      </li>)}</ol>
    </section>

    <section className="experience-section experience-details" aria-labelledby="experience-details">
      <div><p className="eyebrow">Education</p><h2 id="experience-details">Education</h2>{education.map((item) => <article key={item.id}><h3>{item.credential}</h3><p>{item.institution} · {item.location}</p><time dateTime={item.startDate}>{formatPeriod(item.startDate, item.endDate)}</time><p>{item.details}</p></article>)}</div>
      <div><p className="eyebrow">Languages</p><h2>Languages</h2><dl>{profile.languages.map((language) => <div key={language.name}><dt>{language.name}</dt><dd>{language.proficiency}</dd></div>)}</dl>
        <Link className="button button-secondary" href="/work">View selected work</Link>
      </div>
    </section>
  </article>;
}
