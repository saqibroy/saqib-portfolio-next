import Link from 'next/link';

import { HeroSignalCanvas } from '@/components/home/HeroSignalCanvas';
import { SystemsLab } from '@/components/home/SystemsLab';
import { caseStudies } from '@/content/caseStudies';
import { portfolioContent } from '@/content/portfolio';

const featuredProjectIds = ['ai-assisted-contract-workflow', 'jobs-tracker-bot', 'tactical-tech-modernisation'];

export default function HomePage() {
  const { profile, metrics, homepageMetricIds, capabilities, projects, writing } = portfolioContent;
  const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.id));
  const featuredCaseStudies = new Map(caseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]));
  const homepageMetrics = homepageMetricIds.map((id) => metrics.find((metric) => metric.id === id)!);

  return (
    <div className="homepage">
      <section className="homepage-hero" aria-labelledby="homepage-title">
        <HeroSignalCanvas />
        <div className="homepage-hero-grid">
          <div className="homepage-hero-copy">
            <p className="eyebrow">{profile.location}</p>
            <h1 id="homepage-title">{profile.title}</h1>
            <p className="homepage-proposition">{profile.proposition}</p>
            <div className="homepage-actions">
              <a className="button button-primary" href={profile.downloads.ats}>Download ATS CV</a>
              <Link className="button button-secondary" href="/work">Explore selected work</Link>
            </div>
          </div>
          <div className="homepage-hero-index" aria-label="Engineering focus">
            <span>Product systems</span>
            <strong>Interface</strong>
            <strong>Services</strong>
            <strong>Applied AI</strong>
            <small>Accessible by default · Built for production</small>
          </div>
        </div>
      </section>

      <section className="proof-field" aria-label="Selected evidence">
        {homepageMetrics.map((metric, index) => (
          <article key={metric.id} className="proof-card">
            <span className="proof-card-index" aria-hidden="true">0{index + 1}</span>
            <div>
              <strong>{metric.value}</strong>
              <h2>{metric.label}</h2>
              <p>{metric.context}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="homepage-section systems-section" aria-labelledby="systems-title">
        <div className="section-intro">
          <p className="eyebrow">How I work</p>
          <h2 id="systems-title">From product problem to production system</h2>
          <p>Move through the system as a product decision travels from interface architecture to service boundaries, data, and delivery.</p>
        </div>
        <SystemsLab capabilities={capabilities} />
      </section>

      <section className="homepage-section" aria-labelledby="work-title">
        <div className="section-intro section-intro-row">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Systems, decisions, and outcomes</h2>
          </div>
          <p>Case studies show the boundaries, trade-offs, and evidence behind each implementation.</p>
        </div>
        <div className="selected-work">
          {featuredProjects.map((project, index) => {
            const caseStudy = featuredCaseStudies.get(project.slug);
            return (
              <article key={project.id} className="selected-work-card">
                <div className="selected-work-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <div className="selected-work-main">
                  <p className="project-card-label">{project.visibility === 'private-redacted' ? 'Private / redacted' : 'Public project'}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <Link href={`/work/${project.slug}`}>Open engineering dossier <span aria-hidden="true">↗</span></Link>
                </div>
                <div className="selected-work-evidence">
                  <p>{caseStudy?.outcomes[0]}</p>
                  <ul aria-label={`${project.title} technologies`}>
                    {project.technologies.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <span className="selected-work-flow" aria-hidden="true">
                    {caseStudy?.flow.slice(0, 4).map((step) => <i key={step} title={step} />)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
        <Link className="section-link" href="/work">View all case studies <span aria-hidden="true">→</span></Link>
      </section>

      <section className="homepage-section homepage-section-muted" aria-labelledby="capabilities-title">
        <div className="section-intro">
          <p className="eyebrow">Capabilities</p>
          <h2 id="capabilities-title">Engineering range, grounded in delivery</h2>
        </div>
        <div className="capability-grid">
          {capabilities.slice(0, 4).map((capability) => (
            <article key={capability.id}>
              <span aria-hidden="true">{String(capabilities.indexOf(capability) + 1).padStart(2, '0')}</span>
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
            <h2 id="writing-title">Notes on frontend systems, accessibility, and delivery</h2>
          </div>
          <Link href="/writing">Browse writing</Link>
        </div>
        <div className="writing-preview-list">
          {writing.map((article) => (
            <Link key={article.id} href={`/writing/${article.slug}`}>
              <span>{article.categories[0]}</span>
              <strong>{article.title}</strong>
              <span>Read note →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-panel" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Let&apos;s talk</p>
          <h2 id="contact-title">Have a product system worth untangling?</h2>
          <p>I&apos;m open to senior frontend and full-stack engineering conversations in Germany and across Europe.</p>
        </div>
        <div className="homepage-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>Email Saqib</a>
          <a className="button button-secondary" href={profile.downloads.ats}>Download ATS CV</a>
        </div>
      </section>
    </div>
  );
}
