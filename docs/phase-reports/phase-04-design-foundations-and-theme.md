# Phase 4 Completion Report — Design Foundations and Theme

**Branch:** `phase-4-design-foundations` (stacked on Phase 3)

**Date:** 2026-07-24

## Delivered

- Added semantic CV-inspired light/dark tokens, Source Sans 3 body text, and
  Source Serif 4 display text.
- Added a system-default, persisted theme with a hydration-safe accessible
  toggle.
- Replaced the animated client layout shell with server-rendered header and
  footer primitives plus small theme and mobile-navigation client islands.
- Added a skip link, visible focus, unrestricted zoom, a shared main landmark,
  and global reduced-motion behaviour.
- Added browser tests for keyboard skip-link access, theme persistence, and
  mobile navigation. Browser test access exposed and fixed the local Next dev
  origin configuration before this phase was committed.

## Visual and automated evidence

| Check | Result |
| --- | --- |
| Light/dark desktop screenshot | Captured and inspected through the Playwright design-foundation test |
| Mobile menu screenshot | Captured and inspected through the Playwright design-foundation test |
| `npm run lint`, `typecheck`, `test` | Passed |
| `npm run test:e2e` | Passed: 7 browser checks |
| `npm run test:a11y` | Passed: axe report runner |
| `npm run build` | Passed |

## Deferred work

The legacy homepage, CV, writing pages, and accessibility checker still own
route-level template styling. They are intentionally not cosmetically patched
here: their replacements belong to Phases 5, 7, 8, and 9 respectively. The
shared shell is now the foundation those routes will use.

## Next phase

Phase 5 replaces the homepage with the approved senior-engineering narrative,
proof-oriented work selection, and accessible system-flow interaction.
