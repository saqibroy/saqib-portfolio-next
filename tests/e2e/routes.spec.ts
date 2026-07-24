import { test, expect } from '@playwright/test';

for (const route of ['/', '/cv', '/blog', '/blog/seo-trends-2025', '/blog/web-accessibility-2025']) {
  test(`renders ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main#main-content')).toBeVisible();
  });
}
