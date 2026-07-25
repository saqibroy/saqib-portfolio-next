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

test('system flow lenses expose selected evidence with keyboard controls', async ({ page }, testInfo) => {
  await page.goto('/');
  const frontend = page.getByRole('tab', { name: 'Frontend' });
  const fullStack = page.getByRole('tab', { name: 'Full-stack' });
  const appliedAi = page.getByRole('tab', { name: 'Applied AI' });

  await frontend.focus();
  await page.keyboard.press('ArrowRight');
  await expect(fullStack).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(appliedAi).toBeFocused();
  await expect(appliedAi).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('Applied-AI lens');
  await page.locator('.systems-lab-stage-controls').getByRole('button', { name: /Data\/AI/i }).click();
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText('Data/AI');
  await page.screenshot({ path: testInfo.outputPath('homepage-desktop.png'), fullPage: true });
});

test('homepage uses approved copy and proof without role-specific Tactical metrics', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Berlin, Germany', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior full-stack engineer');
  await expect(page.getByText('Frontend-leaning engineer building accessible product interfaces, dependable service boundaries, and applied-AI workflows.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'years in software engineering' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'products & platforms' })).toBeVisible();
  await expect(page.getByText('30%', { exact: true })).toHaveCount(0);
  await expect(page.getByText('50%+', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Technical notes under review')).toHaveCount(0);
  await expect(page.getByText(/full, reviewed case studies follow/i)).toHaveCount(0);
});

test('systems lab stage controls support touch and retain semantic evidence', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/');

  await page.locator('.systems-lab-stage-controls').getByRole('button', { name: /Production/i }).tap();
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText('Production');
  await expect(page.getByText('Product problem → Interface → API boundary → Service → Data/AI → Production')).toBeAttached();
  await context.close();
});

test('motion and capability fallbacks keep the systems lab static', async ({ browser }) => {
  const reducedContext = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto('/');
  await expect(reducedPage.locator('.hero-signal')).toHaveAttribute('data-rendering', 'static');
  await expect(reducedPage.locator('.systems-lab')).toHaveAttribute('data-canvas', 'fallback');
  await reducedContext.close();

  const constrainedContext = await browser.newContext();
  await constrainedContext.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } });
  });
  const constrainedPage = await constrainedContext.newPage();
  await constrainedPage.goto('/');
  await expect(constrainedPage.locator('.systems-lab')).toHaveAttribute('data-canvas', 'fallback');
  await constrainedContext.close();
});
