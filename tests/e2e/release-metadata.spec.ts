import { expect, test } from '@playwright/test';

test('public metadata uses the canonical domain and structured data', async ({ page }) => {
  await page.goto('/writing/web-accessibility-2025');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://ssohail.com/writing/web-accessibility-2025');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://ssohail.com/writing/web-accessibility-2025');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);
  expect(await page.locator('.writing-post > script[type="application/ld+json"]').evaluate((element) => element.textContent)).toContain('Article');

  await page.goto('/work/jobs-tracker-bot');
  expect(await page.locator('.case-study > script[type="application/ld+json"]').evaluate((element) => element.textContent)).toContain('CreativeWork');
});

test('robots, sitemap, and generated Open Graph image expose only intended public surfaces', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  await expect(robots).toBeOK();
  const robotsText = await robots.text();
  expect(robotsText).toContain('Disallow: /accessibility-checker');
  expect(robotsText).toContain('Sitemap: https://ssohail.com/sitemap.xml');

  const sitemap = await request.get('/sitemap.xml');
  await expect(sitemap).toBeOK();
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain('https://ssohail.com/experience');
  expect(sitemapText).toContain('https://ssohail.com/writing/web-accessibility-2025');
  expect(sitemapText).not.toContain('accessibility-checker');
  expect(sitemapText).not.toContain('https://ssohail.com/cv');
  expect(sitemapText).not.toContain('https://ssohail.com/blog');

  const image = await request.get('/opengraph-image');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/png');
});
