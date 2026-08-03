/**
 * @file useJsonFormatter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useJsonFormatter composable
 *
 * @description
 * Tests JSON formatting with indent size configuration, minification, syntax error validation and message extraction, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useJsonFormatter } from './useJsonFormatter';

describe('useJsonFormatter composable', () => {
  it('initializes with empty input state and default indent size 2', () => {
    const { inputValue, outputValue, indentSize, isValid, errorMessage, SAMPLE_JSON, faq } =
      useJsonFormatter();
    expect(inputValue.value).toBe('');
    expect(outputValue.value).toBe('');
    expect(indentSize.value).toBe(2);
    expect(isValid.value).toBeNull();
    expect(errorMessage.value).toBe('');
    expect(SAMPLE_JSON).toBeTruthy();
    expect(faq.length).toBeGreaterThan(0);
  });

  it('formats unindented valid JSON with specified indentation', () => {
    const { inputValue, outputValue, isValid, errorMessage, formatJson } = useJsonFormatter();
    inputValue.value = '{"name":"FreeToolshed","version":1}';
    formatJson();

    expect(isValid.value).toBe(true);
    expect(errorMessage.value).toBe('');
    expect(outputValue.value).toContain('{\n  "name": "FreeToolshed"');
  });

  it('minifies valid JSON string into compact single-line JSON', () => {
    const { inputValue, outputValue, isValid, minifyJson } = useJsonFormatter();
    inputValue.value = '{\n  "a": 1,\n  "b": 2\n}';
    minifyJson();

    expect(isValid.value).toBe(true);
    expect(outputValue.value).toBe('{"a":1,"b":2}');
  });

  it('handles invalid JSON string syntax and sets isValid false with error message', () => {
    const { inputValue, outputValue, isValid, errorMessage, formatJson } = useJsonFormatter();
    inputValue.value = '{"name": "FreeToolshed",}'; // trailing comma
    formatJson();

    expect(isValid.value).toBe(false);
    expect(errorMessage.value).toBeTruthy();
    expect(outputValue.value).toBe('');
  });

  it('loads sample JSON and resets state', () => {
    const { inputValue, outputValue, isValid, handleSample, handleReset } = useJsonFormatter();
    handleSample();
    expect(inputValue.value).toContain('FreeToolshed');
    expect(isValid.value).toBe(true);
    expect(outputValue.value).toBeTruthy();

    handleReset();
    expect(inputValue.value).toBe('');
    expect(outputValue.value).toBe('');
    expect(isValid.value).toBeNull();
  });
});
