/**
 * @file useTextCaseConverter.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Text Case Converter & Formatting
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the TextCaseConverter component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import { converters } from '../../utils/converters.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useTextCaseConverter
export function useTextCaseConverter() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'How many cases are supported?',
      a: 'Supports UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, Title Case, and more.'
    }
  ];
  const compatibility = ['Plain Text'];
  const handleSample = () => {
    inputValue.value = 'hello world from free toolshed';
  };

  // ---------- REACTIVE STATE
  const inputValue = ref('Free Toolshed Client Side Utility Suite');

  // ---------- COMPUTED STATS
  const charCount = computed(() => inputValue.value.length);
  const wordCount = computed(() => {
    const trimmed = inputValue.value.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  });
  const lineCount = computed(() => {
    return inputValue.value ? inputValue.value.split(/\r\n|\r|\n/).length : 0;
  });

  // ---------- COMPUTED CASES
  const caseResults = computed(() => {
    const text = inputValue.value;
    if (!text) {
      return [
        { key: 'upper', label: 'UPPERCASE', value: '' },
        { key: 'lower', label: 'lowercase', value: '' },
        { key: 'title', label: 'Title Case', value: '' },
        { key: 'camel', label: 'camelCase', value: '' },
        { key: 'snake', label: 'snake_case', value: '' },
        { key: 'kebab', label: 'kebab-case', value: '' },
        { key: 'pascal', label: 'PascalCase', value: '' },
        { key: 'dot', label: 'dot.case', value: '' }
      ];
    }

    return [
      { key: 'upper', label: 'UPPERCASE', value: converters.toUppercase(text) },
      { key: 'lower', label: 'lowercase', value: converters.toLowercase(text) },
      { key: 'title', label: 'Title Case', value: converters.toTitleCase(text) },
      { key: 'camel', label: 'camelCase', value: converters.toCamelCase(text) },
      { key: 'snake', label: 'snake_case', value: converters.toSnakeCase(text) },
      { key: 'kebab', label: 'kebab-case', value: converters.toKebabCase(text) },
      { key: 'pascal', label: 'PascalCase', value: converters.toPascalCase(text) },
      { key: 'dot', label: 'dot.case', value: converters.toDotCase(text) }
    ];
  });

  // ---------- METHODS
  const copyCase = async (val: string, label: string) => {
    if (!val) return;
    const success = await storage.copyToClipboard(val);
    if (success) message.success(`${label} copied to clipboard!`);
  };

  const handleReset = () => {
    inputValue.value = '';
  };

  return {
    faq,
    compatibility,
    handleSample,
    inputValue,
    charCount,
    wordCount,
    lineCount,
    caseResults,
    copyCase,
    handleReset
  };
}
