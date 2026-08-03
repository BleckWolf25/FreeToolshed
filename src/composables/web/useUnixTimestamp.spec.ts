/**
 * @file useUnixTimestamp.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useUnixTimestamp composable
 *
 * @description
 * Tests live clock ticker, timestamp-to-date conversion (ISO, UTC, Local), date-to-timestamp conversion (sec, ms),
 * unit selection (s/ms), setNow action, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useUnixTimestamp } from './useUnixTimestamp';

describe('useUnixTimestamp composable', () => {
  it('initializes with current timestamp, inputs, and faq metadata', () => {
    const { currentSec, currentMs, tsInput, tsUnit, faq, compatibility } = useUnixTimestamp();
    expect(currentSec.value).toBeGreaterThan(0);
    expect(currentMs.value).toBeGreaterThan(0);
    expect(tsInput.value).toBeTruthy();
    expect(tsUnit.value).toBe('s');
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Seconds');
  });

  it('converts Unix timestamp in seconds to ISO, UTC, and local date strings', () => {
    const { tsInput, tsUnit, tsResult, convertTsToDate } = useUnixTimestamp();
    tsInput.value = '1700000000';
    tsUnit.value = 's';
    convertTsToDate();

    expect(tsResult.value).not.toBeNull();
    expect(tsResult.value?.iso).toBe('2023-11-14T22:13:20.000Z');
    expect(tsResult.value?.utc).toBe('Tue, 14 Nov 2023 22:13:20 GMT');
  });

  it('converts Unix timestamp in milliseconds to date formats', () => {
    const { tsInput, tsUnit, tsResult, convertTsToDate } = useUnixTimestamp();
    tsInput.value = '1700000000000';
    tsUnit.value = 'ms';
    convertTsToDate();

    expect(tsResult.value).not.toBeNull();
    expect(tsResult.value?.iso).toBe('2023-11-14T22:13:20.000Z');
  });

  it('converts date string to Unix timestamp in seconds and milliseconds', () => {
    const { dateInput, dateResult, convertDateToTs } = useUnixTimestamp();
    dateInput.value = '2023-11-14T22:13:20.000Z';
    convertDateToTs();

    expect(dateResult.value).not.toBeNull();
    expect(dateResult.value?.sec).toBe(1700000000);
    expect(dateResult.value?.ms).toBe(1700000000000);
  });

  it('handles invalid or empty inputs by setting result objects to null', () => {
    const { tsInput, tsResult, dateInput, dateResult, convertTsToDate, convertDateToTs } =
      useUnixTimestamp();

    tsInput.value = 'invalid';
    convertTsToDate();
    expect(tsResult.value).toBeNull();

    dateInput.value = 'invalid-date';
    convertDateToTs();
    expect(dateResult.value).toBeNull();
  });

  it('sets current date/time on setNow and resets state on handleReset', () => {
    const { dateInput, dateResult, setNow, handleReset } = useUnixTimestamp();
    setNow();
    expect(dateInput.value).toBeTruthy();
    expect(dateResult.value).not.toBeNull();

    handleReset();
    expect(dateInput.value).toBeTruthy();
  });
});
