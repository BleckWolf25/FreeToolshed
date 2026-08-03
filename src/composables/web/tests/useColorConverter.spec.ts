/**
 * @file useColorConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useColorConverter composable
 *
 * @description
 * Tests HEX color parsing, RGB/HSL conversions, WCAG 2.1 luminance & contrast ratio calculations,
 * contrast text color auto-selection, sample data loading, and reset functionality.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useColorConverter } from '../useColorConverter';

// ---------- TESTS
describe('useColorConverter composable', () => {
  it('initializes with default HEX color #1890FF and computed representations', () => {
    const { hexColor, rgbString, hslString, faq, compatibility } = useColorConverter();
    expect(hexColor.value).toBe('#1890FF');
    expect(rgbString.value).toBe('rgb(24, 144, 255)');
    expect(hslString.value).toBe('hsl(209, 100%, 55%)');
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('HEX');
  });

  it('updates RGB and HSL computed values when hexColor changes', () => {
    const { hexColor, rgbString, hslString, rgbObj, hslObj } = useColorConverter();
    hexColor.value = '#FF0000';
    expect(rgbObj.value).toEqual({ r: 255, g: 0, b: 0 });
    expect(rgbString.value).toBe('rgb(255, 0, 0)');
    expect(hslObj.value).toEqual({ h: 0, s: 100, l: 50 });
    expect(hslString.value).toBe('hsl(0, 100%, 50%)');
  });

  it('calculates WCAG 2.1 contrast ratios and selects accessible text color', () => {
    const { hexColor, whiteContrastRatio, blackContrastRatio, contrastTextColor } =
      useColorConverter();

    // Dark background -> White text
    hexColor.value = '#000000';
    expect(Number(blackContrastRatio.value)).toBe(1);
    expect(Number(whiteContrastRatio.value)).toBeGreaterThan(15);
    expect(contrastTextColor.value).toBe('#FFFFFF');

    // Light background -> Black text
    hexColor.value = '#FFFFFF';
    expect(Number(whiteContrastRatio.value)).toBe(1);
    expect(Number(blackContrastRatio.value)).toBeGreaterThan(15);
    expect(contrastTextColor.value).toBe('#000000');
  });

  it('ensures hexColor prefix # is automatically added on input change', () => {
    const { hexColor, onHexChange } = useColorConverter();
    hexColor.value = 'ff5500';
    onHexChange();
    expect(hexColor.value).toBe('#ff5500');
  });

  it('loads sample color and resets state back to default', () => {
    const { hexColor, handleSample, handleReset } = useColorConverter();
    hexColor.value = '#000000';
    handleSample();
    expect(hexColor.value).toBe('#1890ff');

    hexColor.value = '#ffffff';
    handleReset();
    expect(hexColor.value).toBe('#1890FF');
  });
});
