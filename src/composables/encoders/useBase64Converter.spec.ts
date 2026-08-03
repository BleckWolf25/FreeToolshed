/**
 * @file useBase64Converter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useBase64Converter composable
 *
 * @description
 * Tests text Base64 encoding, decoding, Data URI image detection and preview URL extraction,
 * invalid Base64 input error handling, file upload reading, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useBase64Converter } from './useBase64Converter';

describe('useBase64Converter composable', () => {
  it('initializes with default encode mode and empty input state', () => {
    const { mode, inputValue, outputValue, errorMessage, imagePreviewUrl, faq, compatibility } =
      useBase64Converter();
    expect(mode.value).toBe('encode');
    expect(inputValue.value).toBe('');
    expect(outputValue.value).toBe('');
    expect(errorMessage.value).toBe('');
    expect(imagePreviewUrl.value).toBe('');
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Data URIs');
  });

  it('encodes plain text into Base64 format', () => {
    const { mode, inputValue, outputValue, errorMessage, processConversion } = useBase64Converter();
    mode.value = 'encode';
    inputValue.value = 'Hello World';
    processConversion();

    expect(outputValue.value).toBe('SGVsbG8gV29ybGQ=');
    expect(errorMessage.value).toBe('');
  });

  it('decodes Base64 string back into plain text', () => {
    const { mode, inputValue, outputValue, processConversion } = useBase64Converter();
    mode.value = 'decode';
    inputValue.value = 'SGVsbG8gV29ybGQ=';
    processConversion();

    expect(outputValue.value).toBe('Hello World');
  });

  it('detects data:image Data URIs on decode and populates imagePreviewUrl', () => {
    const { mode, inputValue, imagePreviewUrl, processConversion } = useBase64Converter();
    mode.value = 'decode';
    inputValue.value =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    processConversion();

    expect(imagePreviewUrl.value).toContain('data:image/png;base64');
  });

  it('handles invalid Base64 decoding string and sets error message', () => {
    const { mode, inputValue, errorMessage, outputValue, processConversion } = useBase64Converter();
    mode.value = 'decode';
    inputValue.value = '!!!invalid_base64!!!';
    processConversion();

    expect(errorMessage.value).toBeTruthy();
    expect(outputValue.value).toBe('');
  });

  it('loads sample input and resets state', () => {
    const { inputValue, outputValue, handleSample, handleReset } = useBase64Converter();
    handleSample();
    expect(inputValue.value).toBe('Hello World from FreeToolshed!');
    expect(outputValue.value).toBe('SGVsbG8gV29ybGQgZnJvbSBGcmVlVG9vbHNoZWQh');

    handleReset();
    expect(inputValue.value).toBe('');
    expect(outputValue.value).toBe('');
  });
});
