import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const route of ['/', '/work', '/work/jobs-tracker-bot', '/experience']) {
test(`${route} has no automated axe violations @a11y`, async ({ page }, testInfo) => {
  await page.goto(route);
  const results = await new AxeBuilder({ page }).analyze();

  await testInfo.attach('axe-violations.json', {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });
  expect(results.violations).toEqual([]);

  await page.getByRole('button', { name: /theme/i }).click();
  const darkResults = await new AxeBuilder({ page }).analyze();
  expect(darkResults.violations).toEqual([]);
});
}
