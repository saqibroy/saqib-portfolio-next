import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PrimaryNavigation } from "./PrimaryNavigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 w-[min(calc(100%-2rem),var(--shell))] items-center justify-between">
        <Link
          className="group flex items-center gap-3 no-underline"
          href="/"
          aria-label="Saqib Sohail, home"
        >
          <span className="grid size-10 place-items-center bg-cerulean font-mono text-xs font-medium tracking-[0.18em] text-white transition-colors group-hover:bg-ink">
            SS
          </span>
          <span className="flex flex-col font-serif text-lg leading-none text-ink">
            Saqib Sohail
            <small className="mt-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.13em] text-ink-muted">
              Senior Full-Stack Engineer
            </small>
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <PrimaryNavigation />
          <a
            className="hidden items-center gap-1.5 border-b border-cerulean pb-0.5 text-sm font-semibold text-ink no-underline transition-colors hover:text-cerulean sm:flex"
            href="mailto:saqib@ssohail.com"
          >
            Contact <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
