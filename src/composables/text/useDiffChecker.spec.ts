/**
 * @file useDiffChecker.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useDiffChecker composable
 *
 * @description
 * Tests text difference computation via diff-match-patch, HTML markup highlighting with diff-add and diff-del spans,
 * additions and deletions character count statistics, sample loading, and state reset actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useDiffChecker } from './useDiffChecker';

describe('useDiffChecker composable', () => {
  it('initializes with default sample code strings and computes initial diff', () => {
    const { text1, text2, diffHtml, diffStats, computeDiff, faq, compatibility } = useDiffChecker();
    computeDiff();

    expect(text1.value).toBeTruthy();
    expect(text2.value).toBeTruthy();
    expect(diffHtml.value).toBeTruthy();
    expect(diffStats.value).not.toBeNull();
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Plain Text');
  });

  it('computes diff additions, deletions, and equal parts between two text versions', () => {
    const { text1, text2, diffHtml, diffStats, computeDiff } = useDiffChecker();
    text1.value = 'The quick brown fox';
    text2.value = 'The fast brown fox!';
    computeDiff();

    expect(diffHtml.value).toContain('diff-del');
    expect(diffHtml.value).toContain('diff-add');
    expect(diffHtml.value).toContain('diff-equal');
    expect(diffStats.value?.additions).toBeGreaterThan(0);
    expect(diffStats.value?.deletions).toBeGreaterThan(0);
  });

  it('handles empty inputs by clearing diff HTML and stats', () => {
    const { text1, text2, diffHtml, diffStats, computeDiff } = useDiffChecker();
    text1.value = '';
    text2.value = '';
    computeDiff();

    expect(diffHtml.value).toBe('');
    expect(diffStats.value).toBeNull();
  });

  it('loads sample code and resets state', () => {
    const { text1, text2, diffHtml, loadSample, handleReset } = useDiffChecker();
    loadSample();
    expect(text1.value).toContain('Version 1.0');
    expect(text2.value).toContain('Version 2.0');
    expect(diffHtml.value).toBeTruthy();

    handleReset();
    expect(text1.value).toBe('');
    expect(text2.value).toBe('');
    expect(diffHtml.value).toBe('');
  });
});
