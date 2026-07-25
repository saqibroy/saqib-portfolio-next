import { describe, expect, it } from 'vitest';

import { portfolioContent } from '@/content/portfolio';
import { caseStudies, requiredCaseStudySectionKeys, validateCaseStudies } from '@/content/caseStudies';

describe('portfolio content', () => {
  it('keeps the prominent title distinct from descriptive positioning', () => {
    expect(portfolioContent.profile.title).toBe('Senior full-stack engineer');
    expect(portfolioContent.profile.positioning).toBe('Frontend-leaning full-stack engineer');
    expect(portfolioContent.profile.title).not.toBe(portfolioContent.profile.positioning);
  });

  it('publishes only the approved homepage proof metrics', () => {
    const homepageMetrics = portfolioContent.homepageMetricIds.map((id) =>
      portfolioContent.metrics.find((metric) => metric.id === id),
    );

    expect(homepageMetrics).toEqual([
      expect.objectContaining({
        id: 'experience-years',
        value: '8+',
        evidenceIds: ['approved-profile'],
      }),
      expect.objectContaining({
        id: 'products-platforms',
        value: '7+',
        evidenceIds: ['approved-products-platforms'],
      }),
    ]);
    expect(homepageMetrics.every(Boolean)).toBe(true);
  });

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
  it('validates unique slugs, approved evidence, and required narrative sections', () => {
    expect(() => validateCaseStudies(caseStudies)).not.toThrow();
    expect(new Set(caseStudies.map(({ slug }) => slug)).size).toBe(caseStudies.length);
    for (const item of caseStudies) {
      expect(requiredCaseStudySectionKeys.every((key) => Boolean(item.sections[key]))).toBe(true);
    }
  });

  it('rejects dangling architecture edges', () => {
    const fixture = structuredClone(caseStudies);
    fixture[0].architecture.edges.push({ source: fixture[0].architecture.nodes[0].id, target: 'missing-node' });

    expect(() => validateCaseStudies(fixture)).toThrow(/Dangling architecture edge/);
  });

  it('omits unsupported optional sections instead of publishing disclaimers', () => {
    const privateCase = caseStudies.find(({ slug }) => slug === 'ai-assisted-contract-workflow');

    expect(privateCase?.sections.testingDelivery).toBeUndefined();
    expect(privateCase?.sections.nextImprovements).toBeUndefined();
    expect(JSON.stringify(caseStudies)).not.toMatch(/under review|follow later|return later|not publicly documented|details? (?:are|is) (?:omitted|unavailable)/i);
  });

  it('does not publish the gated accessibility platform', () => {
    expect(caseStudies.some(({ slug }) => slug === 'accessibility-analysis-platform')).toBe(false);
  });
});
