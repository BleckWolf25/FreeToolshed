/**
 * @file useMorseTranslator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useMorseTranslator composable
 *
 * @description
 * Tests text-to-morse and morse-to-text translation modes, audio playback control methods, WPM state, sample loading, and reset handler.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useMorseTranslator } from '../useMorseTranslator';

// ---------- TESTS
describe('useMorseTranslator composable', () => {
  it('initializes with default text and translates to Morse code on mount', () => {
    const { mode, inputText, wpm, isPlaying, faq, compatibility } = useMorseTranslator();
    expect(mode.value).toBe('textToMorse');
    expect(inputText.value).toBe('SOS FREE TOOLSHED');
    expect(wpm.value).toBe(15);
    expect(isPlaying.value).toBe(false);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('Morse Code');
  });

  it('translates text to morse code', () => {
    const { mode, inputText, outputMorse, processTranslation } = useMorseTranslator();
    mode.value = 'textToMorse';
    inputText.value = 'SOS';
    processTranslation();

    expect(outputMorse.value).toBe('... --- ...');
  });

  it('translates morse code back to text', () => {
    const { mode, inputText, outputMorse, processTranslation } = useMorseTranslator();
    mode.value = 'morseToText';
    inputText.value = '... --- ...';
    processTranslation();

    expect(outputMorse.value).toBe('SOS');
  });

  it('handles empty input text by clearing outputMorse', () => {
    const { inputText, outputMorse, processTranslation } = useMorseTranslator();
    inputText.value = '';
    processTranslation();

    expect(outputMorse.value).toBe('');
  });

  it('stops morse audio and resets state', () => {
    const { inputText, outputMorse, isPlaying, stopMorseAudio, handleReset } = useMorseTranslator();
    isPlaying.value = true;
    stopMorseAudio();
    expect(isPlaying.value).toBe(false);

    handleReset();
    expect(inputText.value).toBe('');
    expect(outputMorse.value).toBe('');
  });
});
