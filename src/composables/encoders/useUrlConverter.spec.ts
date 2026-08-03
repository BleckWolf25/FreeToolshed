/**
 * @file useUrlConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useUrlConverter composable
 *
 * @description
 * Tests URL component encoding, decoding, full URL parsing into structured components (protocol, hostname, path, query parameters table), sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useUrlConverter } from './useUrlConverter';

describe('useUrlConverter composable', () => {
  it('initializes with default encode mode and empty input state', () => {
    const { mode, inputValue, outputValue, parsedUrl, paramColumns, faq, compatibility } =
      useUrlConverter();
    expect(mode.value).toBe('encode');
    expect(inputValue.value).toBe('');
    expect(outputValue.value).toBe('');
    expect(parsedUrl.value).toBeNull();
    expect(paramColumns.length).toBe(2);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('URL');
  });

  it('encodes URL query string into safe percent-encoded string', () => {
    const { mode, inputValue, outputValue, processUrl } = useUrlConverter();
    mode.value = 'encode';
    inputValue.value = 'https://example.com/search?q=hello world&category=tools';
    processUrl();

    expect(outputValue.value).toContain('%20');
    expect(outputValue.value).not.toContain(' ');
  });

  it('decodes percent-encoded URL string back to unescaped string', () => {
    const { mode, inputValue, outputValue, processUrl } = useUrlConverter();
    mode.value = 'decode';
    inputValue.value = 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world';
    processUrl();

    expect(outputValue.value).toBe('https://example.com/search?q=hello world');
  });

  it('parses URL into protocol, hostname, path, and query parameters table', () => {
    const { inputValue, parsedUrl, processUrl } = useUrlConverter();
    inputValue.value = 'https://freetoolshed.dev:8080/docs/api?tool=url&ref=github#section1';
    processUrl();

    expect(parsedUrl.value?.protocol).toBe('https:');
    expect(parsedUrl.value?.hostname).toBe('freetoolshed.dev');
    expect(parsedUrl.value?.port).toBe('8080');
    expect(parsedUrl.value?.pathname).toBe('/docs/api');
    expect(parsedUrl.value?.queryParams.length).toBe(2);
    expect(parsedUrl.value?.queryParams[0]).toEqual({ key: 'tool', value: 'url' });
  });

  it('loads sample input and resets state', () => {
    const { inputValue, outputValue, parsedUrl, handleSample, handleReset } = useUrlConverter();
    handleSample();
    expect(inputValue.value).toContain('https://example.com');
    expect(outputValue.value).toBeTruthy();

    handleReset();
    expect(inputValue.value).toBe('');
    expect(outputValue.value).toBe('');
    expect(parsedUrl.value).toBeNull();
  });
});
