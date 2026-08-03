/**
 * @file useCalculator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for useCalculator composable
 *
 * @description
 * Verifies iframe URL initialization, loading state handling, and helper actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useCalculator } from '../useCalculator.js';

// ---------- TESTS
describe('useCalculator composable', () => {
  it('initializes with target iframe URL and loading state true', () => {
    const { calculatorUrl, isLoading, faq, compatibility } = useCalculator();
    expect(calculatorUrl.value).toBe('https://the-great-calculator.vercel.app/');
    expect(isLoading.value).toBe(true);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Scientific');
  });

  it('updates loading state on handleIframeLoad', () => {
    const { isLoading, handleIframeLoad } = useCalculator();
    handleIframeLoad();
    expect(isLoading.value).toBe(false);
  });
});
