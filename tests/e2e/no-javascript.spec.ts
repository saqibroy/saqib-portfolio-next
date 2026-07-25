import { expect, test } from '@playwright/test';

test('primary content remains understandable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior full-stack engineer');
  await expect(page.getByText('React editor', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('ATS adapters', { exact: true }).first()).toBeVisible();

  await page.goto('/work/jobs-tracker-bot');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jobs Tracker Bot');
  await page.getByText('Read the system as text').click();
  await expect(page.getByRole('listitem').filter({ hasText: 'ATS adapters' })).toBeVisible();

  await page.goto('/writing/designing-a-url-shortener');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Designing a URL Shortener');
  await expect(page.getByRole('table', { name: 'Short-code strategy trade-offs' })).toBeVisible();

  await context.close();
});
