import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactNode } from 'react';

type CalloutProps = {
  children: ReactNode;
};

function Callout({ children, label, tone }: CalloutProps & { label: string; tone: string }) {
  return (
    <aside className={`my-8 rounded-xl border p-5 ${tone}`} aria-label={label}>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide">{label}</p>
      <div>{children}</div>
    </aside>
  );
}

const components = {
  Intro: ({ children }: CalloutProps) => <Callout label="Introduction" tone="border-blue-500/40 bg-blue-950/30">{children}</Callout>,
  QuickWin: ({ children }: CalloutProps) => <Callout label="Quick win" tone="border-emerald-500/40 bg-emerald-950/30">{children}</Callout>,
  TryThis: ({ children }: CalloutProps) => <Callout label="Try this" tone="border-cyan-500/40 bg-cyan-950/30">{children}</Callout>,
  Warning: ({ children }: CalloutProps) => <Callout label="Important" tone="border-amber-500/40 bg-amber-950/30">{children}</Callout>,
  Checklist: ({ children }: CalloutProps) => <Callout label="Checklist" tone="border-slate-500/40 bg-slate-900/50">{children}</Callout>,
  Stats: ({ children }: CalloutProps) => <Callout label="Statistics to review" tone="border-violet-500/40 bg-violet-950/30">{children}</Callout>,
  ActionPlan: ({ children }: CalloutProps) => <Callout label="Action plan" tone="border-teal-500/40 bg-teal-950/30">{children}</Callout>,
  Highlight: ({ children }: CalloutProps) => <span className="rounded bg-blue-500/15 px-1 text-blue-200">{children}</span>,
  pre: ({ children }: CalloutProps) => <pre className="my-6 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm">{children}</pre>,
  code: ({ children }: CalloutProps) => <code className="rounded bg-slate-800 px-1 py-0.5 text-sm">{children}</code>,
};

export default async function ArticleContent({ source }: { source: string }) {
  const { content } = await compileMDX({ source, components });
  return content;
}
