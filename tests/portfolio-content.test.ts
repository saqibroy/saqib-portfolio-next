import { describe, expect, it } from 'vitest';

import { portfolioContent } from '@/content/portfolio';
import { caseStudies, caseStudySectionKeys, validateCaseStudies } from '@/content/caseStudies';

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

describe('case studies', () => {
  it('validates unique slugs, approved evidence, and every narrative key', () => {
    expect(() => validateCaseStudies(caseStudies)).not.toThrow();
    expect(new Set(caseStudies.map(({ slug }) => slug)).size).toBe(caseStudies.length);
    for (const item of caseStudies) expect(caseStudySectionKeys.every((key) => key in item.sections)).toBe(true);
  });

  it('does not publish the gated accessibility platform', () => {
    expect(caseStudies.some(({ slug }) => slug === 'accessibility-analysis-platform')).toBe(false);
  });
});
