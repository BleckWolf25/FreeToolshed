/**
 * @file useMorseTranslator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Text & Morse Code Translator
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the MorseTranslator component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, watch, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { converters } from '../../utils/converters.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useMorseTranslator
export function useMorseTranslator() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Can it play audio?',
      a: 'Yes! Use the Play Audio button to hear the Morse code via the Web Audio API.'
    }
  ];
  const compatibility = ['Text', 'Morse Code'];
  const handleSample = () => {
    mode.value = 'text-to-morse';
    inputText.value = 'SOS';
    processTranslation();
  };

  // ---------- REACTIVE STATE
  const mode = ref('textToMorse');
  const inputText = ref('SOS FREE TOOLSHED');
  const outputMorse = ref('');
  const wpm = ref(15);
  const isPlaying = ref(false);

  let audioCtx: AudioContext | null = null;
  let stopRequested = false;

  // ---------- METHODS
  const processTranslation = () => {
    if (!inputText.value) {
      outputMorse.value = '';
      return;
    }

    if (mode.value === 'textToMorse') {
      outputMorse.value = converters.textToMorse(inputText.value);
    } else {
      outputMorse.value = converters.morseToText(inputText.value);
    }
  };

  const playMorseAudio = async () => {
    const morseCode = mode.value === 'textToMorse' ? outputMorse.value : inputText.value;
    if (!morseCode || isPlaying.value) return;

    isPlaying.value = true;
    stopRequested = false;

    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const dotDuration = 1200 / wpm.value; // ms

    for (let i = 0; i < morseCode.length; i++) {
      if (stopRequested) break;
      const symbol = morseCode[i];

      if (symbol === '.') {
        await playTone(dotDuration);
        await sleep(dotDuration);
      } else if (symbol === '-') {
        await playTone(dotDuration * 3);
        await sleep(dotDuration);
      } else if (symbol === ' ') {
        await sleep(dotDuration * 2);
      } else if (symbol === '/') {
        await sleep(dotDuration * 6);
      }
    }

    isPlaying.value = false;
  };

  const playTone = (duration: number) => {
    return new Promise<void>((resolve) => {
      if (!audioCtx || stopRequested) return resolve();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = 600;
      gain.gain.value = 0.1;

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      setTimeout(() => {
        osc.stop();
        osc.disconnect();
        resolve();
      }, duration);
    });
  };

  const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

  const stopMorseAudio = () => {
    stopRequested = true;
    isPlaying.value = false;
  };

  const handleCopy = async () => {
    if (!outputMorse.value) return;
    const success = await storage.copyToClipboard(outputMorse.value);
    if (success) message.success('Morse translation copied!');
  };

  const handleReset = () => {
    inputText.value = '';
    outputMorse.value = '';
    stopMorseAudio();
  };

  watch([inputText, mode], () => {
    processTranslation();
  });

  onMounted(() => {
    processTranslation();
  });

  return {
    faq,
    compatibility,
    handleSample,
    mode,
    inputText,
    outputMorse,
    wpm,
    isPlaying,
    audioCtx,
    stopRequested,
    processTranslation,
    playMorseAudio,
    playTone,
    sleep,
    stopMorseAudio,
    handleCopy,
    handleReset
  };
}
