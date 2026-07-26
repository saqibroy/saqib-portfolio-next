import { expect, test } from '@playwright/test';

test('work index links every published case study', async ({ page }, testInfo) => {
  await page.goto('/work');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Product systems in context');
  await expect(page.getByRole('link', { name: 'Read case study →' })).toHaveCount(4);
  await page.screenshot({ path: testInfo.outputPath('work-desktop.png'), fullPage: true });
});

test('redacted case study keeps its collapsed text equivalent without a generic evidence footer', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/work/ai-assisted-contract-workflow');
  await expect(page.getByText('Private / redacted', { exact: true })).toBeVisible();
  await expect(page.getByRole('complementary', { name: 'Evidence boundary' })).toHaveCount(0);
  const textEquivalent = page.getByText('Read the system as text');
  await expect(textEquivalent).toBeVisible();
  await expect(textEquivalent.locator('xpath=..')).not.toHaveAttribute('open', '');
  await expect(page.getByRole('heading', { name: 'What shaped the implementation' })).toBeVisible();
  await expect(page.getByText(/engineering dossier|published status/i)).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('case-study-mobile.png'), fullPage: true });
});

test('Jobs Tracker exposes its compact outcomes, evidence, decisions, and project-specific architecture', async ({ page }, testInfo) => {
  await page.goto('/work/jobs-tracker-bot');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jobs Tracker Bot');
  await expect(page.getByText('520+', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Public repository/i })).toHaveAttribute('href', 'https://github.com/saqibroy/jobs-tracker-bot');
  await expect(page.locator('.case-study-decisions article')).toHaveCount(3);
  await page.locator('.architecture-map').scrollIntoViewIfNeeded();
  await expect(page.locator('.architecture-map svg')).toBeVisible();
  const textEquivalent = page.getByText('Read the system as text');
  await expect(textEquivalent.locator('xpath=..')).not.toHaveAttribute('open', '');
  await page.screenshot({ path: testInfo.outputPath('jobs-case-study-desktop.png'), fullPage: true });
});

test('gated and missing case studies are not published', async ({ page }) => {
  await page.goto('/work/accessibility-analysis-platform');
  await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
});
