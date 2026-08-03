/**
 * @file converters.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Data transformation, encoding, decoding, case conversion, and color conversion logic
 *
 * @description
 * Complete suite of text converters: UPPERCASE, lowercase, Title Case, camelCase,
 * snake_case, kebab-case, PascalCase, dot.case; Base64 conversion; URL parsing;
 * Color conversions (HEX, RGB, HSL); CSV to JSON parser; and Morse code dictionary + WebAudio generator.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
// ---------- MORSE DICTIONARY
const MORSE_MAP = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
  ' ': '/',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  _: '..--.-',
  '"': '.-..-.',
  $: '...-..-',
  '@': '.--.-.'
};

const REVERSE_MORSE_MAP = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

// ---------- CONVERTERS MODULE
export const converters = {
  // ---------- TEXT CASE CONVERTERS
  toUppercase: (text: string) => text.toUpperCase(),
  toLowercase: (text: string) => text.toLowerCase(),
  toTitleCase: (text: string) => {
    return text.replace(
      /\w\S*/g,
      (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },
  toCamelCase: (text: string) => {
    return text
      .replace(/[^a-zA-Z0-9]+(.)/g, (_: any, chr: string) => chr.toUpperCase())
      .replace(/^[A-Z]/, (chr: string) => chr.toLowerCase());
  },
  toSnakeCase: (text: string) => {
    return text
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .toLowerCase()
      .replace(/^_+|_+$/g, '');
  },
  toKebabCase: (text: string) => {
    return text
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .toLowerCase()
      .replace(/^-+|-+$/g, '');
  },
  toPascalCase: (text: any) => {
    const camel = converters.toCamelCase(text);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  },
  toDotCase: (text: string) => {
    return text
      .replace(/([a-z0-9])([A-Z])/g, '$1.$2')
      .replace(/[^a-zA-Z0-9]+/g, '.')
      .toLowerCase()
      .replace(/^\.+|\.+$/g, '');
  },

  // ---------- BASE64 CONVERTERS
  base64Encode: (str: string | number | boolean) => {
    try {
      return btoa(unescape(encodeURIComponent(String(str))));
    } catch (e: any) {
      throw new Error('Base64 encoding failed: ' + e.message);
    }
  },
  base64Decode: (str: string) => {
    try {
      return decodeURIComponent(escape(atob(str.trim())));
    } catch (e) {
      throw new Error('Invalid Base64 string format');
    }
  },

  // ---------- URL CONVERTERS
  urlEncode: (str: string | number | boolean) => encodeURIComponent(String(str)),
  urlDecode: (str: string) => decodeURIComponent(str),
  parseUrlComponents: (urlStr: string | URL) => {
    try {
      const url = new URL(urlStr);
      const queryParams: { key: string; value: string }[] = [];
      url.searchParams.forEach((value, key) => {
        queryParams.push({ key, value });
      });
      return {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? '443' : '80'),
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        queryParams
      };
    } catch (e) {
      return null;
    }
  },

  // ---------- COLOR CONVERTERS
  hexToRgb: (hex: string) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split('')
        .map((c: any) => c + c)
        .join('');
    }
    if (cleanHex.length !== 6) return null;
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  },
  rgbToHex: (r: any, g: any, b: any) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  },
  rgbToHsl: (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  },

  // ---------- CSV TO JSON PARSER
  csvToJson: (csvText: string, delimiter = ',', hasHeaders = true) => {
    if (!csvText || !csvText.trim()) return [];
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length === 0) return [];

    // Helper to parse line taking quotes into account
    const parseLine = (line: string | any[]) => {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === delimiter && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    if (hasHeaders) {
      const headers = parseLine(lines[0]);
      return lines.slice(1).map((line: any) => {
        const values = parseLine(line);
        const obj: Record<string, any> = {};
        headers.forEach((header, index) => {
          obj[header || `column_${index + 1}`] = values[index] !== undefined ? values[index] : '';
        });
        return obj;
      });
    } else {
      return lines.map((line: any) => parseLine(line));
    }
  },

  // ---------- MORSE TRANSLATOR
  textToMorse: (text: string) => {
    if (!text) return '';
    return text
      .toUpperCase()
      .split('')
      .map((char: string | number) => MORSE_MAP[char as keyof typeof MORSE_MAP] || char)
      .join(' ');
  },
  morseToText: (morse: string) => {
    if (!morse) return '';
    return morse
      .split(' ')
      .map(
        (symbol: string | number) =>
          REVERSE_MORSE_MAP[symbol as keyof typeof REVERSE_MORSE_MAP] || symbol
      )
      .join('');
  }
};
