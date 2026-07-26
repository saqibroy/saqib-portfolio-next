import { expect, test } from '@playwright/test';

const legacyPaths = [
  ['/blog', '/writing'],
  ['/blog/seo-trends-2025', '/writing/seo-trends-2025'],
  ['/blog/web-accessibility-2025', '/writing/web-accessibility-2025'],
] as const;

for (const [source, destination] of legacyPaths) {
  test(`${source} permanently redirects to ${destination}`, async ({ page, request }) => {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);

    await page.goto(source);
    await expect(page).toHaveURL(new RegExp(`${destination}$`));
  });
}

test('writing index exposes only reviewed notes', async ({ page }, testInfo) => {
  await page.goto('/writing');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Notes for building dependable web products');
  await expect(page.getByRole('link', { name: 'Designing a URL Shortener: From Requirements to Production Trade-offs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'A practical SEO baseline for engineering teams' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'A practical accessibility baseline for frontend teams' })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('writing-desktop.png'), fullPage: true });
});

test('URL-shortener article exposes its system-design visuals accessibly', async ({ page }) => {
  await page.goto('/writing/designing-a-url-shortener');
  await expect(page.getByText('One Next.js application: creation UI, API route handlers, and redirects')).toBeVisible();
  await expect(page.getByText('event; not on redirect response')).toBeVisible();
  await expect(page.getByRole('table', { name: 'Short-code strategy trade-offs' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'Random Base62' })).toBeVisible();
});

test('reviewed article retains source links and readable content on mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/writing/web-accessibility-2025');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A practical accessibility baseline');
  await expect(page.getByRole('link', { name: /Web Content Accessibility Guidelines/i })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('writing-mobile.png'), fullPage: true });
});
