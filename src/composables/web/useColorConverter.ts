/**
 * @file useColorConverter.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Color Format Converter
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the ColorConverter component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import { converters } from '../../utils/converters.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useColorConverter
export function useColorConverter() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'How is contrast calculated?',
      a: 'It calculates WCAG contrast ratios against black and white to determine accessibility.'
    }
  ];
  const compatibility = ['HEX', 'RGB', 'RGBA', 'HSL'];
  const handleSample = () => {
    hexColor.value = '#1890ff';
    onHexChange();
  };

  // ---------- REACTIVE STATE
  const hexColor = ref('#1890FF');

  // ---------- COMPUTED CONVERSIONS
  const rgbObj = computed(() => converters.hexToRgb(hexColor.value) || { r: 24, g: 144, b: 255 });
  const rgbString = computed(() => `rgb(${rgbObj.value.r}, ${rgbObj.value.g}, ${rgbObj.value.b})`);

  const hslObj = computed(() =>
    converters.rgbToHsl(rgbObj.value.r, rgbObj.value.g, rgbObj.value.b)
  );
  const hslString = computed(
    () => `hsl(${hslObj.value.h}, ${hslObj.value.s}%, ${hslObj.value.l}%)`
  );

  // ---------- CONTRAST CALCULATION
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const whiteContrastRatio = computed(() => {
    const l1 = getLuminance(rgbObj.value.r, rgbObj.value.g, rgbObj.value.b);
    const l2 = 1.0; // white
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return ratio.toFixed(2);
  });

  const blackContrastRatio = computed(() => {
    const l1 = getLuminance(rgbObj.value.r, rgbObj.value.g, rgbObj.value.b);
    const l2 = 0.0; // black
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return ratio.toFixed(2);
  });

  const contrastTextColor = computed(() => {
    return parseFloat(whiteContrastRatio.value) > parseFloat(blackContrastRatio.value)
      ? '#FFFFFF'
      : '#000000';
  });

  // ---------- METHODS
  const onHexChange = () => {
    if (!hexColor.value.startsWith('#')) {
      hexColor.value = '#' + hexColor.value;
    }
  };

  const copyVal = async (val: string, label: string) => {
    const success = await storage.copyToClipboard(val);
    if (success) message.success(`${label} copied to clipboard!`);
  };

  const handleReset = () => {
    hexColor.value = '#1890FF';
  };

  return {
    faq,
    compatibility,
    handleSample,
    hexColor,
    rgbObj,
    rgbString,
    hslObj,
    hslString,
    getLuminance,
    whiteContrastRatio,
    blackContrastRatio,
    contrastTextColor,
    onHexChange,
    copyVal,
    handleReset
  };
}
