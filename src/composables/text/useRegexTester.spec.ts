/**
 * @file useRegexTester.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useRegexTester composable
 *
 * @description
 * Tests regular expression evaluation, match indexing, capture group extraction, invalid syntax error handling,
 * preset pattern loading, execution timing, and reset actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useRegexTester } from './useRegexTester';

describe('useRegexTester composable', () => {
  it('initializes with default email pattern, flags, and sample text', () => {
    const { pattern, flags, testText, PRESET_PATTERNS, faq, compatibility } = useRegexTester();
    expect(pattern.value).toBeTruthy();
    expect(flags.value).toBe('g');
    expect(testText.value).toBeTruthy();
    expect(PRESET_PATTERNS.length).toBe(4);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('JavaScript RegExp');
  });

  it('evaluates regex pattern against test text and extracts matches with groups', () => {
    const { pattern, flags, testText, matchesList, executionTimeMs, testRegex } = useRegexTester();
    pattern.value = '(\\w+)@(\\w+\\.\\w+)';
    flags.value = 'g';
    testText.value = 'Mail test@example.com and dev@toolshed.dev';
    testRegex();

    expect(matchesList.value.length).toBe(2);
    expect(matchesList.value[0].match).toBe('test@example.com');
    expect(matchesList.value[0].groups).toEqual(['test', 'example.com']);
    expect(executionTimeMs.value).not.toBeNull();
  });

  it('handles invalid regex syntax and reports validation error', () => {
    const { pattern, flags, regexError, matchesList, testRegex } = useRegexTester();
    pattern.value = '([a-z';
    flags.value = 'g';
    testRegex();

    expect(regexError.value).toBeTruthy();
    expect(matchesList.value.length).toBe(0);
  });

  it('loads preset patterns and executes regex evaluation', () => {
    const { pattern, flags, loadPreset, PRESET_PATTERNS } = useRegexTester();
    loadPreset(PRESET_PATTERNS[1]); // URL Link

    expect(pattern.value).toContain('https?');
    expect(flags.value).toBe('g');
  });

  it('resets pattern, text, and matches state on handleReset', () => {
    const { pattern, testText, matchesList, handleReset } = useRegexTester();
    handleReset();

    expect(pattern.value).toBe('');
    expect(testText.value).toBe('');
    expect(matchesList.value.length).toBe(0);
  });
});
