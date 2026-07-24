import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { EvidenceStrip } from "@/components/home/EvidenceStrip";
import { SystemBlueprint } from "@/components/home/SystemBlueprint";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  caseStudies,
  profile,
  projects,
  systemDesignApproach,
} from "@/lib/content";

export default function HomePage() {
  const secondaryProjects = projects.filter(
    (project) => project.slug !== "jobs-tracker-bot",
  );

  return (
    <main id="main-content">
      <section className="bg-navy text-white">
        <div className="mx-auto grid w-[min(calc(100%-2rem),var(--shell))] gap-12 py-14 lg:py-20 xl:grid-cols-[minmax(0,0.92fr)_minmax(36rem,1.08fr)] xl:items-center xl:gap-10">
          <div>
            <div className="flex items-center gap-4">
              <span
                className="hidden h-px w-10 bg-verdigris sm:block"
                aria-hidden="true"
              />
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.17em] text-verdigris">
                Portfolio / Systems notebook / 2026
              </p>
            </div>
            <h1 className="mt-7 max-w-2xl font-sans text-[clamp(3.25rem,4.3vw,4rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white">
              <span className="xl:block">I design and build </span>
              <span className="xl:block">web products across </span>
              <span className="xl:block">interfaces, services </span>
              <span className="xl:block">and AI workflows.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/68 md:text-lg">
              {profile.hero.supporting}
            </p>
            <p className="mt-5 max-w-xl font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.12em] text-white/60">
              {profile.hero.roleLine}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex items-center gap-2.5 bg-cerulean px-5 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-verdigris hover:text-navy"
                href="/work"
              >
                View selected work <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <a
                className="inline-flex items-center gap-2.5 border border-rule-dark px-5 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:border-cerulean"
                href="/Saqib_Sohail_CV.pdf"
                download
              >
                Download CV <ArrowDown aria-hidden="true" size={17} />
              </a>
              <a
                className="inline-flex items-center gap-2 border-b border-verdigris px-1 py-2 text-sm font-semibold text-white no-underline"
                href={`mailto:${profile.email}`}
              >
                Contact <Mail aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
          <SystemBlueprint />
        </div>
      </section>

      <EvidenceStrip />

      <section
        className="mx-auto w-[min(calc(100%-2rem),var(--shell))] py-24 md:py-32"
        id="selected-work"
      >
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="The problem, the boundary, the decision."
          description="Three case studies grounded in delivered work, with responsibility and outcomes stated before technology."
        />
        <div className="mt-14 border-y border-rule">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
        <div className="mt-8">
          <ArrowLink href="/work">View the complete work index</ArrowLink>
        </div>
      </section>

      <section className="border-y border-rule bg-paper">
        <div className="mx-auto w-[min(calc(100%-2rem),var(--shell))] py-24 md:py-32">
          <SectionHeading
            index="02"
            eyebrow="Working approach"
            title="System design starts with product clarity."
            description="A practical sequence for exposing responsibilities and tradeoffs without implying enterprise scale."
          />
          <ol className="relative mt-16 list-none p-0 before:absolute before:bottom-8 before:left-[1.15rem] before:top-8 before:w-px before:bg-rule md:grid md:grid-cols-5 md:gap-0 md:before:left-0 md:before:right-0 md:before:top-[1.4rem] md:before:h-px md:before:w-auto">
            {systemDesignApproach.map((item) => (
              <li
                className="relative grid grid-cols-[3rem_1fr] gap-4 pb-10 last:pb-0 md:block md:border-l md:border-rule md:px-5 md:pb-0 md:first:border-l-0 md:first:pl-0"
                key={item.step}
              >
                <span className="relative z-10 grid size-9 place-items-center border border-cerulean bg-paper font-mono text-[0.64rem] text-cerulean">
                  {item.step}
                </span>
                <div className="md:mt-7">
                  <h3 className="font-serif text-2xl leading-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100%-2rem),var(--shell))] py-24 md:py-32">
        <SectionHeading
          index="03"
          eyebrow="Open source"
          title="Focused tools with explicit jobs."
          description="Two additional verified projects. Jobs Tracker Bot is covered once, in selected work above."
        />
        <div className="mt-14 grid border-y border-rule md:grid-cols-2 md:divide-x md:divide-rule">
          {secondaryProjects.map((project, index) => (
            <article
              key={project.slug}
              className={`py-8 md:px-9 ${index === 0 ? "border-b border-rule md:border-b-0 md:pl-0" : "md:pr-0"}`}
            >
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-cerulean">
                {project.technologies.join(" · ")}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-ink">
                {project.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
                {project.description}
              </p>
              <ul className="mt-6 grid gap-2 border-l border-rule pl-5 text-sm text-ink">
                {project.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
