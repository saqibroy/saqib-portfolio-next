import { expect, test } from '@playwright/test';

test('checker remains noindex, unlinked, and reports a rejected local target honestly', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/accessibility-checker');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.getByRole('heading', { name: 'Accessibility Checker' })).toBeVisible();
  await expect(page.getByText(/not a compliance certification/i)).toBeVisible();

  await page.getByLabel('Public HTTP(S) URL').fill('http://127.0.0.1');
  await page.getByRole('button', { name: 'Run scan' }).click();
  await expect(page.locator('.checker-error')).toContainText('Private, loopback, and local network targets are not supported.');
  await page.screenshot({ path: testInfo.outputPath('checker-mobile.png'), fullPage: true });
});
