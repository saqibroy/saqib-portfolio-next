# Phase 2 Completion Report — Writing Pipeline Migration

**Branch:** `phase-2-writing-pipeline` (stacked on Phase 1)

**Date:** 2026-07-24

## Delivered

- Moved both existing MDX sources from `content/blog/` to `content/writing/`
  with Git renames; their slugs, frontmatter, and bodies were preserved.
- Replaced Contentlayer with `gray-matter` and `next-mdx-remote/rsc`.
- Added a server-only loader that validates filenames, required frontmatter,
  ISO dates, tags, and local image paths before pages render.
- Marked both migrated articles `needs-review` in the content model. This is a
  classification only; Phase 8 owns their line-by-line factual editorial work.
- Kept `/blog` and `/blog/[slug]` public during the transition and generated
  both existing slug pages at build time.
- Removed Contentlayer packages, generated aliases/configuration, its client
  MDX renderer, and the duplicate Next config. The remaining config is
  `next.config.mjs`, which Next 14 supports.
- Removed public AI/audio, sharing, comments, and outdated author marketing
  from blog rendering. No optional article feature is advertised pending review.

## Verification evidence

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Passed |
| `npx next build` | Passed; both existing article routes generated |
| `npm ci` | Passed without `--legacy-peer-deps` |
| Focused ESLint on migrated writing files | Passed |
| HTTP smoke checks | `/blog` and both preserved article URLs returned HTTP 200; no AI/audio promotion rendered |
| `/blog` first-load JavaScript | 145 kB |
| `/blog/[slug]` first-load JavaScript | 145 kB |
| Production dependency audit after removal | 17 vulnerabilities: 9 high, 1 critical remain for Phase 3 remediation |

The build still reports the existing outdated `caniuse-lite` database notice.
That maintenance work is not part of this phase.

## Trade-offs and deferred work

- The existing `/blog` URLs stay live now; Phase 8 will add `/writing` and
  permanent redirects after the writing experience is redesigned.
- Article source was deliberately not rewritten. Unsupported statistics, legal
  generalisations, and dated search claims remain classified `needs-review`
  until the documented Phase 8 editorial pass.
- Client islands are absent rather than retained: audio, comments, sharing, and
  AI controls lack the required verification. They can return only through the
  relevant review/security work.
- Negative schema/route fixtures wait for the Phase 3 test harness.

## Next phase

Phase 3 upgrades the framework and dependency baseline, adds direct quality
commands and automated testing/CI, and remediates high/critical production
dependency advisories.
