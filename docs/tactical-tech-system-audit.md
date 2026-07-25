# Tactical Tech system audit

Audit date: 2026-07-25. This document records only local implementation evidence supplied for Phase 13. It is the basis for the public Tactical Tech content-and-search visual.

## Verified repositories

| Repository | Verified purpose and technology | Inbound / outbound flow | Publicly safe claim |
| --- | --- | --- | --- |
| `/home/saqib/projects/search` | React 17/Create React App central search interface using Axios. | Reads query and project namespace from the URL; requests the Content API; maps result links to project sites. | Built a central search interface that queried a shared content API across multiple project namespaces. |
| `/home/saqib/projects/mothership/content-api` | Node/Restify REST Content API using Fuse.js for content search. | Loads namespace JSON data; exposes content and content-type routes with query filtering and `searchQuery`; returns JSON to consumers. | Worked with a REST content API that delivered namespace content and supported query-based search. |
| `/home/saqib/projects/data-and-elections-website` | Next.js 12 static-export content application with Netlify CMS/Decap-era configuration. | Editors commit Markdown/frontmatter to the GitLab `content` branch; CI transforms/deploys JSON to the Content API and triggers a site build; the application reads the project namespace. | Worked on a Next.js content application using Git-backed CMS content and API-delivered data. |
| `/home/saqib/projects/exposing-the-invisible-org` | Vue 2 static/prerendered content application using the shared Content API. | Fetches content from the `eti` namespace; generates routes for prerendering; links its search flow to the central search application. | Worked with project sites consuming shared API-delivered content and routing visitors into central search. |
| `/home/saqib/projects/consent-api` | Next.js 13 API-route application for consent-gated third-party embeds. | Receives an embed destination and renders an inline consent boundary before a third-party connection is opened. | Not included in the Tactical Tech ecosystem visual; it is separate evidence for privacy-aware embed handling. |

## Exact evidence

- Search API base and supported namespaces: `search/src/utils/config.js:1-17`; Axios client: `search/src/utils/api.js:1-7`; URL-driven queries, one-namespace/all-namespace requests, and result delivery: `search/src/components/organisms/Results.js:12-84`.
- REST service, CORS, query parser, and route registration: `mothership/content-api/src/index.js:1-24`; namespace content route and `searchQuery` handling: `mothership/content-api/src/router/content.js:11-95`; Fuse search fields and matching configuration: `mothership/content-api/src/search.js:1-35`; runtime JSON data source and project directories: `mothership/content-api/src/config.js:1-16`.
- Next.js project Content API namespace and central-search target: `data-and-elections-website/configuration.js:1-73`; CMS GitLab content branch and editorial workflow: `data-and-elections-website/public/admin/config.yml:1-17`; content-to-API/build workflow and static export model: `data-and-elections-website/README.md` sections “NetlifyCMS and Content API” and “Tech stack”.
- Representative Vue project Content API namespace and central-search target: `exposing-the-invisible-org/src/configuration.js:10-20`; API-query construction: `exposing-the-invisible-org/src/utils/data.js:1-43`; API-fed prerender-route generation: `exposing-the-invisible-org/src/utils/create-routes.js:1-120`; project architecture and build description: `exposing-the-invisible-org/README.md`.
- Separate consent-boundary implementation: `consent-api/README.md` and `consent-api/package.json`.

## Public visual model

Use this neutral, evidence-backed flow:

`Editors / Git-backed CMS → content files → REST Content API → Next.js and project-site consumers`

The search branch is:

`REST Content API search → central search interface → project results`

The visual must describe shared content delivery and search integration. It must not claim a queue, webhook, search index, specific hosted provider, traffic level, organisation-wide ownership, or that every listed repository was built solely by Saqib.

## Omit or keep private

- GitLab application IDs, credentials, staging credentials, and internal deployment details.
- Any inference about Elasticsearch, Algolia, managed search, indexing jobs, queues, webhooks, scale, user counts, or hosting beyond the checked source.
- Claims of sole ownership or organisational reach. The approved public role remains **Front-End Developer**.
