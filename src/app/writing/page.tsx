import type { Metadata } from 'next';
import Link from 'next/link';

import { getWritingPosts } from '@/lib/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Reviewed technical notes on frontend engineering, accessibility, and search quality.',
  alternates: { canonical: '/writing' },
};

const dateFormatter = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function WritingPage() {
  const posts = (await getWritingPosts()).filter((post) => post.reviewStatus !== 'needs-review');

  return <article className="writing-page">
    <header className="writing-hero">
      <p className="eyebrow">Technical writing</p>
      <h1>Notes for building dependable web products</h1>
    </header>

    <section className="writing-list" aria-label="Published articles">
      {posts.map((post) => <article key={post.slug}>
        <p className="writing-meta"><time dateTime={post.date}>{dateFormatter.format(new Date(`${post.date}T00:00:00`))}</time> · {post.readingTimeMinutes} min read</p>
        <h2><Link href={`/writing/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.description}</p>
        <ul aria-label={`${post.title} topics`}>{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </article>)}
    </section>
  </article>;
}
