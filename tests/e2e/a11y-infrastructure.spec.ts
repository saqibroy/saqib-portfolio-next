import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('collects an axe report for the homepage @a11y', async ({ page }, testInfo) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();

  await testInfo.attach('axe-violations.json', {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });
  expect(results.testEngine.name).toBe('axe-core');
});
