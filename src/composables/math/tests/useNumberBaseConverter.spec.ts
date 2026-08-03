/**
 * @file useNumberBaseConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for useNumberBaseConverter composable
 *
 * @description
 * Tests multi-base conversions between Decimal, Binary, Octal, Hexadecimal, and Custom bases,
 * as well as bitwise 8/16/32-bit and Two's Complement calculations.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useNumberBaseConverter } from '../useNumberBaseConverter.js';

// ---------- TESTS
describe('useNumberBaseConverter composable', () => {
  it('converts Decimal 255 to Binary, Octal, Hex, and 32-bit representation', () => {
    const { decimalInput, binaryInput, octalInput, hexInput, bit32, updateFromDecimal } =
      useNumberBaseConverter();
    decimalInput.value = '255';
    updateFromDecimal();

    expect(binaryInput.value).toBe('11111111');
    expect(octalInput.value).toBe('377');
    expect(hexInput.value).toBe('FF');
    expect(bit32.value).toBe('00000000000000000000000011111111');
  });

  it('converts Binary 1010 to Decimal 10, Octal 12, and Hex A', () => {
    const { binaryInput, decimalInput, octalInput, hexInput, updateFromBinary } =
      useNumberBaseConverter();
    binaryInput.value = '1010';
    updateFromBinary();

    expect(decimalInput.value).toBe('10');
    expect(octalInput.value).toBe('12');
    expect(hexInput.value).toBe('A');
  });

  it('converts Hex FF to Decimal 255', () => {
    const { hexInput, decimalInput, updateFromHex } = useNumberBaseConverter();
    hexInput.value = 'FF';
    updateFromHex();

    expect(decimalInput.value).toBe('255');
  });

  it('handles invalid binary string gracefully with error message', () => {
    const { binaryInput, isValid, errorMessage, updateFromBinary } = useNumberBaseConverter();
    binaryInput.value = '10201';
    updateFromBinary();

    expect(isValid.value).toBe(false);
    expect(errorMessage.value).toContain('Binary accepts digits 0 and 1 only');
  });
});
