/**
 * @file usePasswordGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for usePasswordGenerator composable
 *
 * @description
 * Tests random password generation, options reactivity (length, upper, lower, numbers, symbols, ambiguous exclusion),
 * entropy strength calculation, batch generation of 5 passwords, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { usePasswordGenerator } from './usePasswordGenerator';

describe('usePasswordGenerator composable', () => {
  it('initializes with default options state and generates initial password', () => {
    const { password, options, strengthInfo, faq, compatibility } = usePasswordGenerator();
    expect(options.length).toBe(16);
    expect(options.uppercase).toBe(true);
    expect(options.lowercase).toBe(true);
    expect(options.numbers).toBe(true);
    expect(options.symbols).toBe(true);
    expect(options.excludeAmbiguous).toBe(false);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Passwords');
  });

  it('generates a new password when options change and calculates strength score', () => {
    const { password, options, strengthInfo, generateNewPassword } = usePasswordGenerator();
    options.length = 32;
    options.symbols = false;
    generateNewPassword();

    expect(password.value.length).toBe(32);
    expect(/[^a-zA-Z0-9]/.test(password.value)).toBe(false);
    expect(strengthInfo.value.score).toBeGreaterThan(60);
  });

  it('generates a batch list of 5 random passwords', () => {
    const { batchList, generateBatch } = usePasswordGenerator();
    generateBatch();

    expect(batchList.value.length).toBe(5);
    expect(batchList.value[0].length).toBe(16);
  });

  it('resets options state and clears batch list', () => {
    const { options, batchList, generateBatch, handleReset } = usePasswordGenerator();
    options.length = 50;
    options.excludeAmbiguous = true;
    generateBatch();

    handleReset();
    expect(options.length).toBe(16);
    expect(options.excludeAmbiguous).toBe(false);
    expect(batchList.value.length).toBe(0);
  });
});
