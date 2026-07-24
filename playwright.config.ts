import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // Next dev occasionally corrupts an in-flight RSC payload under parallel cold
  // compilation. Serial execution keeps the browser suite deterministic.
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: '**/*a11y*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'a11y',
      testMatch: '**/*a11y*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
