/**
 * @file usePrimeNumber.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Prime Number Checker & Generator
 *
 * @description
 * Tests integer primality, calculates prime factorizations, identifies next/previous primes,
 * and generates prime number ranges using the Sieve of Eratosthenes algorithm.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { storage } from '../../utils/storage.js';

// ---------- INTERFACES
export interface PrimeCheckResult {
  num: number;
  isPrime: boolean;
  factors: number[];
  prevPrime: number | null;
  nextPrime: number | null;
  explanation: string;
}

// ---------- FUNCTION: usePrimeNumber
export function usePrimeNumber() {
  const faq = [
    {
      q: 'What algorithm is used to test primality?',
      a: 'Trial division with 6k ± 1 optimization for fast primality testing.'
    },
    {
      q: 'What is the maximum range for prime generation?',
      a: 'Up to 500,000 using the optimized Sieve of Eratosthenes algorithm.'
    }
  ];

  const compatibility = ['Primality Check', 'Prime Factorization', 'Sieve Range Generator'];

  // ---------- REACTIVE STATE
  const checkInput = ref<number | null>(997);
  const checkResult = ref<PrimeCheckResult | null>(null);

  const rangeStart = ref<number>(1);
  const rangeEnd = ref<number>(100);
  const generatedPrimes = ref<number[]>([]);

  // ---------- PRIMALITY HELPERS
  const isPrimeNumber = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const getPrimeFactors = (n: number): number[] => {
    const factors: number[] = [];
    let d = 2;
    let temp = Math.abs(n);
    while (temp >= 2) {
      if (temp % d === 0) {
        factors.push(d);
        temp /= d;
      } else {
        d++;
        if (d * d > temp) {
          if (temp > 1) factors.push(temp);
          break;
        }
      }
    }
    return factors;
  };

  const findPrevPrime = (n: number): number | null => {
    for (let i = n - 1; i >= 2; i--) {
      if (isPrimeNumber(i)) return i;
    }
    return null;
  };

  const findNextPrime = (n: number): number => {
    let i = n + 1;
    while (!isPrimeNumber(i)) {
      i++;
    }
    return i;
  };

  // ---------- METHODS
  const evaluatePrime = () => {
    if (checkInput.value === null || checkInput.value === undefined) {
      checkResult.value = null;
      return;
    }

    const val = Math.floor(Math.abs(checkInput.value));
    const isP = isPrimeNumber(val);
    const factors = isP ? [val] : getPrimeFactors(val);
    const prev = findPrevPrime(val);
    const next = findNextPrime(val);

    let explanation: string;
    if (val <= 1) {
      explanation = `${val} is neither prime nor composite by mathematical definition.`;
    } else if (isP) {
      explanation = `${val} is a PRIME number (only divisible by 1 and ${val}).`;
    } else {
      explanation = `${val} is a COMPOSITE number (divisible by ${factors.join(' × ')}).`;
    }

    checkResult.value = {
      num: val,
      isPrime: isP,
      factors,
      prevPrime: prev,
      nextPrime: next,
      explanation
    };
  };

  const generatePrimeRange = () => {
    const start = Math.max(2, Math.floor(rangeStart.value || 2));
    const end = Math.min(500000, Math.floor(rangeEnd.value || 100));

    if (start > end) {
      message.warn('Start range must be less than or equal to End range!');
      return;
    }

    // Sieve of Eratosthenes
    const sieve = new Uint8Array(end + 1);
    sieve.fill(1);
    sieve[0] = 0;
    sieve[1] = 0;

    for (let p = 2; p * p <= end; p++) {
      if (sieve[p] === 1) {
        for (let i = p * p; i <= end; i += p) {
          sieve[i] = 0;
        }
      }
    }

    const primes: number[] = [];
    for (let i = start; i <= end; i++) {
      if (sieve[i] === 1) primes.push(i);
    }

    generatedPrimes.value = primes;
  };

  const handleSample = () => {
    checkInput.value = 997;
    rangeStart.value = 1;
    rangeEnd.value = 100;
    evaluatePrime();
    generatePrimeRange();
  };

  const handleCopy = async () => {
    const text =
      generatedPrimes.value.length > 0
        ? generatedPrimes.value.join(', ')
        : checkResult.value
          ? checkResult.value.explanation
          : '';
    if (!text) return;
    const success = await storage.copyToClipboard(text);
    if (success) message.success('Prime results copied to clipboard!');
  };

  const handleReset = () => {
    checkInput.value = 997;
    rangeStart.value = 1;
    rangeEnd.value = 100;
    generatedPrimes.value = [];
    evaluatePrime();
  };

  return {
    faq,
    compatibility,
    checkInput,
    checkResult,
    rangeStart,
    rangeEnd,
    generatedPrimes,
    evaluatePrime,
    generatePrimeRange,
    handleSample,
    handleCopy,
    handleReset
  };
}
