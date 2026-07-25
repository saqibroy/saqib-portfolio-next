import { expect, test } from '@playwright/test';

test('theme toggle persists and shared navigation is keyboard reachable', async ({ page }, testInfo) => {
  await page.goto('/');
  const themeToggle = page.getByRole('button', { name: /theme/i });

  await expect(themeToggle).toBeVisible();
  await page.keyboard.press('Tab');
  const skipLink = page.getByText('Skip to main content');
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  await themeToggle.click();
  await expect(page.locator('html')).toHaveClass(/(light|dark)/);
  await page.screenshot({ path: testInfo.outputPath('homepage-themed.png'), fullPage: true });

  await page.reload();
  await expect(page.locator('html')).toHaveClass(/(light|dark)/);
});

test('mobile navigation exposes the primary routes', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('homepage-mobile.png'), fullPage: true });
});

test('Selected systems tabs expose the Jobs Tracker flow with keyboard controls', async ({ page }, testInfo) => {
  await page.goto('/');
  const appliedAi = page.getByRole('tab', { name: 'Applied AI' });
  await appliedAi.focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  const automation = page.getByRole('tab', { name: 'Automation pipeline' });
  await expect(automation).toBeFocused();
  await expect(automation).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('deduplication, and persistence');
  await page.screenshot({ path: testInfo.outputPath('homepage-desktop.png'), fullPage: true });
});

test('homepage uses approved copy, compact credibility signature, and no generic Systems Lab', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Berlin, Germany', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior full-stack engineer');
  await expect(page.getByText('I build accessible product interfaces and connect them to reliable backend and AI services.')).toBeVisible();
  await expect(page.locator('.homepage-signature')).toContainText('8+ years');
  await expect(page.locator('.homepage-signature')).toContainText('5+ public-facing platforms');
  await expect(page.getByText('30%', { exact: true })).toHaveCount(0);
  await expect(page.getByText('50%+', { exact: true })).toHaveCount(0);
  await expect(page.locator('.systems-lab')).toHaveCount(0);
  await expect(page.locator('.proof-strip')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Designing a URL Shortener: From Requirements to Production Trade-offs' })).toBeVisible();
});

test('Selected systems supports touch tab selection', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/');

  await page.getByRole('tab', { name: 'Automation pipeline' }).tap();
  await expect(page.getByRole('tabpanel')).toContainText('immediate or digest alert routing');
  await context.close();
});

test('reduced motion retains complete static homepage content', async ({ browser }) => {
  const reducedContext = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto('/');
  await expect(reducedPage.getByRole('tab', { name: 'Content & search' })).toBeVisible();
  await expect(reducedPage.locator('.system-showcase')).toBeVisible();
  await reducedContext.close();
});
