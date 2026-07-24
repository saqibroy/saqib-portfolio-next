import type { MetadataRoute } from 'next';

import { caseStudies } from '@/content/caseStudies';
import { getWritingPosts } from '@/lib/writing';

const siteUrl = 'https://ssohail.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getWritingPosts();
  const publicPosts = posts.filter((post) => post.reviewStatus !== 'needs-review');

  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: 'monthly', priority: 0.9 },
    ...caseStudies.map((study) => ({ url: `${siteUrl}/work/${study.slug}`, changeFrequency: 'yearly' as const, priority: 0.8 })),
    { url: `${siteUrl}/experience`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${siteUrl}/writing`, changeFrequency: 'monthly', priority: 0.7 },
    ...publicPosts.map((post) => ({ url: `${siteUrl}/writing/${post.slug}`, lastModified: new Date(`${post.date}T00:00:00.000Z`), changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
