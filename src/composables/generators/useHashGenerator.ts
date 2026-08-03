/**
 * @file useHashGenerator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Cryptographic Hash Generator
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the HashGenerator component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import { generators } from '../../utils/generators.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useHashGenerator
export function useHashGenerator() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Is the hashing done securely?',
      a: 'Yes, it uses CryptoJS entirely within your browser. No data is sent over the network.'
    },
    {
      q: 'Can I hash files?',
      a: 'Currently, this tool hashes text input. File hashing may be added in the future.'
    }
  ];
  const compatibility = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512', 'HMAC'];
  const handleSample = () => {
    inputValue.value = 'FreeToolshed';
  };

  // ---------- REACTIVE STATE
  const inputValue = ref('');

  // ---------- COMPUTED HASHES
  const hashes = computed(() => generators.generateHashes(inputValue.value));

  const hashResults = computed(() => {
    return [
      { name: 'MD5', hex: hashes.value.md5, base64: hashes.value.md5Base64 },
      { name: 'SHA-1', hex: hashes.value.sha1, base64: null },
      { name: 'SHA-256', hex: hashes.value.sha256, base64: hashes.value.sha256Base64 },
      { name: 'SHA-512', hex: hashes.value.sha512, base64: null }
    ];
  });

  // ---------- METHODS
  const handleFileUpload = (file: Blob & { name?: string }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      inputValue.value = (e.target?.result as string) || '';
      message.success(`Loaded content of ${file.name || 'file'}!`);
    };
    reader.readAsText(file);
    return false;
  };

  const copyHash = async (val: string, label: string) => {
    if (!val) return;
    const success = await storage.copyToClipboard(val);
    if (success) message.success(`${label} copied!`);
  };

  const handleReset = () => {
    inputValue.value = '';
  };

  return {
    faq,
    compatibility,
    handleSample,
    inputValue,
    hashes,
    hashResults,
    handleFileUpload,
    copyHash,
    handleReset
  };
}
