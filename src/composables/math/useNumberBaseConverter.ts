/**
 * @file useNumberBaseConverter.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Number Base Converter (Binary, Octal, Decimal, Hex, Custom 2-36)
 *
 * @description
 * Synchronizes multi-base inputs (Binary, Octal, Decimal, Hexadecimal, and Custom bases),
 * calculates 8/16/32-bit binary bitwise representation and Two's Complement.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { storage } from '../../utils/storage.js';

// ---------- INTERFACES
export interface BaseState {
  binary: string;
  octal: string;
  decimal: string;
  hex: string;
  customBase: number;
  customValue: string;
  bit32: string;
  twosComplement8: string;
  isValid: boolean;
  errorMessage: string;
}

// ---------- FUNCTION: useNumberBaseConverter
export function useNumberBaseConverter() {
  const faq = [
    {
      q: 'Which bases are supported?',
      a: 'Binary (Base 2), Octal (Base 8), Decimal (Base 10), Hexadecimal (Base 16), and custom bases from Base 2 up to Base 36.'
    },
    {
      q: 'Does it support negative numbers?',
      a: "Decimal inputs calculate signed 8-bit, 16-bit, and 32-bit binary values and Two's Complement representation."
    }
  ];

  const compatibility = [
    'Binary (2)',
    'Octal (8)',
    'Decimal (10)',
    'Hexadecimal (16)',
    'Custom (2-36)'
  ];

  // ---------- REACTIVE STATE
  const activeField = ref<'dec' | 'bin' | 'oct' | 'hex' | 'custom'>('dec');
  const binaryInput = ref('11111111');
  const octalInput = ref('377');
  const decimalInput = ref('255');
  const hexInput = ref('FF');
  const customBase = ref(32);
  const customInput = ref('7V');

  const bit8 = ref('11111111');
  const bit16 = ref('0000000011111111');
  const bit32 = ref('00000000000000000000000011111111');
  const twosComplement8 = ref('11111111');

  const isValid = ref(true);
  const errorMessage = ref('');

  // ---------- CONVERSION LOGIC
  const convertFromDecimal = (val: bigint) => {
    try {
      binaryInput.value = val < 0n ? '-' + (-val).toString(2) : val.toString(2);
      octalInput.value = val < 0n ? '-' + (-val).toString(8) : val.toString(8);
      hexInput.value = (val < 0n ? '-' + (-val).toString(16) : val.toString(16)).toUpperCase();

      const base = Math.min(36, Math.max(2, customBase.value || 10));
      customInput.value = (
        val < 0n ? '-' + (-val).toString(base) : val.toString(base)
      ).toUpperCase();

      // Bitwise representations (32-bit unsigned / signed)
      const num32 = Number(val & 0xffffffffn) >>> 0;
      bit32.value = num32.toString(2).padStart(32, '0');

      const num16 = Number(val & 0xffffn) >>> 0;
      bit16.value = num16.toString(2).padStart(16, '0');

      const num8 = Number(val & 0xffn) >>> 0;
      bit8.value = num8.toString(2).padStart(8, '0');

      // 8-bit Two's Complement calculation for signed representation
      let tc8 = (Number(val) & 0xff) >>> 0;
      twosComplement8.value = tc8.toString(2).padStart(8, '0');

      isValid.value = true;
      errorMessage.value = '';
    } catch (e: any) {
      isValid.value = false;
      errorMessage.value = 'Conversion error: ' + (e.message || e);
    }
  };

  const updateFromDecimal = () => {
    activeField.value = 'dec';
    if (!decimalInput.value.trim()) {
      clearAll();
      return;
    }
    try {
      const val = BigInt(decimalInput.value.trim());
      convertFromDecimal(val);
    } catch {
      isValid.value = false;
      errorMessage.value = 'Invalid Decimal format';
    }
  };

  const updateFromBinary = () => {
    activeField.value = 'bin';
    const clean = binaryInput.value.trim();
    if (!clean) {
      clearAll();
      return;
    }
    try {
      const isNeg = clean.startsWith('-');
      const str = isNeg ? clean.slice(1) : clean;
      if (!/^[01]+$/.test(str)) throw new Error('Binary accepts digits 0 and 1 only');
      let val = BigInt('0b' + str);
      if (isNeg) val = -val;
      decimalInput.value = val.toString();
      convertFromDecimal(val);
    } catch (e: any) {
      isValid.value = false;
      errorMessage.value = e.message || 'Invalid Binary format';
    }
  };

  const updateFromOctal = () => {
    activeField.value = 'oct';
    const clean = octalInput.value.trim();
    if (!clean) {
      clearAll();
      return;
    }
    try {
      const isNeg = clean.startsWith('-');
      const str = isNeg ? clean.slice(1) : clean;
      if (!/^[0-7]+$/.test(str)) throw new Error('Octal accepts digits 0-7 only');
      let val = BigInt('0o' + str);
      if (isNeg) val = -val;
      decimalInput.value = val.toString();
      convertFromDecimal(val);
    } catch (e: any) {
      isValid.value = false;
      errorMessage.value = e.message || 'Invalid Octal format';
    }
  };

  const updateFromHex = () => {
    activeField.value = 'hex';
    const clean = hexInput.value.trim();
    if (!clean) {
      clearAll();
      return;
    }
    try {
      const isNeg = clean.startsWith('-');
      const str = isNeg ? clean.slice(1) : clean;
      if (!/^[0-9a-fA-F]+$/.test(str)) throw new Error('Hexadecimal accepts 0-9 and A-F only');
      let val = BigInt('0x' + str);
      if (isNeg) val = -val;
      decimalInput.value = val.toString();
      convertFromDecimal(val);
    } catch (e: any) {
      isValid.value = false;
      errorMessage.value = e.message || 'Invalid Hexadecimal format';
    }
  };

  const updateFromCustom = () => {
    activeField.value = 'custom';
    const clean = customInput.value.trim();
    if (!clean) {
      clearAll();
      return;
    }
    try {
      const base = Math.min(36, Math.max(2, customBase.value || 10));
      const isNeg = clean.startsWith('-');
      const str = (isNeg ? clean.slice(1) : clean).toLowerCase();

      let val = 0n;
      const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
      for (const char of str) {
        const idx = digits.indexOf(char);
        if (idx === -1 || idx >= base) {
          throw new Error(`Invalid digit '${char}' for Base ${base}`);
        }
        val = val * BigInt(base) + BigInt(idx);
      }
      if (isNeg) val = -val;

      decimalInput.value = val.toString();
      convertFromDecimal(val);
    } catch (e: any) {
      isValid.value = false;
      errorMessage.value = e.message || 'Invalid Custom Base format';
    }
  };

  const clearAll = () => {
    binaryInput.value = '';
    octalInput.value = '';
    decimalInput.value = '';
    hexInput.value = '';
    customInput.value = '';
    bit8.value = '';
    bit16.value = '';
    bit32.value = '';
    twosComplement8.value = '';
    isValid.value = true;
    errorMessage.value = '';
  };

  const handleSample = () => {
    decimalInput.value = '255';
    updateFromDecimal();
  };

  const handleCopy = async () => {
    const text = `DEC: ${decimalInput.value}\nHEX: 0x${hexInput.value}\nBIN: 0b${binaryInput.value}\nOCT: 0o${octalInput.value}`;
    const success = await storage.copyToClipboard(text);
    if (success) message.success('Base conversion values copied to clipboard!');
  };

  const handleReset = () => {
    decimalInput.value = '255';
    updateFromDecimal();
  };

  return {
    faq,
    compatibility,
    binaryInput,
    octalInput,
    decimalInput,
    hexInput,
    customBase,
    customInput,
    bit8,
    bit16,
    bit32,
    twosComplement8,
    isValid,
    errorMessage,
    updateFromDecimal,
    updateFromBinary,
    updateFromOctal,
    updateFromHex,
    updateFromCustom,
    handleSample,
    handleCopy,
    handleReset
  };
}
