import { expect, test } from '@playwright/test';

test('legacy CV redirects permanently to experience', async ({ page, request }) => {
  const redirect = await request.get('/cv', { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe('/experience');

  await page.goto('/cv');
  await expect(page).toHaveURL(/\/experience$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior full-stack engineer');
});

test('experience exposes both CV downloads', async ({ page, request }, testInfo) => {
  await page.goto('/experience');
  await expect(page.getByRole('link', { name: 'Download ATS CV' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download visual CV' })).toBeVisible();
  expect((await request.get('/downloads/saqib-sohail-cv-ats.pdf')).status()).toBe(200);
  expect((await request.get('/downloads/saqib-sohail-cv-visual.pdf')).status()).toBe(200);
  await page.screenshot({ path: testInfo.outputPath('experience-desktop.png'), fullPage: true });
});

test('experience remains readable on mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/experience');
  await expect(page.getByRole('heading', { name: 'Roles and contributions' })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('experience-mobile.png'), fullPage: true });
});
