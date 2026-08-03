/**
 * @file useUrlConverter.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for URL Encoder & Decoder
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the UrlConverter component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { converters } from '../../utils/converters.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useUrlConverter
export function useUrlConverter() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'What is URL Encoding?',
      a: 'URL encoding converts characters into a format that can be safely transmitted over the Internet.'
    },
    {
      q: 'Does it encode every character?',
      a: "It uses encodeURIComponent which leaves letters, numbers, and - _ . ! ~ * \' ( ) unescaped."
    }
  ];
  const compatibility = ['URL', 'URI Components'];
  const handleSample = () => {
    mode.value = 'encode';
    inputValue.value = 'https://example.com/search?q=hello world&filter=true';
    processUrl();
  };

  // ---------- REACTIVE STATE
  const mode = ref('encode');
  const inputValue = ref('');
  const outputValue = ref('');
  const parsedUrl = ref<any>(null);

  const paramColumns = [
    { title: 'Parameter Key', dataIndex: 'key', key: 'key' },
    { title: 'Value', dataIndex: 'value', key: 'value' }
  ];

  // ---------- METHODS
  const processUrl = () => {
    if (!inputValue.value.trim()) {
      outputValue.value = '';
      parsedUrl.value = null;
      return;
    }

    try {
      if (mode.value === 'encode') {
        outputValue.value = converters.urlEncode(inputValue.value);
      } else if (mode.value === 'decode') {
        outputValue.value = converters.urlDecode(inputValue.value);
      }
      // Parse URL components whenever input changes
      parsedUrl.value = converters.parseUrlComponents(inputValue.value);
    } catch (e: any) {
      outputValue.value = 'Error converting URL: ' + e.message;
      parsedUrl.value = null;
    }
  };

  const handleCopy = async () => {
    if (!outputValue.value) return;
    const success = await storage.copyToClipboard(outputValue.value);
    if (success) message.success('URL result copied to clipboard!');
  };

  const handleReset = () => {
    inputValue.value = '';
    outputValue.value = '';
    parsedUrl.value = null;
  };

  return {
    faq,
    compatibility,
    handleSample,
    mode,
    inputValue,
    outputValue,
    parsedUrl,
    paramColumns,
    processUrl,
    handleCopy,
    handleReset
  };
}
