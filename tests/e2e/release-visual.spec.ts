import { expect, type Page, test, type TestInfo } from '@playwright/test';

async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((value) => localStorage.setItem('theme', value), theme);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(new RegExp(theme));
}

async function resetScroll(page: Page) {
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
  });
}

async function prepareHomepage(page: Page) {
  await page.locator('.system-showcase').scrollIntoViewIfNeeded();
  await expect(page.locator('.system-showcase')).toBeVisible();
  await resetScroll(page);
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
}

async function prepareDossier(page: Page) {
  await page.locator('.case-study-architecture').scrollIntoViewIfNeeded();
  await expect(page.locator('.architecture-map svg')).toBeVisible();
  await resetScroll(page);
  await expect(page.locator('.case-study-breadcrumb')).toBeInViewport();
}

async function captureModes({
  page,
  testInfo,
  route,
  prefix,
  prepare,
}: {
  page: Page;
  testInfo: TestInfo;
  route: string;
  prefix: string;
  prepare: (page: Page) => Promise<void>;
}) {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto(route);
  await setTheme(page, 'light');
  await prepare(page);
  await page.screenshot({ path: testInfo.outputPath(`${prefix}-light-desktop.png`), fullPage: true });

  await setTheme(page, 'dark');
  await prepare(page);
  await page.screenshot({ path: testInfo.outputPath(`${prefix}-dark-desktop.png`), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await prepare(page);
  await page.screenshot({ path: testInfo.outputPath(`${prefix}-dark-mobile.png`), fullPage: true });

  await setTheme(page, 'light');
  await prepare(page);
  await page.screenshot({ path: testInfo.outputPath(`${prefix}-light-mobile.png`), fullPage: true });
}

test('release captures cover homepage light and dark desktop and mobile views', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await captureModes({ page, testInfo, route: '/', prefix: 'home', prepare: prepareHomepage });
});

test('release captures cover Jobs Tracker dossier light and dark desktop and mobile views', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await captureModes({
    page,
    testInfo,
    route: '/work/jobs-tracker-bot',
    prefix: 'jobs',
    prepare: prepareDossier,
  });
});

test('release captures cover private dossier light and dark desktop and mobile views', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await captureModes({
    page,
    testInfo,
    route: '/work/ai-assisted-contract-workflow',
    prefix: 'private',
    prepare: prepareDossier,
  });
});

test('homepage and dossier reflow at a 200-percent equivalent viewport', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 640, height: 900 });

  for (const [route, prefix, prepare] of [
    ['/', 'home', prepareHomepage],
    ['/work/jobs-tracker-bot', 'jobs', prepareDossier],
  ] as const) {
    await page.goto(route);
    await setTheme(page, 'light');
    await prepare(page);
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
      .toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`${prefix}-200-percent-equivalent.png`), fullPage: true });
  }
});
