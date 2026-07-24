import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { caseStudies, projects } from "@/lib/content";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Selected work",
  description:
    "Case studies in application-flow design, frontend modernisation and open-source product engineering.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main-content" className="page-shell shell">
      <header className="page-intro">
        <p className="kicker">Work / 01</p>
        <h1>Selected product engineering work.</h1>
        <p>
          The emphasis is on the problem, the responsibility boundary and the
          decision—not a catalogue of technologies.
        </p>
      </header>

      <section aria-labelledby="case-studies-heading">
        <div className="list-heading">
          <h2 id="case-studies-heading">Case studies</h2>
          <span>03 selected</span>
        </div>
        <div className="case-list">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </section>

      <section className="work-projects" aria-labelledby="projects-heading">
        <div className="list-heading">
          <h2 id="projects-heading">Verified open-source projects</h2>
          <span>03 projects</span>
        </div>
        <div className="project-table">
          {projects.map((project, index) => (
            <article key={project.slug}>
              <span>0{index + 1}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <p>{project.technologies.join(" / ")}</p>
              {project.caseStudySlug ? (
                <ArrowLink href={`/work/${project.caseStudySlug}`}>
                  Case study
                </ArrowLink>
              ) : (
                <span className="muted-label">Project summary</span>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

