/**
 * @file playwright.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Playwright E2E testing framework configuration file
 *
 * @description
 * Configures test directory, baseURL (http://localhost:3000), single worker execution mode, HTML reporter, and webServer launch command.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { defineConfig, devices } from '@playwright/test';

// ---------- CONFIGURATION
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    /* Test against desktop viewports. */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60000
  }
});
