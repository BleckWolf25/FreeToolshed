/**
 * @file useUuidGenerator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for UUID (Universally Unique Identifier) Generator
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the UuidGenerator component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { message } from 'ant-design-vue';
import { generators } from '../../utils/generators.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useUuidGenerator
export function useUuidGenerator() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'What is the difference between v1 and v4?',
      a: 'v1 is based on a timestamp and MAC address, while v4 is entirely randomly generated.'
    }
  ];
  const compatibility = ['UUID v1', 'UUID v4'];
  const handleSample = () => {
    generateUuids();
  };

  // ---------- REACTIVE STATE
  const version = ref('v4');
  const count = ref(5);
  const uppercase = ref(false);
  const hyphens = ref(true);
  const uuidsList = ref<string[]>([]);

  // ---------- COMPUTED OUTPUT
  const formattedOutput = computed(() => uuidsList.value.join('\n'));

  // ---------- METHODS
  const generateUuids = () => {
    const list: string[] = [];
    const q = Math.max(1, Math.min(100, count.value || 1));

    for (let i = 0; i < q; i++) {
      let id = version.value === 'v4' ? generators.generateUuidV4() : generators.generateUuidV1();
      if (!hyphens.value) {
        id = id.replace(/-/g, '');
      }
      if (uppercase.value) {
        id = id.toUpperCase();
      }
      list.push(id);
    }
    uuidsList.value = list;
  };

  const handleCopy = async () => {
    if (uuidsList.value.length === 0) return;
    const success = await storage.copyToClipboard(formattedOutput.value);
    if (success) message.success(`${uuidsList.value.length} UUID(s) copied to clipboard!`);
  };

  const handleDownload = () => {
    if (uuidsList.value.length === 0) return;
    const blob = new Blob([formattedOutput.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    a.click();
    URL.revokeObjectURL(url);
    message.success('UUIDs downloaded!');
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      generateUuids();
    });
  } else {
    generateUuids();
  }

  return {
    faq,
    compatibility,
    handleSample,
    version,
    count,
    uppercase,
    hyphens,
    uuidsList,
    formattedOutput,
    generateUuids,
    handleCopy,
    handleDownload
  };
}
