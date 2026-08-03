/**
 * @file useAsciiArtGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useAsciiArtGenerator composable
 *
 * @description
 * Tests FIGlet ASCII art generation, font selection, empty input clearing, sample loading, and state reset actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useAsciiArtGenerator } from '../useAsciiArtGenerator';

// ---------- TESTS
describe('useAsciiArtGenerator composable', () => {
  it('initializes with default text "Toolshed" and font "Standard"', () => {
    const { inputText, fontStyle, faq, compatibility } = useAsciiArtGenerator();
    expect(inputText.value).toBe('Toolshed');
    expect(fontStyle.value).toBe('Standard');
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Text to ASCII Art');
  });

  it('generates FIGlet ASCII art output for input text', async () => {
    const { inputText, asciiArtOutput, generateAsciiArt } = useAsciiArtGenerator();
    inputText.value = 'TEST';
    generateAsciiArt();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(asciiArtOutput.value).toBeTruthy();
    expect(asciiArtOutput.value.length).toBeGreaterThan(10);
  });

  it('clears asciiArtOutput when inputText is empty', () => {
    const { inputText, asciiArtOutput, generateAsciiArt } = useAsciiArtGenerator();
    inputText.value = '   ';
    generateAsciiArt();

    expect(asciiArtOutput.value).toBe('');
  });

  it('loads sample text and resets state', () => {
    const { inputText, asciiArtOutput, handleSample, handleReset } = useAsciiArtGenerator();
    handleSample();
    expect(inputText.value).toBe('FreeToolshed');

    handleReset();
    expect(inputText.value).toBe('');
    expect(asciiArtOutput.value).toBe('');
  });
});
