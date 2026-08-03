/**
 * @file usePasswordGenerator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Secure Random Password & Passphrase Generator
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the PasswordGenerator component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue';
import { message } from 'ant-design-vue';
import { generators } from '../../utils/generators.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: usePasswordGenerator
export function usePasswordGenerator() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Are these passwords secure?',
      a: 'Yes, they are generated using a cryptographically secure random number generator (Crypto.getRandomValues) natively in your browser.'
    }
  ];
  const compatibility = ['Passwords', 'Passphrases'];
  const handleSample = () => {
    generateNewPassword();
  };

  // ---------- REACTIVE STATE
  const password = ref('');
  const batchList = ref<string[]>([]);

  const options = reactive({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false
  });

  // ---------- COMPUTED STRENGTH
  const strengthInfo = computed(() => {
    return generators.calculatePasswordStrength(password.value);
  });

  // ---------- METHODS
  const generateNewPassword = () => {
    try {
      password.value = generators.generatePassword(options);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const generateBatch = () => {
    const list: string[] = [];
    for (let i = 0; i < 5; i++) {
      list.push(generators.generatePassword(options));
    }
    batchList.value = list;
  };

  const copyPrimary = async () => {
    if (!password.value) return;
    const success = await storage.copyToClipboard(password.value);
    if (success) message.success('Password copied to clipboard!');
  };

  const copyBatchItem = async (p: string) => {
    const success = await storage.copyToClipboard(p);
    if (success) message.success('Password copied!');
  };

  const handleReset = () => {
    options.length = 16;
    options.uppercase = true;
    options.lowercase = true;
    options.numbers = true;
    options.symbols = true;
    options.excludeAmbiguous = false;
    generateNewPassword();
    batchList.value = [];
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      generateNewPassword();
    });
  } else {
    generateNewPassword();
  }

  return {
    faq,
    compatibility,
    handleSample,
    password,
    batchList,
    options,
    strengthInfo,
    generateNewPassword,
    generateBatch,
    copyPrimary,
    copyBatchItem,
    handleReset
  };
}
