"use client";
import { MDXRemote } from "next-mdx-remote";
import { components } from "./MDXClientComponents";

export default function MDXContentClient({ mdxSource }: { mdxSource: any }) {
  return <MDXRemote {...mdxSource} components={components} />;
} 