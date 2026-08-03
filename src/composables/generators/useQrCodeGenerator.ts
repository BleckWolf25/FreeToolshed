/**
 * @file useQrCodeGenerator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for QR Code Generator
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the QrCodeGenerator component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import QRCode from 'qrcode';

// ---------- FUNCTION: useQrCodeGenerator
export function useQrCodeGenerator() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Can I use these QR codes commercially?',
      a: 'Yes, the generated QR codes are free to use anywhere.'
    }
  ];
  const compatibility = ['PNG', 'SVG', 'JPEG'];
  const handleSample = () => {
    qrText.value = 'https://freetoolshed.com';
    generateQrCode();
  };

  // ---------- REACTIVE STATE
  const qrText = ref('https://freetoolshed.dev');
  const qrSize = ref(256);
  const errorCorrection = ref('M');
  const fgColor = ref('#000000');
  const bgColor = ref('#ffffff');
  const qrDataUrl = ref('');

  // ---------- METHODS
  const generateQrCode = async () => {
    if (!qrText.value.trim()) {
      qrDataUrl.value = '';
      return;
    }

    try {
      const options: QRCode.QRCodeToDataURLOptions = {
        width: qrSize.value,
        margin: 2,
        errorCorrectionLevel: errorCorrection.value as QRCode.QRCodeErrorCorrectionLevel,
        color: {
          dark: fgColor.value,
          light: bgColor.value
        }
      };
      qrDataUrl.value = await QRCode.toDataURL(qrText.value, options);
    } catch (e: any) {
      message.error('Failed to render QR Code: ' + e.message);
      qrDataUrl.value = '';
    }
  };

  const downloadPng = () => {
    if (!qrDataUrl.value) return;
    const a = document.createElement('a');
    a.href = qrDataUrl.value;
    a.download = 'qrcode.png';
    a.click();
    message.success('QR Code downloaded as PNG!');
  };

  const downloadSvg = async () => {
    if (!qrText.value) return;
    try {
      const options: QRCode.QRCodeToStringOptions = {
        width: qrSize.value,
        margin: 2,
        errorCorrectionLevel: errorCorrection.value as QRCode.QRCodeErrorCorrectionLevel,
        type: 'svg',
        color: {
          dark: fgColor.value,
          light: bgColor.value
        }
      };
      const svgString = await QRCode.toString(qrText.value, options);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.svg';
      a.click();
      URL.revokeObjectURL(url);
      message.success('QR Code downloaded as SVG!');
    } catch (e: any) {
      message.error('Failed to generate SVG: ' + e.message);
    }
  };

  const handleReset = () => {
    qrText.value = '';
    qrDataUrl.value = '';
  };

  onMounted(() => {
    generateQrCode();
  });

  return {
    faq,
    compatibility,
    handleSample,
    qrText,
    qrSize,
    errorCorrection,
    fgColor,
    bgColor,
    qrDataUrl,
    generateQrCode,
    downloadPng,
    downloadSvg,
    handleReset
  };
}
