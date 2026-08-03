/**
 * @file text_and_web_tools.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary End-to-end tests for Text & Code and Web & Misc tool categories
 *
 * @description
 * Tests Text Case Converter, Text Diff Comparison, Regex Tester, Morse Code Translator,
 * Color Code Converter, Cron Expression Explainer, Unix Timestamp Converter, and Image Metadata Viewer.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { test, expect } from '@playwright/test';

// ---------- TESTS
test.describe('Text & Web Tools E2E', () => {
  test('Text Case Converter transforms input into 8 case formats', async ({ page }) => {
    await page.goto('/tools/text-case-converter');

    const inputArea = page.locator('textarea').first();
    await inputArea.fill('hello playwright test');

    // Case cards check
    await expect(page.getByText('HELLO PLAYWRIGHT TEST', { exact: true })).toBeVisible();
    await expect(page.getByText('helloPlaywrightTest', { exact: true })).toBeVisible();
    await expect(page.getByText('hello_playwright_test', { exact: true })).toBeVisible();
  });

  test('Text Diff Comparison highlights additions and deletions', async ({ page }) => {
    await page.goto('/tools/diff-checker');

    const text1 = page.locator('textarea').nth(0);
    const text2 = page.locator('textarea').nth(1);

    await text1.fill('The quick brown fox');
    await text2.fill('The fast brown fox');

    const compareBtn = page.getByRole('button', { name: 'Compare Text' });
    await compareBtn.click();

    // Check highlighted diff spans
    await expect(page.locator('.diff-del')).toContainText('quick');
    await expect(page.locator('.diff-add')).toContainText('fast');
  });

  test('Regex Tester & Evaluator extracts regex matches', async ({ page }) => {
    await page.goto('/tools/regex-tester');

    const patternInput = page.locator('input').nth(0);
    await patternInput.fill('(\\d+)');

    const testArea = page.locator('textarea').first();
    await testArea.fill('ID: 101 and Code: 202');

    // Matches items check
    const matches = page.locator('.match-item');
    await expect(matches).toHaveCount(2);
  });

  test('Morse Code Translator translates text to dots and dashes', async ({ page }) => {
    await page.goto('/tools/morse-translator');

    const inputArea = page.locator('textarea').first();
    await inputArea.fill('SOS');

    const outputArea = page.locator('textarea').nth(1);
    await expect(outputArea).toHaveValue('... --- ...');
  });

  test('Color Code Converter calculates WCAG contrast ratio', async ({ page }) => {
    await page.goto('/tools/color-converter');

    const hexInput = page.locator('.inputs-grid input').first();
    await hexInput.fill('#1890FF');

    // Color preview banner and WCAG accessibility contrast check
    await expect(page.locator('.accessibility-card')).toBeVisible();
  });

  test('Cron Expression Explainer parses cron schedule into human text', async ({ page }) => {
    await page.goto('/tools/cron-explainer');

    const cronInput = page.locator('input').first();
    await cronInput.fill('*/5 * * * *');

    await expect(page.locator('.explanation-text')).toContainText('Every 5 minutes');
  });

  test('Unix Timestamp Converter updates current ticker banner', async ({ page }) => {
    await page.goto('/tools/unix-timestamp');

    // Current epoch timestamp ticker should be visible
    await expect(page.locator('.live-ticker-card')).toBeVisible();
    await expect(page.locator('.ticker-item').first()).toContainText('CURRENT UNIX TIMESTAMP');
  });

  test('Image Metadata Viewer renders file dragger dropzone', async ({ page }) => {
    await page.goto('/tools/image-metadata');

    await expect(page.locator('.ant-upload-drag')).toBeVisible();
  });
});
