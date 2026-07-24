import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";

export function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <article className="group border-t border-rule py-9 first:border-t-0">
      <div className="grid gap-7 lg:grid-cols-[4rem_1.15fr_1fr_3rem]">
        <div
          className="font-mono text-xs tracking-[0.16em] text-cerulean"
          aria-hidden="true"
        >
          0{index + 1}
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
            {study.eyebrow}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">
          <Link href={`/work/${study.slug}`}>{study.title}</Link>
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {study.problem}
          </p>
        </div>
        <dl className="grid gap-5 text-sm">
          <div>
            <dt className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-cerulean">
              Responsibility
            </dt>
            <dd className="mt-1.5 leading-relaxed text-ink">
              {study.responsibility[0]}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-cerulean">
              Decision
            </dt>
            <dd className="mt-1.5 leading-relaxed text-ink">
              {study.decisions[0].description}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-cerulean">
              Outcome
            </dt>
            <dd className="mt-1.5 leading-relaxed text-ink">
              {study.outcome[0]}
            </dd>
          </div>
        </dl>
        <Link
          className="grid size-11 place-items-center self-end border border-rule text-ink no-underline transition-colors group-hover:border-cerulean group-hover:bg-cerulean group-hover:text-white"
          href={`/work/${study.slug}`}
          aria-label={`Read case study: ${study.title}`}
        >
          <ArrowRight aria-hidden="true" size={19} />
        </Link>
      </div>
    </article>
  );
}
