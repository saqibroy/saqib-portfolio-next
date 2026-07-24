import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Layout from '@/components/Layout';
import ArticleContent from '@/components/writing/ArticleContent';
import { getWritingPostBySlug, getWritingPosts } from '@/lib/writing';

type PostPageProps = {
  params: { slug: string };
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export async function generateStaticParams() {
  const posts = await getWritingPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getWritingPostBySlug(params.slug);
  if (!post) return { title: 'Article not found' };

  const title = `${post.title} | Saqib Sohail`;
  const url = `https://ssohail.com/blog/${post.slug}`;

  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      type: 'article',
      url,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: { card: 'summary', title, description: post.description },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getWritingPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <Layout>
      <main className="pb-20 pt-28 sm:pt-32">
        <article className="container mx-auto max-w-5xl px-4">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <Link href="/" className="rounded hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/blog" className="rounded hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Writing</Link>
          </nav>

          <header className="mx-auto mb-10 max-w-4xl text-center">
            <p className="mb-4 text-sm text-gray-400">
              <time dateTime={post.date}>{dateFormatter.format(new Date(`${post.date}T00:00:00`))}</time>
              <span aria-hidden="true"> · </span>
              {post.readingTimeMinutes} min read
              {post.author && <><span aria-hidden="true"> · </span>{post.author}</>}
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-6xl">{post.title}</h1>
            <p className="text-lg leading-relaxed text-gray-300 md:text-xl">{post.description}</p>
          </header>

          {post.image && (
            <Image
              src={post.image}
              alt=""
              width={1200}
              height={675}
              priority
              className="mb-10 aspect-video w-full rounded-2xl object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          )}

          <ul className="mb-12 flex flex-wrap justify-center gap-2" aria-label="Topics">
            {post.tags.map((tag) => <li key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-gray-200">{tag}</li>)}
          </ul>

          <div className="prose prose-invert prose-lg mx-auto max-w-3xl prose-headings:scroll-mt-28 prose-headings:text-white prose-p:leading-relaxed prose-a:text-cyan-300 prose-strong:text-white">
            <ArticleContent source={post.body} />
          </div>
        </article>
      </main>
    </Layout>
  );
}
