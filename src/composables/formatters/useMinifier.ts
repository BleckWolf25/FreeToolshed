/**
 * @file useMinifier.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Code Minifier & Compression for JSON, CSS, and JS
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the Minifier component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useMinifier
export function useMinifier() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'How does the minifier work?',
      a: 'It uses regular expressions to safely strip comments, whitespace, and line breaks from your code.'
    }
  ];
  const compatibility = ['JSON', 'CSS', 'JavaScript'];
  const handleSample = () => {
    lang.value = 'css';
    inputCode.value = 'body {\n  color: red;\n}';
    minifyCode();
  };

  // ---------- REACTIVE STATE
  const lang = ref('json');
  const inputCode = ref('');
  const outputCode = ref('');
  const stats = ref<any>(null);

  const SAMPLES = {
    json: '{\n  "appName": "FreeToolshed",\n  "version": 1.0,\n  "clientSide": true\n}',
    css: '/* Primary Navbar */\n.nav-header {\n  background-color: #ffffff;\n  padding: 10px 20px;\n  margin: 0 auto;\n}',
    js: '// Calculate total sum\nfunction calculateSum(a, b) {\n  const result = a + b;\n  return result;\n}'
  };

  // ---------- METHODS
  const processCode = () => {
    if (!inputCode.value.trim()) {
      outputCode.value = '';
      stats.value = null;
      return;
    }
    minifyCode();
  };

  const minifyCode = () => {
    if (!inputCode.value.trim()) return;

    let result = '';
    try {
      if (lang.value === 'json') {
        result = JSON.stringify(JSON.parse(inputCode.value));
      } else if (lang.value === 'css') {
        result = inputCode.value
          .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
          .replace(/\s+/g, ' ') // collapse whitespace
          .replace(/\s*([{}:;,])\s*/g, '$1') // remove spaces around syntax symbols
          .trim();
      } else if (lang.value === 'js') {
        result = inputCode.value
          .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
          .replace(/\/\/.*/g, '') // remove line comments
          .replace(/\s+/g, ' ') // collapse whitespace
          .replace(/\s*([{}:;,=\(\)])\s*/g, '$1')
          .trim();
      }

      outputCode.value = result;

      // Calculate reduction stats
      const orig = new TextEncoder().encode(inputCode.value).length;
      const min = new TextEncoder().encode(result).length;
      const savings = orig > 0 ? (((orig - min) / orig) * 100).toFixed(1) : 0;

      stats.value = {
        originalBytes: orig,
        minifiedBytes: min,
        savings
      };
    } catch (e: any) {
      message.error('Minification error: ' + e.message);
      outputCode.value = '';
      stats.value = null;
    }
  };

  const beautifyCode = () => {
    if (!inputCode.value.trim()) return;
    try {
      if (lang.value === 'json') {
        outputCode.value = JSON.stringify(JSON.parse(inputCode.value), null, 2);
        stats.value = null;
      } else {
        message.info('Beautify is supported for JSON inputs');
      }
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const loadSample = () => {
    inputCode.value = SAMPLES[lang.value as keyof typeof SAMPLES] || '';
    minifyCode();
  };

  const handleCopy = async () => {
    if (!outputCode.value) return;
    const success = await storage.copyToClipboard(outputCode.value);
    if (success) message.success('Minified code copied!');
  };

  const handleDownload = () => {
    if (!outputCode.value) return;
    const ext = lang.value === 'json' ? 'json' : lang.value === 'css' ? 'css' : 'js';
    const blob = new Blob([outputCode.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minified.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Minified file downloaded!');
  };

  const handleReset = () => {
    inputCode.value = '';
    outputCode.value = '';
    stats.value = null;
  };

  return {
    faq,
    compatibility,
    handleSample,
    lang,
    inputCode,
    outputCode,
    stats,
    SAMPLES,
    processCode,
    minifyCode,
    beautifyCode,
    loadSample,
    handleCopy,
    handleDownload,
    handleReset
  };
}
