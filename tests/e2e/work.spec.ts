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
  await expect(page.getByRole('complementary', { name: 'Evidence boundary' })).toBeVisible();
  await expect(page.getByText('Read the architecture as text')).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Structured input' })).toBeAttached();
  await expect(page.getByRole('heading', { name: 'Testing and delivery' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Next improvements' })).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('case-study-mobile.png'), fullPage: true });
});

test('Jobs Tracker dossier exposes outcomes, repository evidence, navigation, and architecture controls', async ({ page }, testInfo) => {
  await page.goto('/work/jobs-tracker-bot');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jobs Tracker Bot');
  await expect(page.getByText('520+', { exact: true })).toBeVisible();
  await expect(page.getByText('GitHub Actions → Oracle Cloud', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /View public repository/i })).toHaveAttribute('href', 'https://github.com/saqibroy/jobs-tracker-bot');
  await expect(page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link')).toHaveCount(7);

  await page.getByText('Interactive system map').scrollIntoViewIfNeeded();
  await expect(page.getByRole('group', { name: 'Jobs Tracker Bot interactive architecture map' })).toBeVisible();
  await expect(page.getByText('Eligibility score', { exact: true }).first()).toBeVisible();
  await expect(page.locator('.react-flow__controls-fitview')).toBeVisible();
  const eligibilityNode = page.locator('.react-flow__node[data-id="eligibility"]');
  await eligibilityNode.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.architecture-selection').getByRole('heading')).toHaveText('Eligibility score');
  await expect(page.getByText('Outcomes at a glance')).toHaveCount(0);
  await expect(page.getByText(/under review|follow later|not publicly documented/i)).toHaveCount(0);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
  });
  await expect(page.locator('.dossier-breadcrumb')).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath('jobs-dossier-desktop.png'), fullPage: true });
});

test('gated and missing case studies are not published', async ({ page }) => {
  await page.goto('/work/accessibility-analysis-platform');
  await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
});
