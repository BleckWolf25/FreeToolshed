/**
 * @file useAsciiArtGenerator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for ASCII Art Generator
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the AsciiArtGenerator component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import figlet from 'figlet';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useAsciiArtGenerator
export function useAsciiArtGenerator() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Where do the fonts come from?',
      a: 'This uses FIGlet fonts. Several standard fonts are bundled with the tool.'
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
      figlet.text(
        inputText.value,
        {
          font: fontStyle.value,
          horizontalLayout: 'default',
          verticalLayout: 'default'
        },
        (err, data) => {
          if (err) {
            asciiArtOutput.value = 'Error generating ASCII art: ' + err.message;
          } else {
            asciiArtOutput.value = data || '';
          }
        }
      );
    } catch (e: any) {
      asciiArtOutput.value = e.message;
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
