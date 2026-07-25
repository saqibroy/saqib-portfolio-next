# Homepage and case-study simplification

## Approved scope

This focused second pass removes generic visual architecture concepts and makes approved project work the primary visual evidence. It does not replace the overall palette, navigation, routes, or factual content foundation.

The homepage contains a compact hero, approved proof strip, three project stories, an experience snapshot, writing preview, and contact. The prominent title remains **Senior full-stack engineer**; frontend-leaning positioning belongs in supporting copy.

## Factual and privacy boundaries

- Homepage metrics are limited to 8+ years, 5+ public-facing platforms, 30% faster initial loads, and 50%+ faster editorial workflows.
- Jobs Tracker may state 520+ tests, Docker, GitHub Actions, and its public repository.
- Velsa and Tactical Tech visuals describe only the approved system and contribution boundaries. Customer, document, prompt, model, infrastructure, organisation-wide reach, and sole-ownership claims remain absent.
- The URL-shortener article is a system-design discussion, not a production system operated by Saqib.

## Visual and accessibility approach

- Hero and project visuals are labelled HTML/CSS diagrams with real project flows; no canvas, WebGL, decorative particles, or generic network metaphor is used.
- The Jobs Tracker preview uses native buttons for focus, pointer, and touch exploration. Its labels and initial description remain useful without JavaScript.
- Case-study React Flow diagrams retain their collapsed native text equivalents. Diagrams are never the only representation of information.
- Optional visual transitions respect the global reduced-motion policy. Layouts reflow through mobile and 200%-equivalent viewports; light and dark themes remain covered by axe checks.

## Validation

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run test:a11y
npm run build
```

Capture homepage and Jobs Tracker screenshots in light and dark desktop/mobile modes before review.
