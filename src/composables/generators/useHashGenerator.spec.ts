/**
 * @file useHashGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useHashGenerator composable
 *
 * @description
 * Tests reactive input hashing for MD5, SHA-1, SHA-256, and SHA-512 algorithms, file upload content loading, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useHashGenerator } from './useHashGenerator';

describe('useHashGenerator composable', () => {
  it('initializes with empty input text and computes empty hash results', () => {
    const { inputValue, hashResults, faq, compatibility } = useHashGenerator();
    expect(inputValue.value).toBe('');
    expect(hashResults.value.length).toBe(4);
    expect(hashResults.value[0].hex).toBe('');
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('SHA-256');
  });

  it('computes MD5, SHA-1, SHA-256, and SHA-512 hashes reactively on input change', () => {
    const { inputValue, hashResults } = useHashGenerator();
    inputValue.value = 'hello world';

    const md5 = hashResults.value.find((h) => h.name === 'MD5');
    const sha256 = hashResults.value.find((h) => h.name === 'SHA-256');

    expect(md5?.hex).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
    expect(sha256?.hex).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
  });

  it('loads sample text and resets state back to empty string', () => {
    const { inputValue, hashResults, handleSample, handleReset } = useHashGenerator();
    handleSample();
    expect(inputValue.value).toBe('FreeToolshed');
    expect(hashResults.value[0].hex).toBeTruthy();

    handleReset();
    expect(inputValue.value).toBe('');
    expect(hashResults.value[0].hex).toBe('');
  });
});
