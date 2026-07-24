import 'server-only';

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export type WritingReviewStatus = 'approved' | 'publicly-verified' | 'needs-review';

export type WritingPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  author?: string;
  tags: string[];
  image?: string;
  body: string;
  readingTimeMinutes: number;
  reviewStatus: WritingReviewStatus;
};

const writingDirectory = path.join(process.cwd(), 'content', 'writing');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function requiredString(value: unknown, field: string, fileName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Writing frontmatter in ${fileName} requires a non-empty ${field}.`);
  }

  return value.trim();
}

function optionalString(value: unknown, field: string, fileName: string): string | undefined {
  if (value === undefined) return undefined;
  return requiredString(value, field, fileName);
}

function parsePost(fileName: string, source: string): WritingPost {
  const slug = fileName.replace(/\.mdx$/, '');
  if (!slugPattern.test(slug)) {
    throw new Error(`Writing filename ${fileName} must be a lowercase, hyphenated slug.`);
  }

  const { data, content } = matter(source);
  const title = requiredString(data.title, 'title', fileName);
  const date = requiredString(data.date, 'date', fileName);
  const description = requiredString(data.description, 'description', fileName);
  const author = optionalString(data.author, 'author', fileName);
  const image = optionalString(data.image, 'image', fileName);

  if (!isoDatePattern.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00.000Z`))) {
    throw new Error(`Writing frontmatter in ${fileName} must use a valid YYYY-MM-DD date.`);
  }

  if (image && !image.startsWith('/')) {
    throw new Error(`Writing frontmatter image in ${fileName} must be a local absolute path.`);
  }

  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== 'string' || tag.trim().length === 0)) {
    throw new Error(`Writing frontmatter in ${fileName} requires a non-empty string tags array.`);
  }

  const words = content.replace(/```[\s\S]*?```/g, '').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu) ?? [];

  return {
    slug,
    title,
    date,
    description,
    author,
    tags: data.tags.map((tag: string) => tag.trim()),
    image,
    body: content,
    readingTimeMinutes: Math.max(1, Math.ceil(words.length / 220)),
    // Both migrated articles need their factual claims reviewed in Phase 8.
    reviewStatus: 'needs-review',
  };
}

export async function getWritingPosts(): Promise<WritingPost[]> {
  const entries = await readdir(writingDirectory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => entry.name)
    .sort();

  const posts = await Promise.all(
    files.map(async (fileName) => parsePost(fileName, await readFile(path.join(writingDirectory, fileName), 'utf8'))),
  );

  const duplicateSlugs = posts.filter((post, index) => posts.findIndex(({ slug }) => slug === post.slug) !== index);
  if (duplicateSlugs.length > 0) {
    throw new Error(`Writing slugs must be unique: ${duplicateSlugs.map(({ slug }) => slug).join(', ')}.`);
  }

  return posts.sort((first, second) => second.date.localeCompare(first.date));
}

export async function getWritingPostBySlug(slug: string): Promise<WritingPost | undefined> {
  if (!slugPattern.test(slug)) return undefined;
  const posts = await getWritingPosts();
  return posts.find((post) => post.slug === slug);
}
