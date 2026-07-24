import { evidence } from "@/lib/content";

export function EvidenceStrip() {
  return (
    <section
      className="border-y border-rule bg-paper"
      aria-labelledby="evidence-title"
    >
      <div className="mx-auto w-[min(calc(100%-2rem),var(--shell))] py-7">
        <p
          className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cerulean"
          id="evidence-title"
        >
          Verified evidence
        </p>
        <dl className="mt-5 grid divide-y divide-rule sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {evidence.map((item) => (
            <div
              className="min-h-36 py-5 sm:px-5 sm:first:pl-0 lg:py-3"
              key={item.context}
            >
              <dt className="flex items-baseline gap-2">
                <strong className="font-serif text-4xl font-normal text-ink">
                  {item.value}
                </strong>
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-cerulean">
                  {item.label}
                </span>
              </dt>
              <dd className="mt-3 max-w-44 text-sm leading-snug text-ink-muted">
                {item.context}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
