import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import remarkCodeTitles from 'remark-code-titles';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

export interface BlogPostMetaData {
  slug: string;
  title: string;
  date: string;
  description: string;
  author?: string;
  tags?: string[];
  image?: string;
}

export interface PostPageData extends BlogPostMetaData {
  mdxSource: MDXRemoteSerializeResult;
  rawContent: string;
}

export async function getBlogPosts(): Promise<BlogPostMetaData[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      author: data.author || undefined,
      tags: data.tags || [],
      image: data.image || undefined,
    } as BlogPostMetaData;
  });

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<PostPageData | null> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    console.log(`[MDX LIB] Successfully processed post "${slug}"`);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkCodeTitles],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrismPlus],
        format: 'mdx',
      },
      scope: data,
    });

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      author: data.author || undefined,
      tags: data.tags || [],
      image: data.image || undefined,
      mdxSource,
      rawContent: content,
    };
  } catch (error) {
    console.error(`Error reading or serializing post ${slug}:`, error);
    return null;
  }
} 