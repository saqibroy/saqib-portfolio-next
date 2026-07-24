import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ArticleContent from '@/components/writing/ArticleContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { getWritingPostBySlug, getWritingPosts } from '@/lib/writing';

type PostPageProps = { params: Promise<{ slug: string }> };
const dateFormatter = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' });

export async function generateStaticParams() {
  const posts = await getWritingPosts();
  return posts.filter((post) => post.reviewStatus !== 'needs-review').map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getWritingPostBySlug((await params).slug);
  if (!post || post.reviewStatus === 'needs-review') return { title: 'Article not found' };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: 'article', url: `/writing/${post.slug}`, publishedTime: post.date, authors: post.author ? [post.author] : undefined },
  };
}

export default async function WritingPostPage({ params }: PostPageProps) {
  const post = await getWritingPostBySlug((await params).slug);
  if (!post || post.reviewStatus === 'needs-review') notFound();

  return <article className="writing-post">
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.date, dateModified: post.date, mainEntityOfPage: `https://ssohail.com/writing/${post.slug}`, author: { '@type': 'Person', name: post.author ?? 'Saqib Sohail' }, publisher: { '@type': 'Person', name: 'Saqib Sohail' } }} />
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/writing">Writing</Link></nav>
    <header>
      <p className="writing-meta"><time dateTime={post.date}>{dateFormatter.format(new Date(`${post.date}T00:00:00`))}</time> · {post.readingTimeMinutes} min read</p>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <ul aria-label="Topics">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </header>
    <div className="writing-content"><ArticleContent source={post.body} /></div>
  </article>;
}
