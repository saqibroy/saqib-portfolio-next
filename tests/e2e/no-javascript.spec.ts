import { expect, test } from '@playwright/test';

test('primary content remains understandable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior full-stack engineer');
  await expect(page.locator('.system-showcase-all-flows').getByText(/Structured contract input moves through the React editor/)).toBeVisible();
  await expect(page.locator('.system-showcase-all-flows').getByText(/ATS and provider adapters/)).toBeVisible();

  await page.goto('/work/jobs-tracker-bot');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jobs Tracker Bot');
  await page.getByText('Read the system as text').click();
  await expect(page.getByRole('listitem').filter({ hasText: 'ATS adapters' })).toBeVisible();

  await page.goto('/writing/designing-a-url-shortener');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Designing a URL Shortener');
  await expect(page.getByRole('table', { name: 'Short-code strategy trade-offs' })).toBeVisible();

  await context.close();
});
