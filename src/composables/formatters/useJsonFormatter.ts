/**
 * @file useJsonFormatter.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for JSON Formatter, Validator, Prettifier, and Minifier
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the JsonFormatter component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { validators } from '../../utils/validators.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useJsonFormatter
export function useJsonFormatter() {
  // ---------- REACTIVE STATE
  const inputValue = ref('');
  const outputValue = ref('');
  const indentSize = ref(2);
  const isValid = ref<boolean | null>(null);
  const errorMessage = ref('');

  // ---------- SAMPLE JSON
  const SAMPLE_JSON = `{
    "name": "FreeToolshed",
    "version": "1.0.0",
    "private": true,
    "features": [
      "Format & Minify JSON",
      "Encode & Decode Base64",
      "Parse JWT Tokens",
      "Generate UUIDs"
    ],
    "author": {
      "name": "BleckWolf25",
      "license": "MIT"
    },
    "stats": {
      "clientOnly": true,
      "totalTools": 21
    }
  }`;

  const faq = [
    {
      q: 'Does this tool send my data to a server?',
      a: 'No, all formatting and validation happens locally in your browser.'
    },
    {
      q: 'Can I format JSON with comments?',
      a: 'Standard JSON does not support comments, but the tool will highlight syntax errors if present.'
    }
  ];

  const handleSample = () => {
    inputValue.value = SAMPLE_JSON;
    formatJson();
  };

  // ---------- METHODS
  const handleInput = () => {
    if (!inputValue.value.trim()) {
      isValid.value = null;
      errorMessage.value = '';
      outputValue.value = '';
      return;
    }
    formatJson();
  };

  const formatJson = () => {
    if (!inputValue.value.trim()) return;
    const result = validators.validateJson(inputValue.value);
    if (result.valid) {
      isValid.value = true;
      errorMessage.value = '';
      outputValue.value = JSON.stringify(result.parsed, null, indentSize.value);
    } else {
      isValid.value = false;
      errorMessage.value = result.error;
    }
  };

  const minifyJson = () => {
    if (!inputValue.value.trim()) return;
    const result = validators.validateJson(inputValue.value);
    if (result.valid) {
      isValid.value = true;
      errorMessage.value = '';
      outputValue.value = JSON.stringify(result.parsed);
    } else {
      isValid.value = false;
      errorMessage.value = result.error;
    }
  };

  const handleCopy = async () => {
    if (!outputValue.value) return;
    const success = await storage.copyToClipboard(outputValue.value);
    if (success) message.success('Formatted JSON copied to clipboard!');
  };

  const handleDownload = () => {
    if (!outputValue.value) return;
    const blob = new Blob([outputValue.value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
    message.success('JSON downloaded!');
  };

  const handleReset = () => {
    inputValue.value = '';
    outputValue.value = '';
    isValid.value = null;
    errorMessage.value = '';
  };

  return {
    inputValue,
    outputValue,
    indentSize,
    isValid,
    errorMessage,
    SAMPLE_JSON,
    faq,
    handleSample,
    handleInput,
    formatJson,
    minifyJson,
    handleCopy,
    handleDownload,
    handleReset
  };
}
