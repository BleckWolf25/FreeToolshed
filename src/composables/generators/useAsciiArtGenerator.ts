/**
 * @file useAsciiArtGenerator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for ASCII Art Generator with client-side importable FIGlet fonts
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the AsciiArtGenerator component.
 * Registers importable FIGlet fonts for 100% offline client-side rendering.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
// @ts-expect-error Ignore TypeScript error for figlet import, as it is a CommonJS module
import figlet, { type Fonts } from 'figlet';

import standardFont from 'figlet/importable-fonts/Standard.js';
import slantFont from 'figlet/importable-fonts/Slant.js';
import ascii3dFont from 'figlet/importable-fonts/3D-ASCII.js';
import bannerFont from 'figlet/importable-fonts/Banner.js';
import doomFont from 'figlet/importable-fonts/Doom.js';

import { storage } from '../../utils/storage.js';

// Pre-parse and register fonts in figlet engine
try {
  figlet.parseFont('Standard', standardFont);
  figlet.parseFont('Slant', slantFont);
  figlet.parseFont('3D-ASCII', ascii3dFont);
  figlet.parseFont('Banner', bannerFont);
  figlet.parseFont('Doom', doomFont);
} catch (e) {
  console.error('Error parsing FIGlet fonts:', e);
}

// ---------- FUNCTION: useAsciiArtGenerator
export function useAsciiArtGenerator() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Where do the fonts come from?',
      a: 'This tool uses FIGlet fonts bundled directly for offline client-side execution.'
    }
  ];
  const compatibility = ['Text to ASCII Art'];
  const handleSample = () => {
    inputText.value = 'FreeToolshed';
    generateAsciiArt();
  };

  // ---------- REACTIVE STATE
  const inputText = ref('Toolshed');
  const fontStyle = ref('Standard');
  const asciiArtOutput = ref('');

  // ---------- METHODS
  const generateAsciiArt = () => {
    if (!inputText.value.trim()) {
      asciiArtOutput.value = '';
      return;
    }

    try {
      const rendered = figlet.textSync(inputText.value, {
        font: fontStyle.value as Fonts,
        horizontalLayout: 'default',
        verticalLayout: 'default'
      });
      asciiArtOutput.value = rendered || '';
    } catch (e: any) {
      asciiArtOutput.value = 'Error generating ASCII art: ' + (e.message || e);
    }
  };

  const handleCopy = async () => {
    if (!asciiArtOutput.value) return;
    const success = await storage.copyToClipboard(asciiArtOutput.value);
    if (success) message.success('ASCII Art copied to clipboard!');
  };

  const handleDownload = () => {
    if (!asciiArtOutput.value) return;
    const blob = new Blob([asciiArtOutput.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-banner.txt';
    a.click();
    URL.revokeObjectURL(url);
    message.success('ASCII Art downloaded!');
  };

  const handleReset = () => {
    inputText.value = '';
    asciiArtOutput.value = '';
  };

  onMounted(() => {
    generateAsciiArt();
  });

  return {
    faq,
    compatibility,
    handleSample,
    inputText,
    fontStyle,
    asciiArtOutput,
    generateAsciiArt,
    handleCopy,
    handleDownload,
    handleReset
  };
}
