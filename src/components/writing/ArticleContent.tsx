import { compileMDX } from 'next-mdx-remote/rsc';
import type { ComponentProps } from 'react';

const components = {
  pre: (props: ComponentProps<'pre'>) => <pre {...props} />,
  code: (props: ComponentProps<'code'>) => <code {...props} />,
};

export default async function ArticleContent({ source }: { source: string }) {
  const { content } = await compileMDX({ source, components });
  return content;
}
