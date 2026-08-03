/**
 * @file useRandomNumberGenerator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Random Number Generator with range & exclusions
 *
 * @description
 * Generates random numbers within customizable min/max ranges, supports decimal precision,
 * exclusion lists, uniqueness constraints, and sorting rules.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useRandomNumberGenerator
export function useRandomNumberGenerator() {
  const faq = [
    {
      q: 'How does exclusion work?',
      a: 'Any numbers specified in the exclusion list (comma/space separated) will be skipped during generation.'
    },
    {
      q: 'Can I generate unique numbers only?',
      a: 'Yes! Check "Unique Numbers Only" to prevent duplicate numbers in the generated output array.'
    }
  ];

  const compatibility = ['Integer & Decimal', 'Range & Exclusions', 'Unique & Sorted'];

  // ---------- REACTIVE STATE
  const minVal = ref<number>(1);
  const maxVal = ref<number>(100);
  const count = ref<number>(10);
  const isDecimal = ref<boolean>(false);
  const decimalPlaces = ref<number>(2);
  const allowDuplicates = ref<boolean>(true);
  const exclusionsText = ref<string>('');
  const sortType = ref<'none' | 'asc' | 'desc'>('none');

  const generatedNumbers = ref<number[]>([]);

  // ---------- METHODS
  const parseExclusions = (): Set<number> => {
    const set = new Set<number>();
    if (!exclusionsText.value.trim()) return set;
    const tokens = exclusionsText.value.split(/[\s,]+/);
    for (const tok of tokens) {
      const num = Number(tok);
      if (!isNaN(num)) {
        set.add(num);
      }
    }
    return set;
  };

  const generateRandomNumbers = () => {
    const min = minVal.value ?? 1;
    const max = maxVal.value ?? 100;

    if (min >= max) {
      message.warn('Minimum value must be strictly less than Maximum value!');
      return;
    }

    const qty = Math.min(1000, Math.max(1, count.value || 10));
    const exclusions = parseExclusions();
    const result: number[] = [];
    const used = new Set<number>();

    let attempts = 0;
    const maxAttempts = qty * 100;

    while (result.length < qty && attempts < maxAttempts) {
      attempts++;
      let raw: number;
      if (isDecimal.value) {
        const factor = Math.pow(10, decimalPlaces.value || 2);
        raw = Math.round((Math.random() * (max - min) + min) * factor) / factor;
      } else {
        raw = Math.floor(Math.random() * (max - min + 1)) + min;
      }

      if (exclusions.has(raw)) continue;
      if (!allowDuplicates.value && used.has(raw)) continue;

      result.push(raw);
      used.add(raw);
    }

    if (result.length < qty && !allowDuplicates.value) {
      message.info(`Generated ${result.length} unique numbers (range exhausted with exclusions).`);
    }

    if (sortType.value === 'asc') {
      result.sort((a, b) => a - b);
    } else if (sortType.value === 'desc') {
      result.sort((a, b) => b - a);
    }

    generatedNumbers.value = result;
  };

  const handleSample = () => {
    minVal.value = 1;
    maxVal.value = 100;
    count.value = 10;
    exclusionsText.value = '7, 13, 42';
    allowDuplicates.value = false;
    sortType.value = 'asc';
    generateRandomNumbers();
  };

  const handleCopy = async () => {
    if (generatedNumbers.value.length === 0) return;
    const success = await storage.copyToClipboard(generatedNumbers.value.join(', '));
    if (success) message.success('Random numbers copied to clipboard!');
  };

  const handleDownload = () => {
    if (generatedNumbers.value.length === 0) return;
    const blob = new Blob([generatedNumbers.value.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'random-numbers.txt';
    a.click();
    URL.revokeObjectURL(url);
    message.success('Random numbers downloaded!');
  };

  const handleReset = () => {
    minVal.value = 1;
    maxVal.value = 100;
    count.value = 10;
    isDecimal.value = false;
    decimalPlaces.value = 2;
    allowDuplicates.value = true;
    exclusionsText.value = '';
    sortType.value = 'none';
    generatedNumbers.value = [];
  };

  return {
    faq,
    compatibility,
    minVal,
    maxVal,
    count,
    isDecimal,
    decimalPlaces,
    allowDuplicates,
    exclusionsText,
    sortType,
    generatedNumbers,
    generateRandomNumbers,
    handleSample,
    handleCopy,
    handleDownload,
    handleReset
  };
}
