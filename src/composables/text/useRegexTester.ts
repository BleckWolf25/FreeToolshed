/**
 * @file useRegexTester.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Regular Expression Tester & Evaluator
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the RegexTester component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted } from 'vue';
import { validators } from '../../utils/validators.js';

// ---------- INTERFACES
export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

// ---------- FUNCTION: useRegexTester
export function useRegexTester() {
  // ---------- TOOLCARD DATA
  const faq = [
    { q: 'Which regex flavor is used?', a: "This tool uses JavaScript\'s native RegExp engine." }
  ];
  const compatibility = ['JavaScript RegExp'];
  const handleSample = () => {
    pattern.value = '([A-Z])\\w+';
    testText.value = 'Hello World';
    testRegex();
  };

  // ---------- REACTIVE STATE
  const pattern = ref('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z]{2,})');

  const flags = ref('g');
  const testText = ref('Contact us at support@freetoolshed.dev or sales@example.com for help.');
  const matchesList = ref<RegexMatch[]>([]);
  const regexError = ref('');
  const executionTimeMs = ref<string | null>(null);

  const PRESET_PATTERNS = [
    {
      name: 'Email Address',
      pattern: '([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z]{2,})',
      flags: 'g'
    },
    { name: 'URL Link', pattern: '(https?:\\/\\/[^\\s/$.?#].[^\\s]*)', flags: 'g' },
    { name: 'IPv4 Address', pattern: '(\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b)', flags: 'g' },
    { name: 'Hex Color', pattern: '(#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b)', flags: 'g' }
  ];

  // ---------- METHODS
  const testRegex = () => {
    regexError.value = '';
    matchesList.value = [];

    if (!pattern.value || !testText.value) {
      executionTimeMs.value = null;
      return;
    }

    const check = validators.validateRegex(pattern.value, flags.value);
    if (!check.valid) {
      regexError.value = check.error;
      executionTimeMs.value = null;
      return;
    }

    const start = performance.now();
    const regex = check.regex;
    const matches = [];

    if (!regex) return;

    if (flags.value.includes('g')) {
      let match;
      let limit = 500;
      while ((match = regex.exec(testText.value)) !== null && limit > 0) {
        limit--;
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1)
        });
        if (match.index === regex.lastIndex) regex.lastIndex++;
      }
    } else {
      const match = regex.exec(testText.value);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1)
        });
      }
    }

    const end = performance.now();
    executionTimeMs.value = (end - start).toFixed(2);
    matchesList.value = matches;
  };

  const loadPreset = (p: any) => {
    pattern.value = p.pattern;
    flags.value = p.flags;
    testRegex();
  };

  const handleReset = () => {
    pattern.value = '';
    flags.value = 'g';
    testText.value = '';
    matchesList.value = [];
    regexError.value = '';
  };

  onMounted(() => {
    testRegex();
  });

  return {
    faq,
    compatibility,
    handleSample,
    pattern,
    flags,
    testText,
    matchesList,
    regexError,
    executionTimeMs,
    PRESET_PATTERNS,
    testRegex,
    loadPreset,
    handleReset
  };
}
