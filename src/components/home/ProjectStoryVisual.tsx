export function ProjectStoryVisual({ variant }: { variant: 'contract' | 'modernisation' }) {
  if (variant === 'contract') {
    return (
      <figure className="project-story-visual project-story-visual--contract" aria-label="Contract workflow diagram">
        <ol>
          <li>Structured input</li><li>React editor</li><li>Django APIs</li><li>FastAPI AI service</li><li>Structured document update</li>
        </ol>
        <p>Stripe → document access</p>
      </figure>
    );
  }

  return (
    <figure className="project-story-visual project-story-visual--modernisation" aria-label="Platform modernisation before and after">
      <div><span>Before</span><ul><li>Legacy applications</li><li>Fragmented content model</li><li>Slower publishing flow</li></ul></div>
      <div><span>After</span><ul><li>Next.js / Nuxt.js applications</li><li>Refactored Decap CMS model</li><li>Accessible public delivery</li></ul></div>
    </figure>
  );
}
