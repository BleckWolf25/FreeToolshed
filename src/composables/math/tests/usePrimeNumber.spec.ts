/**
 * @file usePrimeNumber.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for usePrimeNumber composable
 *
 * @description
 * Tests primality evaluation for prime/composite numbers, prime factorization,
 * next/previous prime resolution, and Sieve of Eratosthenes range generation.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { usePrimeNumber } from '../usePrimeNumber.js';

// ---------- TESTS
describe('usePrimeNumber composable', () => {
  it('correctly evaluates prime number 997', () => {
    const { checkInput, checkResult, evaluatePrime } = usePrimeNumber();
    checkInput.value = 997;
    evaluatePrime();

    expect(checkResult.value).not.toBeNull();
    expect(checkResult.value?.isPrime).toBe(true);
    expect(checkResult.value?.explanation).toContain('is a PRIME number');
    expect(checkResult.value?.nextPrime).toBe(1009);
  });

  it('correctly evaluates composite number 100 and computes prime factors', () => {
    const { checkInput, checkResult, evaluatePrime } = usePrimeNumber();
    checkInput.value = 100;
    evaluatePrime();

    expect(checkResult.value?.isPrime).toBe(false);
    expect(checkResult.value?.factors).toEqual([2, 2, 5, 5]);
    expect(checkResult.value?.prevPrime).toBe(97);
    expect(checkResult.value?.nextPrime).toBe(101);
  });

  it('generates prime numbers within range 1 to 30 via Sieve', () => {
    const { rangeStart, rangeEnd, generatedPrimes, generatePrimeRange } = usePrimeNumber();
    rangeStart.value = 1;
    rangeEnd.value = 30;
    generatePrimeRange();

    expect(generatedPrimes.value).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });
});
