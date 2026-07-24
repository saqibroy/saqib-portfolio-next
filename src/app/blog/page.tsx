import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notes } from "@/lib/content";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Engineering notes",
  description:
    "Concise notes on application boundaries, frontend modernisation and product engineering decisions.",
  path: "/blog",
});

export default function NotesPage() {
  return (
    <main id="main-content" className="page-shell shell notes-page">
      <header className="page-intro">
        <p className="kicker">Engineering notes / 03</p>
        <h1>Writing about the decision, not the trend.</h1>
        <p>
          Short notes grounded in verified work. No generated summaries, novelty
          badges or speculative scale claims.
        </p>
      </header>

      <section className="notes-list" aria-label="Published engineering notes">
        {notes.map((note, index) => (
          <article key={note.slug}>
            <span>0{index + 1}</span>
            <div>
              <p className="kicker">{note.readingTime} read</p>
              <h2>
                <Link href={`/blog/${note.slug}`}>{note.title}</Link>
              </h2>
              <p>{note.description}</p>
            </div>
            <Link
              href={`/blog/${note.slug}`}
              aria-label={`Read ${note.title}`}
              className="notes-arrow"
            >
              <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
