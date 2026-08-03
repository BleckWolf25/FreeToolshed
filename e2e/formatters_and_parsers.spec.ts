/**
 * @file formatters_and_parsers.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary End-to-end tests for Formatters & Parsers tool category
 *
 * @description
 * Tests JSON Formatter & Validator, CSV to JSON Converter, Markdown to HTML Converter, Code Minifier, and YAML / JSON Parser.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { test, expect } from '@playwright/test';

// ---------- TESTS
test.describe('Formatters & Parsers Tools E2E', () => {
  test('JSON Formatter & Validator formats and minifies JSON', async ({ page }) => {
    await page.goto('/tools/json-formatter');

    // Fill JSON input
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('{"name":"FreeToolshed","active":true}');

    // Click "Prettify JSON"
    const prettifyBtn = page.getByRole('button', { name: /Prettify JSON/i });
    await prettifyBtn.click();

    // Verify output area contains formatted json
    const outputArea = page.locator('textarea').nth(1);
    await expect(outputArea).toHaveValue(/"name": "FreeToolshed"/);

    // Click "Minify JSON"
    const minifyBtn = page.getByRole('button', { name: /Minify JSON/i });
    await minifyBtn.click();
    await expect(outputArea).toHaveValue(/{"name":"FreeToolshed"/);
  });

  test('CSV to JSON Converter parses spreadsheet rows into JSON array', async ({ page }) => {
    await page.goto('/tools/csv-to-json');

    // Verify default sample CSV converts to JSON output
    const outputArea = page.locator('textarea').nth(1);
    await expect(outputArea).toHaveValue(/"name": "Alice"/);
  });

  test('Markdown to HTML Converter renders live preview', async ({ page }) => {
    await page.goto('/tools/markdown-converter');

    // Input custom Markdown header
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('# E2E Testing Markdown');

    // Verify rendered HTML heading in preview
    const previewContainer = page.locator('.rendered-markdown-body');
    await expect(previewContainer.locator('h1')).toHaveText('E2E Testing Markdown');
  });

  test('Code Minifier compresses CSS code', async ({ page }) => {
    await page.goto('/tools/minifier');

    // Select CSS radio option
    await page.locator('.ant-radio-button-wrapper', { hasText: 'CSS' }).click();

    // Input CSS with comments
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('/* Test comment */\n.main {\n  color: red;\n}');

    // Click Minify Code
    await page.getByRole('button', { name: /Minify Code/i }).click();

    // Output area should be compressed CSS
    const outputArea = page.locator('textarea').nth(1);
    await expect(outputArea).toHaveValue('.main{color:red;}');
  });

  test('YAML / JSON Parser converts YAML to JSON', async ({ page }) => {
    await page.goto('/tools/yaml-parser');

    // Fill YAML input
    const inputArea = page.locator('textarea').first();
    await inputArea.fill('title: E2E Test\nactive: true');

    // Output area should contain JSON
    const outputArea = page.locator('textarea').nth(1);
    await expect(outputArea).toHaveValue(/"title": "E2E Test"/);
  });
});
