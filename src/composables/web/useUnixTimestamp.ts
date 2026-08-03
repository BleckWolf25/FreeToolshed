/**
 * @file useUnixTimestamp.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Unix Timestamp Converter & Date Formatter
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the UnixTimestamp component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted, onUnmounted } from 'vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { storage } from '../../utils/storage.js';

// ---------- INTERFACES
export interface TsResult {
  iso: string;
  utc: string;
  local: string;
}

export interface DateResult {
  sec: number;
  ms: number;
}

// ---------- FUNCTION: useUnixTimestamp
export function useUnixTimestamp() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Does this handle timezones?',
      a: 'Unix timestamps are always in UTC. The output displays the local equivalent.'
    }
  ];
  const compatibility = ['Seconds', 'Milliseconds', 'ISO 8601'];
  const handleSample = () => {
    tsInput.value = '1700000000';
    convertTsToDate();
  };

  // ---------- REACTIVE STATE
  const currentSec = ref(Math.floor(Date.now() / 1000));
  const currentMs = ref(Date.now());
  let tickerInterval: ReturnType<typeof setInterval> | null = null;

  const tsInput = ref(Math.floor(Date.now() / 1000).toString());
  const tsUnit = ref('s');

  const tsResult = ref<TsResult | null>(null);

  const dateInput = ref(new Date().toISOString());
  const dateResult = ref<DateResult | null>(null);

  // ---------- METHODS
  const convertTsToDate = () => {
    if (!tsInput.value.trim()) {
      tsResult.value = null;
      return;
    }
    const val = parseInt(tsInput.value.trim());
    if (isNaN(val)) {
      tsResult.value = null;
      return;
    }
    const ms = tsUnit.value === 's' ? val * 1000 : val;
    const d = dayjs(ms);
    if (!d.isValid()) {
      tsResult.value = null;
      return;
    }
    tsResult.value = {
      iso: d.toISOString(),
      utc: d.toDate().toUTCString(),
      local: d.format('YYYY-MM-DD HH:mm:ss Z')
    };
  };

  const convertDateToTs = () => {
    if (!dateInput.value.trim()) {
      dateResult.value = null;
      return;
    }
    const d = dayjs(dateInput.value.trim());
    if (!d.isValid()) {
      dateResult.value = null;
      return;
    }
    dateResult.value = {
      sec: Math.floor(d.valueOf() / 1000),
      ms: d.valueOf()
    };
  };

  const setNow = () => {
    dateInput.value = new Date().toISOString();
    convertDateToTs();
  };

  const copyVal = async (val: string | number) => {
    const success = await storage.copyToClipboard(val.toString());
    if (success) message.success('Timestamp copied to clipboard!');
  };

  const handleReset = () => {
    tsInput.value = Math.floor(Date.now() / 1000).toString();
    dateInput.value = new Date().toISOString();
    convertTsToDate();
    convertDateToTs();
  };

  onMounted(() => {
    tickerInterval = setInterval(() => {
      currentMs.value = Date.now();
      currentSec.value = Math.floor(currentMs.value / 1000);
    }, 1000);

    convertTsToDate();
    convertDateToTs();
  });

  onUnmounted(() => {
    if (tickerInterval) clearInterval(tickerInterval);
  });

  return {
    faq,
    compatibility,
    handleSample,
    currentSec,
    currentMs,
    tickerInterval,
    tsInput,
    tsUnit,
    tsResult,
    dateInput,
    dateResult,
    convertTsToDate,
    convertDateToTs,
    setNow,
    copyVal,
    handleReset
  };
}
