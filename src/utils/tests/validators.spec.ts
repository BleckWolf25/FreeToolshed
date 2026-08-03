/**
 * @file validators.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for validator helper utilities
 *
 * @description
 * Tests validation functions for JSON strings, JWT tokens, URLs, regular expressions, and HEX colors
 * across valid inputs, edge cases, malformed data structures, and detailed error outputs.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { validators } from '../validators';

// ---------- TESTS
describe('validators utility', () => {
  describe('validateJson', () => {
    it('returns error for empty or whitespace-only input', () => {
      expect(validators.validateJson('')).toEqual({ valid: false, error: 'Input is empty' });
      expect(validators.validateJson('   \n\t ')).toEqual({
        valid: false,
        error: 'Input is empty'
      });
    });

    it('validates valid JSON objects and arrays', () => {
      const objResult = validators.validateJson('{"key": "value", "num": 42}');
      expect(objResult.valid).toBe(true);
      expect(objResult.error).toBeNull();
      expect(objResult.parsed).toEqual({ key: 'value', num: 42 });

      const arrResult = validators.validateJson('[1, 2, "three", true]');
      expect(arrResult.valid).toBe(true);
      expect(arrResult.parsed).toEqual([1, 2, 'three', true]);
    });

    it('validates primitive JSON values', () => {
      expect(validators.validateJson('true').parsed).toBe(true);
      expect(validators.validateJson('false').parsed).toBe(false);
      expect(validators.validateJson('null').parsed).toBeNull();
      expect(validators.validateJson('123.45').parsed).toBe(123.45);
      expect(validators.validateJson('"hello"').parsed).toBe('hello');
    });

    it('returns detailed error for malformed JSON strings', () => {
      const result1 = validators.validateJson('{invalid: json}');
      expect(result1.valid).toBe(false);
      expect(result1.parsed).toBeNull();
      expect(typeof result1.error).toBe('string');

      const result2 = validators.validateJson('{"key": "value",}');
      expect(result2.valid).toBe(false);
      expect(result2.parsed).toBeNull();
    });
  });

  describe('validateJwt', () => {
    it('returns error for empty or non-string token input', () => {
      expect(validators.validateJwt('')).toEqual({ valid: false, error: 'Token is empty' });
      expect(validators.validateJwt(null as any)).toEqual({
        valid: false,
        error: 'Token is empty'
      });
      expect(validators.validateJwt(undefined as any)).toEqual({
        valid: false,
        error: 'Token is empty'
      });
    });

    it('returns error for malformed tokens missing 3 dot-separated parts', () => {
      const result1 = validators.validateJwt('part1.part2');
      expect(result1.valid).toBe(false);
      expect(result1.error).toContain('found 2');

      const result2 = validators.validateJwt('part1.part2.part3.part4');
      expect(result2.valid).toBe(false);
      expect(result2.error).toContain('found 4');
    });

    it('validates a properly formatted JWT token with standard base64 encoding', () => {
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ sub: '123', name: 'John Doe', admin: true }));
      const signature = 'sig123';
      const token = `${header}.${payload}.${signature}`;

      const result = validators.validateJwt(token);
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('validates a JWT token using URL-safe base64 encoding (- and _)', () => {
      // Create JSON payload with characters that produce + and / in standard Base64
      const header = btoa(JSON.stringify({ alg: 'HS256' }))
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
      const payload = btoa(JSON.stringify({ data: '>>>??' }))
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
      const token = `${header}.${payload}.sig`;

      const result = validators.validateJwt(token);
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('returns error for invalid base64 or non-JSON parts', () => {
      const result1 = validators.validateJwt('notBase64!.notBase64!.sig');
      expect(result1.valid).toBe(false);
      expect(result1.error).toContain('Failed to Base64 decode or parse JSON');

      const header = btoa('Plain string not JSON');
      const payload = btoa(JSON.stringify({ sub: '123' }));
      const result2 = validators.validateJwt(`${header}.${payload}.sig`);
      expect(result2.valid).toBe(false);
      expect(result2.error).toContain('Failed to Base64 decode or parse JSON');
    });
  });

  describe('validateUrl', () => {
    it('returns error for empty URL input', () => {
      expect(validators.validateUrl('')).toEqual({ valid: false, error: 'URL is empty' });
      expect(validators.validateUrl('   ')).toEqual({ valid: false, error: 'URL is empty' });
    });

    it('validates valid URLs with various schemes, ports, and parameters', () => {
      const res1 = validators.validateUrl('https://example.com/path?foo=bar#section');
      expect(res1.valid).toBe(true);
      expect(res1.error).toBeNull();
      expect(res1.url?.hostname).toBe('example.com');
      expect(res1.url?.pathname).toBe('/path');

      const res2 = validators.validateUrl('http://localhost:3000/api/v1');
      expect(res2.valid).toBe(true);
      expect(res2.url?.port).toBe('3000');

      const res3 = validators.validateUrl('ftp://files.server.net/pub');
      expect(res3.valid).toBe(true);
      expect(res3.url?.protocol).toBe('ftp:');
    });

    it('returns error for invalid URL string formats', () => {
      const result = validators.validateUrl('not-a-valid-url');
      expect(result.valid).toBe(false);
      expect(result.url).toBeNull();
      expect(result.error).toContain('Invalid URL format');
    });
  });

  describe('validateRegex', () => {
    it('returns error for missing pattern input', () => {
      expect(validators.validateRegex(null)).toEqual({
        valid: false,
        error: 'Pattern is required'
      });
      expect(validators.validateRegex(undefined)).toEqual({
        valid: false,
        error: 'Pattern is required'
      });
    });

    it('validates a valid regex pattern string with flags', () => {
      const result = validators.validateRegex('^[a-z0-9_]+$', 'gim');
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
      expect(result.regex).toBeInstanceOf(RegExp);
      expect(result.regex?.flags).toContain('g');
      expect(result.regex?.flags).toContain('i');
      expect(result.regex?.flags).toContain('m');
    });

    it('validates a RegExp object input', () => {
      const regexObj = /test/i;
      const result = validators.validateRegex(regexObj);
      expect(result.valid).toBe(true);
      expect(result.regex).toBeInstanceOf(RegExp);
    });

    it('returns error for invalid regex patterns or flags', () => {
      const res1 = validators.validateRegex('[a-z');
      expect(res1.valid).toBe(false);
      expect(res1.regex).toBeNull();
      expect(typeof res1.error).toBe('string');

      const res2 = validators.validateRegex('test', 'invalidFlags');
      expect(res2.valid).toBe(false);
      expect(res2.regex).toBeNull();
    });
  });

  describe('validateHexColor', () => {
    it('validates 3-digit, 4-digit, 6-digit, and 8-digit HEX colors with or without #', () => {
      expect(validators.validateHexColor('#fff')).toBe(true);
      expect(validators.validateHexColor('#FFF')).toBe(true);
      expect(validators.validateHexColor('#ffff')).toBe(true);
      expect(validators.validateHexColor('#1890ff')).toBe(true);
      expect(validators.validateHexColor('#1890FF80')).toBe(true);
      expect(validators.validateHexColor('ffffff')).toBe(true);
      expect(validators.validateHexColor('1890ff')).toBe(true);
    });

    it('rejects invalid hex strings, invalid lengths, and non-hex characters', () => {
      expect(validators.validateHexColor('#ggg')).toBe(false);
      expect(validators.validateHexColor('#12')).toBe(false);
      expect(validators.validateHexColor('#12345')).toBe(false);
      expect(validators.validateHexColor('#1234567')).toBe(false);
      expect(validators.validateHexColor('#123456789')).toBe(false);
      expect(validators.validateHexColor('')).toBe(false);
    });
  });
});
