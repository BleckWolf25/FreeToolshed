/**
 * @file encoders_and_decoders.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary End-to-end tests for Encoders & Decoders tool category
 *
 * @description
 * Tests Base64 Encoder & Decoder, URL Encoder & Decoder, and JWT Token Decoder tools.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { test, expect } from '@playwright/test';

// ---------- TESTS
test.describe('Encoders & Decoders Tools E2E', () => {
  test('Base64 Encoder & Decoder encodes and decodes strings', async ({ page }) => {
    await page.goto('/tools/base64-converter');

    // Fill text input
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('Playwright E2E');

    // Output area should be encoded base64
    const outputArea = page.locator('textarea').nth(1);
    await expect(outputArea).toHaveValue('UGxheXdyaWdodCBFMkU=');

    // Switch mode to Decode
    await page.locator('.ant-radio-button-wrapper', { hasText: 'Decode' }).click();
    await inputArea.fill('UGxheXdyaWdodCBFMkU=');
    await expect(outputArea).toHaveValue('Playwright E2E');
  });

  test('URL Encoder & Decoder percent-encodes and parses query params', async ({ page }) => {
    await page.goto('/tools/url-converter');

    // Encode URL
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('https://example.com/search?q=hello world');

    const outputArea = page.locator('textarea').nth(1);
    await expect(outputArea).toHaveValue(/https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world/);

    // Switch to Parse mode
    await page.locator('.ant-radio-button-wrapper', { hasText: 'Parse' }).click();
    await expect(page.locator('.ant-table')).toBeVisible();
    await expect(page.locator('.ant-table-cell', { hasText: 'q' })).toBeVisible();
  });

  test('JWT Token Decoder inspects header and payload JSON', async ({ page }) => {
    await page.goto('/tools/jwt-decoder');

    // Click "Load Sample JWT" button
    const sampleBtn = page.getByRole('button', { name: 'Load Sample JWT' });
    await sampleBtn.click();

    // Verify header and payload panels render JSON
    const panels = page.locator('pre.json-code');
    await expect(panels.nth(0)).toContainText('HS256');
    await expect(panels.nth(1)).toContainText('BleckWolf25');
  });
});
