import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNote, notes } from "@/lib/content";
import { createMetadata } from "@/lib/seo/metadata";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return createMetadata({
    title: note.title,
    description: note.description,
    path: `/blog/${note.slug}`,
  });
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <main id="main-content" className="article-page shell">
      <header>
        <Link className="back-link" href="/blog">
          <ArrowLeft aria-hidden="true" size={16} /> All notes
        </Link>
        <p className="kicker">Engineering note · {note.readingTime} read</p>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
      </header>
      <article>
        {note.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
      <aside className="article-related">
        <span>Related case study</span>
        <Link href={`/work/${note.relatedCaseStudy}`}>
          See the verified work <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </aside>
    </main>
  );
}
