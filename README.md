# Saqib Sohail — systems notebook portfolio

An evidence-led portfolio for Saqib Sohail, a Senior Full-Stack Engineer based in
Berlin. The application is built with Next.js, React and TypeScript and uses a typed
content layer so profile, work and CV facts are maintained in one place.

## Local development

Node.js 20.9 or newer is required.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run analyze
```

The browser test suite covers the core routes, the mail contact action, reduced-motion
rendering and automated accessibility checks.

## Content

Verified profile and CV data lives in `src/content`. Case studies are structured data
rendered through one reusable route template. Update facts there rather than inside
page components.

The audit and implementation record are in `docs/`.

## CV PDF

After building the site and starting it on port 3000, regenerate the verified PDF with:

```bash
npm run generate:cv
```

## Deployment

The site can run on any Node.js host supported by Next.js:

```bash
npm ci
npm run build
npm run start
```

Set the production domain to `https://ssohail.com`. No application secrets are
required for the rebuilt portfolio.
