import { expect, test } from '@playwright/test';

test('theme toggle persists and shared navigation is keyboard reachable', async ({ page }, testInfo) => {
  await page.goto('/');
  const themeToggle = page.getByRole('button', { name: /theme/i });

  await expect(themeToggle).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByText('Skip to main content')).toBeFocused();

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
