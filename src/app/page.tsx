import Link from 'next/link';

import { SystemFlow } from '@/components/home/SystemFlow';
import { portfolioContent } from '@/content/portfolio';

const featuredProjectIds = ['ai-assisted-contract-workflow', 'jobs-tracker-bot', 'tactical-tech-modernisation'];

export default function HomePage() {
  const { profile, metrics, capabilities, projects, writing } = portfolioContent;
  const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.id));

  return (
    <div className="homepage">
      <section className="homepage-hero" aria-labelledby="homepage-title">
        <p className="eyebrow">Berlin, Germany · {profile.positioning}</p>
        <h1 id="homepage-title">{profile.headline}</h1>
        <p className="homepage-proposition">{profile.proposition}</p>
        <div className="homepage-actions">
          <a className="button button-primary" href={profile.downloads.ats}>Download ATS CV</a>
          <Link className="button button-secondary" href="/experience">View experience</Link>
        </div>
      </section>

      <section className="proof-strip" aria-label="Selected evidence">
        {metrics.map((metric) => (
          <div key={metric.id}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="homepage-section" aria-labelledby="systems-title">
        <div className="section-intro">
          <p className="eyebrow">How I work</p>
          <h2 id="systems-title">Product systems, from interface to production</h2>
          <p>{profile.summary}</p>
        </div>
        <SystemFlow capabilities={capabilities.slice(0, 5)} />
      </section>

      <section className="homepage-section" aria-labelledby="work-title">
        <div className="section-intro section-intro-row">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Evidence before adjectives</h2>
          </div>
          <p>Concise project summaries now; full, reviewed case studies follow in the work phase.</p>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <article key={project.id} className="project-card">
              <p className="project-card-label">{project.visibility === 'private-redacted' ? 'Private / redacted' : 'Public project'}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul aria-label={`${project.title} technologies`}>
                {project.technologies.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <Link href={`/work/${project.slug}`}>Read case study</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="homepage-section homepage-section-muted" aria-labelledby="capabilities-title">
        <div className="section-intro">
          <p className="eyebrow">Capabilities</p>
          <h2 id="capabilities-title">Grounded in delivery</h2>
        </div>
        <div className="capability-grid">
          {capabilities.slice(0, 4).map((capability) => (
            <article key={capability.id}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="homepage-section writing-preview" aria-labelledby="writing-title">
        <div className="section-intro section-intro-row">
          <div>
            <p className="eyebrow">Writing</p>
            <h2 id="writing-title">Technical notes under review</h2>
          </div>
          <Link href="/blog">Browse writing</Link>
        </div>
        <div className="writing-preview-list">
          {writing.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <span>{article.categories[0]}</span>
              <strong>{article.title}</strong>
              <span>Read note →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-panel" aria-labelledby="contact-title">
        <p className="eyebrow">Let&apos;s talk</p>
        <h2 id="contact-title">Have a product problem worth untangling?</h2>
        <p>I&apos;m open to senior frontend and full-stack engineering conversations in Germany and across Europe.</p>
        <div className="homepage-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>Email Saqib</a>
          <a className="button button-secondary" href={profile.downloads.ats}>Download ATS CV</a>
        </div>
      </section>
    </div>
  );
}
