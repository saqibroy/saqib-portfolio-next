import { expect, test } from '@playwright/test';

test('release captures cover light and dark desktop and mobile home views', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('home-light-desktop.png'), fullPage: true });

  await page.getByRole('button', { name: /theme/i }).click();
  await page.screenshot({ path: testInfo.outputPath('home-dark-desktop.png'), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: testInfo.outputPath('home-dark-mobile.png'), fullPage: true });

  await page.getByRole('button', { name: /theme/i }).click();
  await page.screenshot({ path: testInfo.outputPath('home-light-mobile.png'), fullPage: true });
});
