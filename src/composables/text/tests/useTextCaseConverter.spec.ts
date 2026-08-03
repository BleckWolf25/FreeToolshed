/**
 * @file useTextCaseConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useTextCaseConverter composable
 *
 * @description
 * Tests text case conversions across all formats (upper, lower, camel, pascal, snake, kebab, dot, title),
 * character/word/line count statistics, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useTextCaseConverter } from '../useTextCaseConverter';

// ---------- TESTS
describe('useTextCaseConverter composable', () => {
  it('initializes with default text input and computed statistics', () => {
    const { inputValue, charCount, wordCount, lineCount, faq, compatibility } =
      useTextCaseConverter();
    expect(inputValue.value).toBe('Free Toolshed Client Side Utility Suite');
    expect(charCount.value).toBeGreaterThan(0);
    expect(wordCount.value).toBe(6);
    expect(lineCount.value).toBe(1);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Plain Text');
  });

  it('converts text across all 8 case formats', () => {
    const { inputValue, caseResults, charCount, wordCount, lineCount } = useTextCaseConverter();
    inputValue.value = 'hello world';

    const getVal = (key: string) => caseResults.value.find((c) => c.key === key)?.value;

    expect(getVal('upper')).toBe('HELLO WORLD');
    expect(getVal('lower')).toBe('hello world');
    expect(getVal('title')).toBe('Hello World');
    expect(getVal('camel')).toBe('helloWorld');
    expect(getVal('snake')).toBe('hello_world');
    expect(getVal('kebab')).toBe('hello-world');
    expect(getVal('pascal')).toBe('HelloWorld');
    expect(getVal('dot')).toBe('hello.world');

    expect(charCount.value).toBe(11);
    expect(wordCount.value).toBe(2);
    expect(lineCount.value).toBe(1);
  });

  it('loads sample text and resets state', () => {
    const { inputValue, caseResults, handleSample, handleReset } = useTextCaseConverter();
    handleSample();
    expect(inputValue.value).toBe('hello world from free toolshed');

    handleReset();
    expect(inputValue.value).toBe('');
    expect(caseResults.value[0].value).toBe('');
  });
});
