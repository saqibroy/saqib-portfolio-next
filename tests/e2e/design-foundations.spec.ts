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

test('Jobs Tracker pipeline exposes selected evidence with keyboard controls', async ({ page }, testInfo) => {
  await page.goto('/');
  const normalisation = page.getByRole('button', { name: /Normalisation/i });
  await normalisation.focus();
  await expect(normalisation).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.jobs-pipeline-preview > p')).toContainText('consistent job model');
  await page.screenshot({ path: testInfo.outputPath('homepage-desktop.png'), fullPage: true });
});

test('homepage uses approved copy, compact proof, and no generic Systems Lab', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Berlin, Germany', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior full-stack engineer');
  await expect(page.getByText('I build accessible product interfaces and connect them to reliable backend and AI services.')).toBeVisible();
  await expect(page.getByText('8+', { exact: true })).toBeVisible();
  await expect(page.getByText('5+', { exact: true })).toBeVisible();
  await expect(page.getByText('30%', { exact: true })).toBeVisible();
  await expect(page.getByText('50%+', { exact: true })).toBeVisible();
  await expect(page.locator('.systems-lab')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Designing a URL Shortener: From Requirements to Production Trade-offs' })).toBeVisible();
});

test('Jobs Tracker pipeline supports touch', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/');

  await page.getByRole('button', { name: /^Alerts/ }).tap();
  await expect(page.locator('.jobs-pipeline-preview > p')).toContainText('immediate or digest notifications');
  await context.close();
});

test('reduced motion retains complete static homepage content', async ({ browser }) => {
  const reducedContext = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto('/');
  await expect(reducedPage.getByText('Decap CMS', { exact: true }).first()).toBeVisible();
  await expect(reducedPage.locator('.jobs-pipeline-preview')).toBeVisible();
  await reducedContext.close();
});
