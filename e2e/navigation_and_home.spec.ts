/**
 * @file navigation_and_home.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary End-to-end tests for main navigation, homepage layout, category filtering, search, and drawer navigation
 *
 * @description
 * Verifies page title, header branding, search input tool filtering, category tab filtering, tool card rendering,
 * and navigation to tool pages.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { test, expect } from '@playwright/test';

// ---------- TESTS
test.describe('Navigation & Homepage E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads home page with valid page title and header branding', async ({ page }) => {
    await expect(page).toHaveTitle(/FreeToolshed/);
    await expect(page.locator('.logo-text')).toContainText('FreeToolshed');
    await expect(page.locator('.hero-title')).toContainText('FreeToolshed');
  });

  test('filters tools dynamically via search input', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Filter"]');
    await searchInput.fill('JWT');

    // Should display JWT Token Decoder card
    const cardTitle = page.locator('.grid-tool-name');
    await expect(cardTitle).toContainText('JWT Token Decoder');
  });

  test('displays tools categorized by sections', async ({ page }) => {
    const sectionTitle = page.locator('.section-title', { hasText: 'Generators' });
    await expect(sectionTitle).toBeVisible();

    // Verify password generator card is visible
    await expect(
      page.locator('.grid-tool-name', { hasText: 'Strong Password Generator' })
    ).toBeVisible();
  });

  test('navigates to tool page from card click', async ({ page }) => {
    const jsonCard = page.locator('.grid-tool-card', { hasText: 'JSON Formatter' });
    await jsonCard.click();

    await expect(page).toHaveURL(/\/tools\/json-formatter/);
    await expect(
      page.locator('.tool-card-stub, .tool-card-container, .tool-header-title, h2').first()
    ).toBeVisible();
  });
});
