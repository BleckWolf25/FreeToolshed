/**
 * @file useYamlParser.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for YAML to JSON & JSON to YAML Converter
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the YamlParser component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import * as yaml from 'js-yaml';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useYamlParser
export function useYamlParser() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Can it convert between formats?',
      a: 'Yes, you can input YAML, JSON, or TOML and export it to any of the other formats.'
    }
  ];
  const compatibility = ['YAML', 'TOML', 'JSON'];
  const handleSample = () => {
    mode.value = 'yamlToJson';
    inputValue.value = 'title: FreeToolshed\nversion: 1.0.0';
    processConversion();
  };

  // ---------- REACTIVE STATE
  const mode = ref('yamlToJson');
  const inputValue = ref(
    'name: FreeToolshed\nversion: "1.0.0"\nfeatures:\n  - client-side\n  - no-backend\n  - offline-ready\n'
  );
  const outputValue = ref('');
  const errorMessage = ref('');

  const SAMPLES = {
    yamlToJson:
      'server:\n  host: 127.0.0.1\n  port: 8080\n  ssl: false\ntags:\n  - dev\n  - local\n',
    jsonToYaml:
      '{\n  "server": {\n    "host": "127.0.0.1",\n    "port": 8080,\n    "ssl": false\n  },\n  "tags": ["dev", "local"]\n}'
  };

  // ---------- METHODS
  const processConversion = () => {
    errorMessage.value = '';
    if (!inputValue.value.trim()) {
      outputValue.value = '';
      return;
    }

    try {
      if (mode.value === 'yamlToJson') {
        const obj = yaml.load(inputValue.value);
        outputValue.value = JSON.stringify(obj, null, 2);
      } else {
        const obj = JSON.parse(inputValue.value);
        outputValue.value = yaml.dump(obj);
      }
    } catch (e: any) {
      errorMessage.value = e.message;
      outputValue.value = '';
    }
  };

  const loadSample = () => {
    inputValue.value = SAMPLES[mode.value as keyof typeof SAMPLES];
    processConversion();
  };

  const handleCopy = async () => {
    if (!outputValue.value) return;
    const success = await storage.copyToClipboard(outputValue.value);
    if (success) message.success('Output copied to clipboard!');
  };

  const handleDownload = () => {
    if (!outputValue.value) return;
    const ext = mode.value === 'yamlToJson' ? 'json' : 'yaml';
    const blob = new Blob([outputValue.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('File downloaded!');
  };

  const handleReset = () => {
    inputValue.value = '';
    outputValue.value = '';
    errorMessage.value = '';
  };

  onMounted(() => {
    processConversion();
  });

  return {
    faq,
    compatibility,
    handleSample,
    mode,
    inputValue,
    outputValue,
    errorMessage,
    SAMPLES,
    processConversion,
    loadSample,
    handleCopy,
    handleDownload,
    handleReset
  };
}
