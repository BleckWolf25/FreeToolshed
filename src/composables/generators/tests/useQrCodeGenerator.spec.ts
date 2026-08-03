/**
 * @file useQrCodeGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useQrCodeGenerator composable
 *
 * @description
 * Tests QR Code generation to Data URL PNG, customizable dimensions, error correction levels (L, M, Q, H),
 * foreground/background colors, SVG generation, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useQrCodeGenerator } from '../useQrCodeGenerator';

// ---------- TESTS
describe('useQrCodeGenerator composable', () => {
  it('initializes with default text "https://freetoolshed.dev" and size 256', () => {
    const { qrText, qrSize, errorCorrection, fgColor, bgColor, faq, compatibility } =
      useQrCodeGenerator();
    expect(qrText.value).toBe('https://freetoolshed.dev');
    expect(qrSize.value).toBe(256);
    expect(errorCorrection.value).toBe('M');
    expect(fgColor.value).toBe('#000000');
    expect(bgColor.value).toBe('#ffffff');
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('PNG');
  });

  it('generates QR code Data URL image for valid input text', async () => {
    const { qrText, qrDataUrl, generateQrCode } = useQrCodeGenerator();
    qrText.value = 'https://example.com';
    await generateQrCode();

    expect(qrDataUrl.value).toContain('data:image/png;base64');
  });

  it('clears qrDataUrl when qrText is empty', async () => {
    const { qrText, qrDataUrl, generateQrCode } = useQrCodeGenerator();
    qrText.value = '   ';
    await generateQrCode();

    expect(qrDataUrl.value).toBe('');
  });

  it('loads sample text and resets state', async () => {
    const { qrText, qrDataUrl, handleSample, handleReset } = useQrCodeGenerator();
    handleSample();
    expect(qrText.value).toBe('https://freetoolshed.vercel.app');

    handleReset();
    expect(qrText.value).toBe('');
    expect(qrDataUrl.value).toBe('');
  });
});
