import { expect, test } from '@playwright/test';

test('primary content remains understandable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior full-stack engineer');
  await expect(page.getByText('Product problem → Interface → API → Service → Data/AI → Production')).toBeVisible();

  await page.goto('/writing/web-accessibility-2025');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A practical accessibility baseline');
  await expect(page.getByRole('heading', { level: 2, name: 'Test in layers' })).toBeVisible();

  await context.close();
});
