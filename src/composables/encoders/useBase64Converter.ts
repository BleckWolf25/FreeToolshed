/**
 * @file useBase64Converter.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Base64 Encoder and Decoder
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the Base64Converter component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { converters } from '../../utils/converters.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useBase64Converter
export function useBase64Converter() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Can I encode large files?',
      a: 'Yes, you can upload files to be converted directly into Base64 format in your browser.'
    },
    {
      q: 'What happens to the images?',
      a: 'If you decode a Base64 data URI for an image, it will display a live preview.'
    }
  ];
  const compatibility = ['Text', 'Binary Files', 'Data URIs'];
  // ---------- REACTIVE STATE
  const mode = ref('encode');
  const inputValue = ref('');
  const outputValue = ref('');
  const errorMessage = ref('');
  const imagePreviewUrl = ref('');

  // ---------- METHODS
  const processConversion = () => {
    errorMessage.value = '';
    imagePreviewUrl.value = '';

    if (!inputValue.value.trim()) {
      outputValue.value = '';
      return;
    }

    try {
      if (mode.value === 'encode') {
        outputValue.value = converters.base64Encode(inputValue.value);
      } else {
        let rawStr = inputValue.value.trim();
        if (rawStr.startsWith('data:image/')) {
          imagePreviewUrl.value = rawStr;
          rawStr = rawStr.split(',')[1] || '';
        }
        const decoded = converters.base64Decode(rawStr);
        outputValue.value = decoded;
      }
    } catch (e: any) {
      errorMessage.value = e.message;
      outputValue.value = '';
    }
  };

  const handleSample = () => {
    mode.value = 'encode';
    inputValue.value = 'Hello World from FreeToolshed!';
    processConversion();
  };

  const handleFileUpload = (file: Blob & { name?: string }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Str = e.target?.result as string;
      outputValue.value = base64Str || '';
      if (file.type.startsWith('image/')) {
        imagePreviewUrl.value = base64Str || '';
      }
      message.success(`Encoded ${file.name || 'file'} to Base64!`);
    };
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  const handleCopy = async () => {
    if (!outputValue.value) return;
    const success = await storage.copyToClipboard(outputValue.value);
    if (success) message.success('Base64 output copied to clipboard!');
  };

  const handleDownload = () => {
    if (!outputValue.value) return;
    const blob = new Blob([outputValue.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode.value === 'encode' ? 'encoded.base64.txt' : 'decoded.txt';
    a.click();
    URL.revokeObjectURL(url);
    message.success('File downloaded!');
  };

  const handleReset = () => {
    inputValue.value = '';
    outputValue.value = '';
    errorMessage.value = '';
    imagePreviewUrl.value = '';
  };

  return {
    faq,
    compatibility,
    handleSample,
    mode,
    inputValue,
    outputValue,
    errorMessage,
    imagePreviewUrl,
    processConversion,
    handleFileUpload,
    handleCopy,
    handleDownload,
    handleReset
  };
}
