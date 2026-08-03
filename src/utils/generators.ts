/**
 * @file generators.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Generation logic for passwords, UUIDs, cryptographic hashes, and ASCII art
 *
 * @description
 * Provides functions for configurable password generation with entropy scoring,
 * UUID v1 and v4 creation, cryptographic hashing (MD5, SHA1, SHA256, SHA512) via CryptoJS,
 * and text-to-ASCII art generation.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
// ---------- IMPORTS
import CryptoJS from 'crypto-js';

// ---------- GENERATOR FUNCTIONS
export const generators = {
  /**
   * Generates password based on options
   */
  generatePassword(options: any = {}) {
    const {
      length = 16,
      uppercase = true,
      lowercase = true,
      numbers = true,
      symbols = true,
      excludeAmbiguous = false
    } = options;

    let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      upperChars = upperChars.replace(/[IO]/g, '');
      lowerChars = lowerChars.replace(/[l]/g, '');
      numberChars = numberChars.replace(/[01]/g, '');
      symbolChars = symbolChars.replace(/[|]/g, '');
    }

    let charPool = '';
    if (uppercase) charPool += upperChars;
    if (lowercase) charPool += lowerChars;
    if (numbers) charPool += numberChars;
    if (symbols) charPool += symbolChars;

    if (!charPool) {
      throw new Error('At least one character set must be selected');
    }

    // Ensure at least one character from each selected category
    let passwordArr: string[] = [];
    if (uppercase) passwordArr.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
    if (lowercase) passwordArr.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
    if (numbers) passwordArr.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    if (symbols) passwordArr.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);

    while (passwordArr.length < length) {
      const randomChar = charPool[Math.floor(Math.random() * charPool.length)];
      passwordArr.push(randomChar);
    }

    // Shuffle array using Fisher-Yates
    for (let i = passwordArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArr[i], passwordArr[j]] = [passwordArr[j], passwordArr[i]];
    }

    return passwordArr.join('');
  },

  /**
   * Calculates password entropy and strength
   */
  calculatePasswordStrength(password: string) {
    if (!password) return { score: 0, text: 'Very Weak', color: '#ff4d4f' };
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

    const entropy = password.length * Math.log2(poolSize || 1);

    if (entropy < 28) return { score: 20, text: 'Very Weak', color: '#ff4d4f' };
    if (entropy < 36) return { score: 40, text: 'Weak', color: '#ffa940' };
    if (entropy < 60) return { score: 60, text: 'Reasonable', color: '#faad14' };
    if (entropy < 80) return { score: 80, text: 'Strong', color: '#52c41a' };
    return { score: 100, text: 'Very Strong', color: '#13c2c2' };
  },

  /**
   * Generates UUID v4
   */
  generateUuidV4() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  /**
   * Generates pseudo-UUID v1 (timestamp-based)
   */
  generateUuidV1() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = ((d + Math.random() * 16) % 16) | 0;
      d = Math.floor(d / 16);
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  /**
   * Calculates Hashes for a given text input
   */
  generateHashes(text: string | CryptoJS.lib.WordArray) {
    if (!text) {
      return { md5: '', sha1: '', sha256: '', sha512: '' };
    }
    return {
      md5: CryptoJS.MD5(text).toString(),
      sha1: CryptoJS.SHA1(text).toString(),
      sha256: CryptoJS.SHA256(text).toString(),
      sha512: CryptoJS.SHA512(text).toString(),
      md5Base64: CryptoJS.MD5(text).toString(CryptoJS.enc.Base64),
      sha256Base64: CryptoJS.SHA256(text).toString(CryptoJS.enc.Base64)
    };
  }
};
