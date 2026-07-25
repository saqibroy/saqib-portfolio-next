import Link from 'next/link';

import { ProjectSystemVisual } from '@/components/home/ProjectSystemVisuals';
import { SystemShowcase } from '@/components/home/SystemShowcase';
import { caseStudies } from '@/content/caseStudies';
import { portfolioContent } from '@/content/portfolio';
import { getWritingPosts } from '@/lib/writing';

const featuredProjectIds = ['tactical-tech-modernisation', 'ai-assisted-contract-workflow', 'jobs-tracker-bot'];

export default async function HomePage() {
  const { profile, projects, roles } = portfolioContent;
  const featuredProjects = featuredProjectIds.map((id) => projects.find((project) => project.id === id)).filter((project): project is NonNullable<typeof project> => Boolean(project));
  const featuredCaseStudies = new Map(caseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]));
  const posts = (await getWritingPosts()).filter((post) => post.reviewStatus !== 'needs-review').slice(0, 3);

  return (
    <div className="homepage">
      <section className="homepage-hero" aria-labelledby="homepage-title">
        <div className="homepage-hero-copy">
          <p className="eyebrow">{profile.location}</p>
          <h1 id="homepage-title">{profile.title}</h1>
          <p className="homepage-proposition">I build accessible product interfaces and connect them to reliable backend and AI services.</p>
          <p className="homepage-supporting-copy">Eight years of experience across React, Next.js, TypeScript, Django and FastAPI—modernising platforms, designing product workflows and shipping features end to end.</p>
          <p className="homepage-signature"><strong>8+ years</strong><span aria-hidden="true">·</span><strong>5+ public-facing platforms</strong><span aria-hidden="true">·</span>{profile.location}</p>
          <div className="homepage-actions">
            <Link className="button button-primary" href="/work">View selected work</Link>
            <a className="button button-secondary" href={profile.downloads.ats}>Download ATS CV</a>
          </div>
        </div>
        <SystemShowcase />
      </section>

      <section className="homepage-section selected-work-section" aria-labelledby="work-title">
        <div className="section-intro section-intro-row">
          <div><p className="eyebrow">Selected work</p><h2 id="work-title">Real systems, concise stories</h2></div>
          <p>Three projects show the product boundaries, decisions, and outcomes behind the work.</p>
        </div>
        <div className="visual-work-stories">
          {featuredProjects.map((project) => {
            const caseStudy = featuredCaseStudies.get(project.slug);
            if (!caseStudy) return null;
            const facts = project.id === 'jobs-tracker-bot'
              ? ['520+ tests', 'Docker', 'GitHub Actions', 'Public repository']
              : project.id === 'tactical-tech-modernisation'
                ? ['Git-backed CMS', 'REST Content API', 'Central search']
                : ['FastAPI AI service', 'Vector retrieval / RAG', 'Structured updates'];
            return (
              <article key={project.id} className={`visual-work-story visual-work-story--${project.id}`}>
                <div className="visual-work-story-copy">
                  <p className="project-card-label">{project.visibility === 'private-redacted' ? 'Private / redacted' : 'Public project'}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul aria-label={`${project.title} facts`}>{facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                  <Link href={`/work/${project.slug}`}>Read case study <span aria-hidden="true">→</span></Link>
                </div>
                <div className="visual-work-story-diagram">
                  <ProjectSystemVisual variant={project.id === 'tactical-tech-modernisation' ? 'content' : project.id === 'jobs-tracker-bot' ? 'jobs' : 'ai'} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="homepage-section experience-snapshot" aria-labelledby="experience-snapshot-title">
        <div className="section-intro section-intro-row">
          <div><p className="eyebrow">Experience</p><h2 id="experience-snapshot-title">A concise delivery history</h2></div>
          <Link href="/experience">View experience <span aria-hidden="true">→</span></Link>
        </div>
        <ol>
          {roles.slice(0, 2).map((role) => <li key={role.id}><strong>{role.company}</strong><span>{role.title}</span><time>{role.startDate.slice(0, 4)}–{role.endDate.slice(0, 4)}</time></li>)}
          <li><strong>Earlier full-stack roles</strong><span>Ruby on Rails, PHP, and full-stack development</span><time>2016–2019</time></li>
        </ol>
      </section>

      <section className="homepage-section writing-preview" aria-labelledby="writing-title">
        <div className="section-intro section-intro-row">
          <div><p className="eyebrow">Writing</p><h2 id="writing-title">System design and product engineering notes</h2></div>
          <Link href="/writing">Browse writing <span aria-hidden="true">→</span></Link>
        </div>
        <div className="writing-preview-list">
          {posts.map((article) => <Link key={article.slug} href={`/writing/${article.slug}`}><span>{article.tags[0]}</span><strong>{article.title}</strong><span>Read note →</span></Link>)}
        </div>
      </section>

      <section className="contact-panel" aria-labelledby="contact-title">
        <div><p className="eyebrow">Let&apos;s talk</p><h2 id="contact-title">Have a product workflow worth simplifying?</h2><p>I&apos;m open to senior frontend and full-stack engineering conversations in Germany and across Europe.</p></div>
        <div className="homepage-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>Email Saqib</a><a className="button button-secondary" href={profile.downloads.ats}>Download ATS CV</a></div>
      </section>
    </div>
  );
}
