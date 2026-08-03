/**
 * @file validators.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Validation helper functions for developer data structures and formats
 *
 * @description
 * Contains validation utilities for JSON strings, JWT tokens, URLs, Regular Expressions,
 * Cron expressions, YAML data, and color codes. Provides detailed error messages.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
// ---------- VALIDATION FUNCTIONS
export const validators = {
  /**
   * Validates a JSON string and returns error info if invalid
   */
  validateJson(str: string) {
    if (!str || !str.trim()) {
      return { valid: false, error: 'Input is empty' };
    }
    try {
      const parsed = JSON.parse(str);
      return { valid: true, error: null, parsed };
    } catch (e: any) {
      return { valid: false, error: e.message, parsed: null };
    }
  },

  /**
   * Validates a JWT string structure (header.payload.signature)
   */
  validateJwt(token: string) {
    if (!token || typeof token !== 'string') {
      return { valid: false, error: 'Token is empty' };
    }
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return {
        valid: false,
        error: `JWT must contain 3 dot-separated parts (found ${parts.length})`
      };
    }
    try {
      const headerStr = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
      const payloadStr = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      JSON.parse(headerStr);
      JSON.parse(payloadStr);
      return { valid: true, error: null };
    } catch (e: any) {
      return {
        valid: false,
        error: 'Failed to Base64 decode or parse JSON header/payload: ' + e.message
      };
    }
  },

  /**
   * Validates a URL string
   */
  validateUrl(urlStr: string) {
    if (!urlStr || !urlStr.trim()) {
      return { valid: false, error: 'URL is empty' };
    }
    try {
      const url = new URL(urlStr.trim());
      return { valid: true, error: null, url };
    } catch (e: any) {
      return {
        valid: false,
        error: 'Invalid URL format. Example: https://example.com/path',
        url: null
      };
    }
  },

  /**
   * Validates a Regular Expression pattern and flags
   */
  validateRegex(pattern: string | RegExp | null | undefined, flags = 'g') {
    if (pattern === undefined || pattern === null) {
      return { valid: false, error: 'Pattern is required' };
    }
    try {
      const regex = new RegExp(pattern, flags);
      return { valid: true, error: null, regex };
    } catch (e: any) {
      return { valid: false, error: e.message, regex: null };
    }
  },

  /**
   * Validates HEX color code
   */
  validateHexColor(hex: string) {
    return /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(hex);
  }
};
