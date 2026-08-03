/**
 * @file useRandomNumberGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for useRandomNumberGenerator composable
 *
 * @description
 * Tests random number generation within bounds, exclusion filtering, unique constraints, and sorting rules.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useRandomNumberGenerator } from '../useRandomNumberGenerator.js';

// ---------- TESTS
describe('useRandomNumberGenerator composable', () => {
  it('generates random numbers within min and max bounds', () => {
    const { minVal, maxVal, count, generatedNumbers, generateRandomNumbers } =
      useRandomNumberGenerator();
    minVal.value = 10;
    maxVal.value = 20;
    count.value = 5;
    generateRandomNumbers();

    expect(generatedNumbers.value.length).toBe(5);
    for (const num of generatedNumbers.value) {
      expect(num).toBeGreaterThanOrEqual(10);
      expect(num).toBeLessThanOrEqual(20);
    }
  });

  it('respects exclusion list and uniqueness constraints', () => {
    const {
      minVal,
      maxVal,
      count,
      exclusionsText,
      allowDuplicates,
      generatedNumbers,
      generateRandomNumbers
    } = useRandomNumberGenerator();
    minVal.value = 1;
    maxVal.value = 10;
    count.value = 8;
    exclusionsText.value = '2, 4';
    allowDuplicates.value = false;
    generateRandomNumbers();

    expect(generatedNumbers.value).not.toContain(2);
    expect(generatedNumbers.value).not.toContain(4);
    const uniqueSet = new Set(generatedNumbers.value);
    expect(uniqueSet.size).toBe(generatedNumbers.value.length);
  });

  it('sorts generated numbers in ascending order when requested', () => {
    const { minVal, maxVal, count, sortType, generatedNumbers, generateRandomNumbers } =
      useRandomNumberGenerator();
    minVal.value = 1;
    maxVal.value = 100;
    count.value = 10;
    sortType.value = 'asc';
    generateRandomNumbers();

    for (let i = 1; i < generatedNumbers.value.length; i++) {
      expect(generatedNumbers.value[i]).toBeGreaterThanOrEqual(generatedNumbers.value[i - 1]);
    }
  });
});
