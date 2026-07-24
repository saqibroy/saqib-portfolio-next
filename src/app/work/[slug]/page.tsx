import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { JsonLd } from "@/components/ui/JsonLd";
import { caseStudies, getCaseStudy } from "@/lib/content";
import { createMetadata, siteUrl } from "@/lib/seo/metadata";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return createMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((item) => item.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: `${siteUrl}/work/${study.slug}`,
    creator: {
      "@type": "Person",
      name: "Saqib Sohail",
    },
    keywords: study.technologies.join(", "),
  };

  return (
    <main id="main-content" className="case-study-page">
      <JsonLd data={creativeWorkJsonLd} />
      <header className="case-study-hero shell">
        <Link className="back-link" href="/work">
          <ArrowLeft aria-hidden="true" size={16} />
          All work
        </Link>
        <p className="kicker">{study.eyebrow}</p>
        <h1>{study.title}</h1>
        <p className="case-study-lede">{study.summary}</p>
        {study.confidential ? (
          <p className="confidential-note">
            Confidential employer details are omitted. Diagrams show only verified,
            abstracted responsibilities.
          </p>
        ) : null}
      </header>

      <div className="case-study-body shell">
        <aside className="case-study-nav" aria-label="Case study sections">
          <span>Contents</span>
          <ol>
            <li>
              <a href="#context">Context</a>
            </li>
            <li>
              <a href="#boundaries">System boundaries</a>
            </li>
            <li>
              <a href="#decisions">Decisions</a>
            </li>
            <li>
              <a href="#quality">Quality</a>
            </li>
            <li>
              <a href="#outcome">Outcome</a>
            </li>
          </ol>
        </aside>

        <article className="case-study-content">
          <section id="context" className="case-section two-column-section">
            <div>
              <p className="kicker">Context</p>
              <h2>What the work needed to connect.</h2>
            </div>
            <div>
              <h3>Context</h3>
              <p>{study.context}</p>
              <h3>Problem</h3>
              <p>{study.problem}</p>
            </div>
          </section>

          <section className="case-section split-lists">
            <div>
              <p className="kicker">Constraints</p>
              <ul>
                {study.constraints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker">My responsibility</p>
              <ul>
                {study.responsibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="boundaries" className="case-section">
            <p className="kicker">System boundaries</p>
            <h2>Responsibility before technology.</h2>
            <ol className="boundary-list">
              {study.boundaries.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </section>

          <ArchitectureDiagram architecture={study.architecture} />

          <section id="decisions" className="case-section">
            <p className="kicker">Decisions</p>
            <h2>Choices made visible.</h2>
            <div className="decision-list">
              {study.decisions.map((decision, index) => (
                <article key={decision.title}>
                  <span>D{String(index + 1).padStart(2, "0")}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="case-section">
            <p className="kicker">Alternatives and tradeoffs</p>
            <h2>Every boundary has a cost.</h2>
            <div className="tradeoff-grid">
              {study.tradeoffs.map((tradeoff) => (
                <article key={tradeoff.title}>
                  <h3>{tradeoff.title}</h3>
                  <p>{tradeoff.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="quality" className="case-section">
            <p className="kicker">Accessibility, reliability and testing</p>
            <h2>Quality evidence, without filling the gaps.</h2>
            <div className="quality-grid">
              {study.quality.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="outcome" className="case-section split-lists outcome-section">
            <div>
              <p className="kicker">Outcome</p>
              <ul>
                {study.outcome.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker">What I would improve next</p>
              <ul>
                {study.next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="case-section technology-section">
            <p className="kicker">Technologies and links</p>
            <h2>Implementation set.</h2>
            <ul className="tag-list">
              {study.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <p className="evidence-note">
              Project-specific links are omitted where a verified public URL has not
              been supplied. See the{" "}
              <a href="https://github.com/saqibroy">GitHub profile</a> for public work.
            </p>
          </section>
        </article>
      </div>

      <nav className="next-study shell" aria-label="Next case study">
        <span>Next case study</span>
        <Link href={`/work/${nextStudy.slug}`}>
          {nextStudy.title}
          <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </main>
  );
}

