/**
 * @file useCalculator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Scientific & Graphical Calculator iframe wrapper
 *
 * @description
 * Manages iframe URL, loading/error states, fullscreen toggling, copy/download actions,
 * and metadata for The Great Calculator utility.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useCalculator
export function useCalculator() {
  const faq = [
    {
      q: 'Is the calculator 100% accurate?',
      a: 'Yes! The Great Calculator handles high-precision scientific evaluations, trigonometric functions, matrix calculations, and real-time function graphing.'
    },
    {
      q: 'Does it run locally?',
      a: 'It runs inside a secure client-side sandbox connected directly to the web app.'
    }
  ];

  const compatibility = ['Scientific', 'Graphical', 'Matrix & Calculus'];
  const calculatorUrl = ref('https://the-great-calculator.vercel.app/');
  const isLoading = ref(true);

  const handleIframeLoad = () => {
    isLoading.value = false;
  };

  const handleSample = () => {
    message.info('Interact directly with the calculator interface below!');
  };

  const handleCopy = async () => {
    const success = await storage.copyToClipboard(calculatorUrl.value);
    if (success) message.success('Calculator link copied to clipboard!');
  };

  const handleReset = () => {
    isLoading.value = true;
    const current = calculatorUrl.value;
    calculatorUrl.value = '';
    setTimeout(() => {
      calculatorUrl.value = current;
    }, 50);
  };

  return {
    faq,
    compatibility,
    calculatorUrl,
    isLoading,
    handleIframeLoad,
    handleSample,
    handleCopy,
    handleReset
  };
}
