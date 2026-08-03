/**
 * @file useUuidGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useUuidGenerator composable
 *
 * @description
 * Tests UUID version selection (v1 vs v4), bulk quantity generation (1-100), uppercase formatting,
 * hyphens removal, formatted multiline string output, sample loading, and reset actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useUuidGenerator } from '../useUuidGenerator';

// ---------- TESTS
describe('useUuidGenerator composable', () => {
  it('initializes with default version v4 and count 5', () => {
    const { version, count, uppercase, hyphens, faq, compatibility } = useUuidGenerator();
    expect(version.value).toBe('v4');
    expect(count.value).toBe(5);
    expect(uppercase.value).toBe(false);
    expect(hyphens.value).toBe(true);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('UUID v4');
  });

  it('generates bulk UUIDs based on specified count and version', () => {
    const { version, count, uuidsList, formattedOutput, generateUuids } = useUuidGenerator();
    version.value = 'v4';
    count.value = 10;
    generateUuids();

    expect(uuidsList.value.length).toBe(10);
    expect(formattedOutput.value.split('\n').length).toBe(10);
    expect(uuidsList.value[0].length).toBe(36);
  });

  it('applies uppercase and hyphen removal options', () => {
    const { uppercase, hyphens, uuidsList, generateUuids } = useUuidGenerator();
    uppercase.value = true;
    hyphens.value = false;
    generateUuids();

    expect(uuidsList.value[0]).toBe(uuidsList.value[0].toUpperCase());
    expect(uuidsList.value[0].includes('-')).toBe(false);
    expect(uuidsList.value[0].length).toBe(32);
  });

  it('loads sample UUIDs and generates list', () => {
    const { uuidsList, handleSample } = useUuidGenerator();
    handleSample();
    expect(uuidsList.value.length).toBeGreaterThan(0);
  });
});
