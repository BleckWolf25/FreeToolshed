/**
 * @file generators.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for generator utilities
 *
 * @description
 * Tests password generation options, character pool selection, entropy scoring, UUID v1 & v4 creation,
 * and cryptographic hashing functions (MD5, SHA1, SHA256, SHA512).
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { generators } from '../generators';

// ---------- TESTS
describe('generators utility', () => {
  describe('generatePassword', () => {
    it('generates a password with default options (length 16)', () => {
      const pwd = generators.generatePassword();
      expect(typeof pwd).toBe('string');
      expect(pwd.length).toBe(16);
    });

    it('generates password with custom length and selected character sets', () => {
      const pwd = generators.generatePassword({
        length: 32,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false
      });
      expect(pwd.length).toBe(32);
      expect(/[^a-zA-Z0-9]/.test(pwd)).toBe(false);
      expect(/[A-Z]/.test(pwd)).toBe(true);
      expect(/[a-z]/.test(pwd)).toBe(true);
      expect(/[0-9]/.test(pwd)).toBe(true);
    });

    it('guarantees at least one character from each selected option', () => {
      const pwd = generators.generatePassword({
        length: 4,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
      });
      expect(pwd.length).toBe(4);
      expect(/[A-Z]/.test(pwd)).toBe(true);
      expect(/[a-z]/.test(pwd)).toBe(true);
      expect(/[0-9]/.test(pwd)).toBe(true);
      expect(/[^a-zA-Z0-9]/.test(pwd)).toBe(true);
    });

    it('throws error when no character sets are selected', () => {
      expect(() =>
        generators.generatePassword({
          uppercase: false,
          lowercase: false,
          numbers: false,
          symbols: false
        })
      ).toThrow('At least one character set must be selected');
    });

    it('excludes ambiguous characters (I, O, l, 0, 1, |) when option is set', () => {
      const pwd = generators.generatePassword({
        length: 100,
        excludeAmbiguous: true,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
      });
      expect(/[IOl01|]/.test(pwd)).toBe(false);
    });
  });

  describe('calculatePasswordStrength', () => {
    it('returns score 0 and "Very Weak" for empty password', () => {
      expect(generators.calculatePasswordStrength('')).toEqual({
        score: 0,
        text: 'Very Weak',
        color: '#ff4d4f'
      });
    });

    it('calculates score and strength classification for weak passwords', () => {
      const weak = generators.calculatePasswordStrength('abc');
      expect(weak.score).toBeLessThanOrEqual(40);
      expect(weak.text).toBe('Very Weak');
      expect(weak.color).toBe('#ff4d4f');

      const weak2 = generators.calculatePasswordStrength('password123');
      expect(weak2.score).toBe(60);
      expect(weak2.text).toBe('Reasonable');
    });

    it('calculates score and strength classification for strong passwords', () => {
      const strong = generators.calculatePasswordStrength('P@ssw0rd123!#ComplexLongString');
      expect(strong.score).toBe(100);
      expect(strong.text).toBe('Very Strong');
      expect(strong.color).toBe('#13c2c2');
    });
  });

  describe('UUID Generators', () => {
    it('generates valid RFC-4122 compliant UUID v4 string', () => {
      const uuid = generators.generateUuidV4();
      expect(typeof uuid).toBe('string');
      expect(uuid.length).toBe(36);
      expect(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)
      ).toBe(true);
    });

    it('generates unique UUID v4 values across multiple calls', () => {
      const uuids = new Set(Array.from({ length: 50 }, () => generators.generateUuidV4()));
      expect(uuids.size).toBe(50);
    });

    it('generates valid pseudo UUID v1 string with version 1 digit', () => {
      const uuid = generators.generateUuidV1();
      expect(typeof uuid).toBe('string');
      expect(uuid.length).toBe(36);
      expect(
        /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)
      ).toBe(true);
    });
  });

  describe('generateHashes', () => {
    it('returns empty hash strings for empty text input', () => {
      expect(generators.generateHashes('')).toEqual({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: ''
      });
    });

    it('computes correct MD5, SHA1, SHA256, and SHA512 hex hashes for text input', () => {
      const hashes = generators.generateHashes('hello world');
      expect(hashes.md5).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
      expect(hashes.sha1).toBe('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
      expect(hashes.sha256).toBe(
        'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
      );
      expect(hashes.sha512.length).toBe(128);
      expect(hashes.md5Base64).toBeDefined();
      expect(hashes.sha256Base64).toBeDefined();
    });
  });
});
