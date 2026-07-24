import { ArrowUpRight } from "lucide-react";
import { contactLinks, profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white" id="contact">
      <div className="mx-auto grid w-[min(calc(100%-2rem),var(--shell))] gap-10 border-b border-rule-dark py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-verdigris">
            Contact / 05
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Let&apos;s discuss the product and the system behind it.
          </h2>
        </div>
        <div className="flex flex-col justify-end">
          <p className="max-w-md text-base text-white/65">
            Based in {profile.location}. For Senior Full-Stack, Senior Frontend and
            Product Engineer conversations.
          </p>
          <a
            className="mt-6 inline-flex w-fit items-center gap-3 bg-cerulean px-5 py-3.5 font-semibold text-white no-underline transition-colors hover:bg-verdigris hover:text-navy"
            href={`mailto:${profile.email}`}
            data-testid="contact-link"
          >
            {profile.email}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
      <div className="mx-auto flex w-[min(calc(100%-2rem),var(--shell))] flex-col gap-4 py-6 font-mono text-xs uppercase tracking-[0.12em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Saqib Sohail</p>
        <ul className="flex list-none gap-6 p-0" aria-label="Profile links">
          {contactLinks
            .filter((link) => ["LinkedIn", "GitHub"].includes(link.label))
            .map((link) => (
              <li key={link.label}>
                <a href={link.href} rel="me">
                  {link.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  );
}
