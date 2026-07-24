import { describe, expect, it } from 'vitest';

import { portfolioContent } from '@/content/portfolio';

describe('portfolio content', () => {
  it('contains unique project and writing slugs', () => {
    const projectSlugs = portfolioContent.projects.map(({ slug }) => slug);
    const writingSlugs = portfolioContent.writing.map(({ slug }) => slug);

    expect(new Set(projectSlugs).size).toBe(projectSlugs.length);
    expect(new Set(writingSlugs).size).toBe(writingSlugs.length);
  });

  it('links metrics and public projects to approved evidence', () => {
    const evidenceIds = new Set(portfolioContent.evidence.map(({ id }) => id));

    for (const metric of portfolioContent.metrics) {
      expect(metric.evidenceIds.every((id) => evidenceIds.has(id))).toBe(true);
    }

    for (const project of portfolioContent.projects.filter(({ visibility }) => visibility === 'public')) {
      expect(project.evidenceIds.every((id) => evidenceIds.has(id))).toBe(true);
    }
  });
});
