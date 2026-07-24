import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import { getWritingPosts } from '@/lib/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Technical writing on frontend engineering, accessibility, and the web.',
  alternates: { canonical: 'https://ssohail.com/blog' },
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default async function BlogPage() {
  const posts = await getWritingPosts();

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-16 pt-32 sm:pt-36">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Technical writing</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Writing</h1>
          <p className="text-lg leading-relaxed text-gray-300">
            Notes on frontend engineering, accessibility, and building useful web experiences.
          </p>
        </header>

        <section aria-label="Articles" className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60">
              {post.image && (
                <Link href={`/blog/${post.slug}`} className="block" aria-label={`Read ${post.title}`}>
                  <Image
                    src={post.image}
                    alt=""
                    width={1200}
                    height={675}
                    className="aspect-video w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>
              )}
              <div className="p-6">
                <p className="mb-3 text-sm text-gray-400">
                  <time dateTime={post.date}>{dateFormatter.format(new Date(`${post.date}T00:00:00`))}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readingTimeMinutes} min read
                </p>
                <h2 className="mb-3 text-2xl font-semibold text-white">
                  <Link href={`/blog/${post.slug}`} className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                    {post.title}
                  </Link>
                </h2>
                <p className="mb-5 leading-relaxed text-gray-300">{post.description}</p>
                <ul className="flex flex-wrap gap-2" aria-label="Topics">
                  {post.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-gray-200">{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  );
}
