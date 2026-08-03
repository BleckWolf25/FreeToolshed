/**
 * @file generators.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary End-to-end tests for Generators tool category
 *
 * @description
 * Tests Password Generator, Hash Generator, UUID Generator, QR Code Generator, and ASCII Art Generator.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { test, expect } from '@playwright/test';

// ---------- TESTS
test.describe('Generators Tools E2E', () => {
  test('Strong Password Generator creates random passwords and batch list', async ({ page }) => {
    await page.goto('/tools/password-generator');

    // Password text should be rendered
    const passwordDisplay = page.locator('.password-text');
    await expect(passwordDisplay).toBeVisible();

    // Click "Generate 5 Passwords" batch button
    const batchBtn = page.getByRole('button', { name: 'Generate 5 Passwords' });
    await batchBtn.click();

    // 5 batch items should appear
    const batchItems = page.locator('.batch-item');
    await expect(batchItems).toHaveCount(5);
  });

  test('Hash Generator calculates MD5, SHA-1, SHA-256, and SHA-512 hashes', async ({ page }) => {
    await page.goto('/tools/hash-generator');

    // Input text
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('hello world');

    // Check MD5 hash result value
    const md5Card = page.locator('.hash-card', { hasText: 'MD5' });
    await expect(md5Card.locator('.hash-value')).toHaveText('5eb63bbbe01eeed093cb22bb8f5acdc3');
  });

  test('UUID / GUID Generator generates v4 and v1 UUIDs in bulk', async ({ page }) => {
    await page.goto('/tools/uuid-generator');

    // Output area should contain 5 default UUIDs
    const outputArea = page.locator('textarea').first();
    const value = await outputArea.inputValue();
    const lines = value.split('\n').filter((l) => l.trim().length > 0);
    expect(lines.length).toBe(5);
  });

  test('QR Code Generator renders QR data URL image', async ({ page }) => {
    await page.goto('/tools/qrcode-generator');

    // Input URL into text area
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('https://freetoolshed.dev');

    // QR image should be rendered
    const qrImage = page.locator('.qr-img');
    await expect(qrImage).toBeVisible();
    await expect(qrImage).toHaveAttribute('src', /^data:image\/png;base64/);
  });

  test('ASCII Art Text Generator renders FIGlet banner', async ({ page }) => {
    await page.goto('/tools/ascii-art-generator');

    // Input text
    const inputArea = page.locator('input[type="text"]').first();
    await inputArea.fill('E2E TEST');

    // ASCII preview box should contain rendered banner
    const previewBox = page.locator('.ascii-preview-box');
    await expect(previewBox).not.toBeEmpty();
  });
});
