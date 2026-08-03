# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: generators.spec.ts >> Generators Tools E2E >> QR Code Generator renders QR data URL image
- Location: e2e/generators.spec.ts:59:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('textarea').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
    - generic [ref=e4]:
        - generic [ref=e5]:
            - heading "404" [level=1] [ref=e6]
            - heading "Page not found" [level=2] [ref=e7]
            - paragraph [ref=e8]: 'Page not found: /tools/qrcode-generator'
        - button "Go back home" [ref=e10]
    - generic [ref=e12]:
        - button "Toggle Nuxt DevTools" [ref=e13] [cursor=pointer]
        - generic "App load time" [ref=e17]:
            - generic [ref=e18]: '1.3'
            - generic [ref=e19]: s
        - button "Toggle Component Inspector" [ref=e21] [cursor=pointer]
```

# Test source

```ts
  1  | /**
  2  |  * @file generators.spec.ts
  3  |  *
  4  |  * @version 1.0.0
  5  |  * @author BleckWolf25
  6  |  * @license MIT
  7  |  *
  8  |  * @summary End-to-end tests for Generators tool category
  9  |  *
  10 |  * @description
  11 |  * Tests Password Generator, Hash Generator, UUID Generator, QR Code Generator, and ASCII Art Generator.
  12 |  *
  13 |  * @since 03/08/2026
  14 |  * @updated 03/08/2026
  15 |  */
  16 | // ---------- IMPORTS
  17 | import { test, expect } from '@playwright/test';
  18 |
  19 | // ---------- TESTS
  20 | test.describe('Generators Tools E2E', () => {
  21 |   test('Strong Password Generator creates random passwords and batch list', async ({ page }) => {
  22 |     await page.goto('/tools/password-generator');
  23 |
  24 |     // Password text should be rendered
  25 |     const passwordDisplay = page.locator('.password-text');
  26 |     await expect(passwordDisplay).toBeVisible();
  27 |
  28 |     // Click "Generate 5 Passwords" batch button
  29 |     const batchBtn = page.getByRole('button', { name: 'Generate 5 Passwords' });
  30 |     await batchBtn.click();
  31 |
  32 |     // 5 batch items should appear
  33 |     const batchItems = page.locator('.batch-item');
  34 |     await expect(batchItems).toHaveCount(5);
  35 |   });
  36 |
  37 |   test('Hash Generator calculates MD5, SHA-1, SHA-256, and SHA-512 hashes', async ({ page }) => {
  38 |     await page.goto('/tools/hash-generator');
  39 |
  40 |     // Input text
  41 |     const inputArea = page.locator('textarea').first();
  42 |     await inputArea.fill('hello world');
  43 |
  44 |     // Check MD5 hash result value
  45 |     const md5Card = page.locator('.hash-card', { hasText: 'MD5' });
  46 |     await expect(md5Card.locator('.hash-value')).toHaveText('5eb63bbbe01eeed093cb22bb8f5acdc3');
  47 |   });
  48 |
  49 |   test('UUID / GUID Generator generates v4 and v1 UUIDs in bulk', async ({ page }) => {
  50 |     await page.goto('/tools/uuid-generator');
  51 |
  52 |     // Output area should contain 5 default UUIDs
  53 |     const outputArea = page.locator('textarea').first();
  54 |     const value = await outputArea.inputValue();
  55 |     const lines = value.split('\n').filter((l) => l.trim().length > 0);
  56 |     expect(lines.length).toBe(5);
  57 |   });
  58 |
  59 |   test('QR Code Generator renders QR data URL image', async ({ page }) => {
  60 |     await page.goto('/tools/qrcode-generator');
  61 |
  62 |     // Input URL into text area
  63 |     const inputArea = page.locator('textarea').first();
> 64 |     await inputArea.fill('https://freetoolshed.dev');
     |                     ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  65 |
  66 |     // QR image should be rendered
  67 |     const qrImage = page.locator('.qr-img');
  68 |     await expect(qrImage).toBeVisible();
  69 |     await expect(qrImage).toHaveAttribute('src', /^data:image\/png;base64/);
  70 |   });
  71 |
  72 |   test('ASCII Art Text Generator renders FIGlet banner', async ({ page }) => {
  73 |     await page.goto('/tools/ascii-art-generator');
  74 |
  75 |     // Input text
  76 |     const inputArea = page.locator('input[type="text"]').first();
  77 |     await inputArea.fill('E2E TEST');
  78 |
  79 |     // ASCII preview box should contain rendered banner
  80 |     const previewBox = page.locator('.ascii-preview-box');
  81 |     await expect(previewBox).not.toBeEmpty();
  82 |   });
  83 | });
  84 |
```
