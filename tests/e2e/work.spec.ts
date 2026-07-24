import { expect, test } from '@playwright/test';

test('work index links every published case study', async ({ page }, testInfo) => {
  await page.goto('/work');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Engineering decisions in context');
  await expect(page.getByRole('link', { name: 'Read case study →' })).toHaveCount(4);
  await page.screenshot({ path: testInfo.outputPath('work-desktop.png'), fullPage: true });
});

test('redacted case study retains labels and text alternative', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/work/ai-assisted-contract-workflow');
  await expect(page.getByText('Private / redacted case study')).toBeVisible();
  await expect(page.getByText(/Structured user input then React editor/)).toBeAttached();
  await page.screenshot({ path: testInfo.outputPath('case-study-mobile.png'), fullPage: true });
});

test('gated and missing case studies are not published', async ({ page }) => {
  await page.goto('/work/accessibility-analysis-platform');
  await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
});
