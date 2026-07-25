import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { caseStudies, validateCaseStudies } from '@/content/caseStudies';
import { portfolioContent } from '@/content/portfolio';

describe('portfolio content', () => {
  it('keeps the prominent title distinct from descriptive positioning', () => {
    expect(portfolioContent.profile.title).toBe('Senior full-stack engineer');
    expect(portfolioContent.profile.positioning).toBe('Frontend-leaning full-stack engineer');
  });

  it('keeps the four approved homepage proof metrics available', () => {
    const metricIds = ['experience-years', 'tactical-platforms', 'initial-load-improvement', 'editorial-workflow-improvement'];
    const metrics = portfolioContent.metrics.filter(({ id }) => metricIds.includes(id));
    expect(metrics.map(({ value }) => value)).toEqual(['8+', '5+', '30%', '50%+']);
    expect(metrics.every(({ evidenceIds }) => evidenceIds.length > 0)).toBe(true);
  });

  it('uses MDX as the writing source and features the URL-shortener article first', async () => {
    const article = await readFile(path.join(process.cwd(), 'content/writing/designing-a-url-shortener.mdx'), 'utf8');
    expect(article).toContain('title: "Designing a URL Shortener: From Requirements to Production Trade-offs"');
    expect(article).toContain('reviewStatus: "approved"');
    expect(article).toContain('<UrlShortenerArchitecture />');
  });
});

describe('case studies', () => {
  it('validates compact case studies with evidence, short systems, and decision limits', () => {
    expect(() => validateCaseStudies(caseStudies)).not.toThrow();
    for (const item of caseStudies) {
      expect(item.system.split(/\s+/).length).toBeLessThanOrEqual(180);
      expect(item.decisions.length).toBeGreaterThanOrEqual(2);
      expect(item.decisions.length).toBeLessThanOrEqual(4);
      expect(item.evidence.evidenceId).toBeTruthy();
    }
  });

  it('rejects dangling architecture edges', () => {
    const fixture = structuredClone(caseStudies);
    fixture[0].visual.edges.push({ source: fixture[0].visual.nodes[0].id, target: 'missing-node' });
    expect(() => validateCaseStudies(fixture)).toThrow(/Dangling architecture edge/);
  });

  it('does not publish the gated accessibility platform or retired dossier copy', () => {
    expect(caseStudies.some(({ slug }) => slug === 'accessibility-analysis-platform')).toBe(false);
    expect(JSON.stringify(caseStudies)).not.toMatch(/engineering dossier|published status|under review|follow later/i);
  });
});
