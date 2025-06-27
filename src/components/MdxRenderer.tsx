'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

interface MdxRendererProps {
  mdxSource: MDXRemoteSerializeResult;
  components: Record<string, React.ComponentType<any>>;
}

const MdxRenderer: React.FC<MdxRendererProps> = ({ mdxSource, components }) => {
  if (!mdxSource) {
    return null;
  }
  // Runtime check for undefined components
  console.log('MDX components mapping:', Object.keys(components));
  Object.entries(components).forEach(([key, value]) => {
    if (typeof value === 'undefined') {
      console.error('MDX components mapping:', components);
      throw new Error(`MDX component "${key}" is undefined. Check your components mapping and MDX usage.`);
    }
  });
  return <MDXRemote {...mdxSource} components={components} />;
};

export default MdxRenderer; 