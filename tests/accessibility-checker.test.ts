import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { ACCESSIBILITY_LIMITS, parseAccessibilityResponse, parsePublicTargetUrl, readJsonWithinLimit } from '@/lib/accessibility-checker';
import { GET, POST } from '@/app/api/check-accessibility/route';

describe('accessibility checker target validation', () => {
  it.each(['not-a-url', 'ftp://example.com', 'https://user:pass@example.com', 'http://localhost:3000', 'http://127.0.0.1', 'http://169.254.169.254', 'http://192.168.1.1', 'http://[::1]'])('rejects unsafe target %s', (value) => {
    expect(() => parsePublicTargetUrl(value)).toThrow();
  });

  it('accepts a public HTTP(S) URL before DNS validation', () => {
    expect(parsePublicTargetUrl('https://example.com/path?query=value').hostname).toBe('example.com');
  });
});

describe('accessibility checker response validation', () => {
  it('limits and sanitizes upstream data', () => {
    const report = parseAccessibilityResponse({ success: true, data: { timestamp: '2026-01-01T00:00:00.000Z', processingTimeMs: 10, summary: { totalViolations: 1, totalPasses: 2, totalIncomplete: 0 }, passes: 2, incomplete: [], violations: [{ id: 'color-contrast', impact: 'serious', description: 'Contrast is insufficient.', help: 'Fix contrast.', helpUrl: 'javascript:alert(1)', tags: ['wcag2aa'], nodes: [{ target: ['.button'], failureSummary: 'Foreground has insufficient contrast.' }] }] } }, 'https://example.com/');
    expect(report.violations[0].helpUrl).toBe('');
    expect(report.violations[0].nodes).toHaveLength(1);
  });

  it('rejects malformed and oversized upstream responses', async () => {
    expect(() => parseAccessibilityResponse({ success: true, data: {} }, 'https://example.com/')).toThrow();
    await expect(readJsonWithinLimit(new Response('{}', { headers: { 'content-length': String(ACCESSIBILITY_LIMITS.maxResponseBytes + 1) } }))).rejects.toThrow();
    await expect(readJsonWithinLimit(new Response('not-json'))).rejects.toThrow();
  });
});

describe('accessibility checker API', () => {
  it('rejects malformed JSON, oversized bodies, and unsafe URLs without calling upstream', async () => {
    expect((await POST(new NextRequest('http://localhost/api/check-accessibility', { method: 'POST', body: '{' }))).status).toBe(400);
    expect((await POST(new NextRequest('http://localhost/api/check-accessibility', { method: 'POST', body: JSON.stringify({ url: `https://example.com/${'a'.repeat(ACCESSIBILITY_LIMITS.maxRequestBytes)}` }) }))).status).toBe(413);
    expect((await POST(new NextRequest('http://localhost/api/check-accessibility', { method: 'POST', body: JSON.stringify({ url: 'http://127.0.0.1' }) }))).status).toBe(400);
  });

  it('rejects GET', async () => {
    expect((await GET()).status).toBe(405);
  });
});
