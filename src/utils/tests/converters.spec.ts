/**
 * @file converters.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for converter helper utilities
 *
 * @description
 * Tests text case conversions (uppercase, lowercase, camelCase, snake_case, kebab-case, PascalCase, dot.case, Title Case),
 * Base64 encoding/decoding, URL encoding/decoding, URL component parsing, color model transformations (HEX, RGB, HSL),
 * CSV to JSON parsing, and Morse code translation.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { converters } from '../converters';

// ---------- TESTS
describe('converters utility', () => {
  describe('Text Case Conversions', () => {
    it('converts text to UPPERCASE and lowercase', () => {
      expect(converters.toUppercase('hello world')).toBe('HELLO WORLD');
      expect(converters.toLowercase('HELLO WORLD')).toBe('hello world');
      expect(converters.toUppercase("côte d'ivoire 123")).toBe("CÔTE D'IVOIRE 123");
    });

    it('converts text to Title Case', () => {
      expect(converters.toTitleCase('hello world from free toolshed')).toBe(
        'Hello World From Free Toolshed'
      );
      expect(converters.toTitleCase('jAVASCRIPT uTILITIES')).toBe('Javascript Utilities');
    });

    it('converts text to camelCase', () => {
      expect(converters.toCamelCase('hello world')).toBe('helloWorld');
      expect(converters.toCamelCase('kebab-case-string')).toBe('kebabCaseString');
      expect(converters.toCamelCase('snake_case_string')).toBe('snakeCaseString');
      expect(converters.toCamelCase('Free Toolshed Client')).toBe('freeToolshedClient');
    });

    it('converts text to snake_case', () => {
      expect(converters.toSnakeCase('hello World')).toBe('hello_world');
      expect(converters.toSnakeCase('camelCaseText')).toBe('camel_case_text');
      expect(converters.toSnakeCase('PascalCaseText')).toBe('pascal_case_text');
      expect(converters.toSnakeCase('kebab-case-text')).toBe('kebab_case_text');
    });

    it('converts text to kebab-case', () => {
      expect(converters.toKebabCase('hello World')).toBe('hello-world');
      expect(converters.toKebabCase('camelCaseText')).toBe('camel-case-text');
      expect(converters.toKebabCase('snake_case_text')).toBe('snake-case-text');
    });

    it('converts text to PascalCase', () => {
      expect(converters.toPascalCase('hello world')).toBe('HelloWorld');
      expect(converters.toPascalCase('kebab-case-string')).toBe('KebabCaseString');
      expect(converters.toPascalCase('free_toolshed')).toBe('FreeToolshed');
    });

    it('converts text to dot.case', () => {
      expect(converters.toDotCase('hello World')).toBe('hello.world');
      expect(converters.toDotCase('camelCaseText')).toBe('camel.case.text');
      expect(converters.toDotCase('snake_case_text')).toBe('snake.case.text');
    });
  });

  describe('Base64 Conversions', () => {
    it('encodes UTF-8 strings, numbers, and booleans to Base64', () => {
      const encodedStr = converters.base64Encode('Hello World!');
      expect(encodedStr).toBe('SGVsbG8gV29ybGQh');

      const encodedNum = converters.base64Encode(12345);
      expect(encodedNum).toBe('MTIzNDU=');

      const encodedBool = converters.base64Encode(true);
      expect(encodedBool).toBe('dHJ1ZQ==');
    });

    it('encodes Unicode characters and emojis to Base64', () => {
      const encodedEmoji = converters.base64Encode('🚀 FreeToolshed');
      expect(typeof encodedEmoji).toBe('string');

      const decodedEmoji = converters.base64Decode(encodedEmoji);
      expect(decodedEmoji).toBe('🚀 FreeToolshed');
    });

    it('decodes valid Base64 string back to plain text', () => {
      const decoded = converters.base64Decode('SGVsbG8gV29ybGQh');
      expect(decoded).toBe('Hello World!');
    });

    it('throws error when decoding invalid Base64 input string', () => {
      expect(() => converters.base64Decode('invalid!@#$%^')).toThrow(
        'Invalid Base64 string format'
      );
    });
  });

  describe('URL Encoding & Decoding & Component Parsing', () => {
    it('encodes URI components containing spaces and special characters', () => {
      const original = 'https://example.com/search?q=hello world&category=tools';
      const encoded = converters.urlEncode(original);
      expect(encoded).toContain('%20');
      expect(encoded).toContain('%3A%2F%2F');

      const decoded = converters.urlDecode(encoded);
      expect(decoded).toBe(original);
    });

    it('parses full URL components into structured object', () => {
      const url = 'https://user:pass@example.com:8080/api/v1/users?role=admin&active=true#profile';
      const parsed = converters.parseUrlComponents(url);

      expect(parsed).not.toBeNull();
      expect(parsed?.protocol).toBe('https:');
      expect(parsed?.hostname).toBe('example.com');
      expect(parsed?.port).toBe('8080');
      expect(parsed?.pathname).toBe('/api/v1/users');
      expect(parsed?.search).toBe('?role=admin&active=true');
      expect(parsed?.hash).toBe('#profile');
      expect(parsed?.queryParams).toEqual([
        { key: 'role', value: 'admin' },
        { key: 'active', value: 'true' }
      ]);
    });

    it('defaults port based on protocol when omitted from URL', () => {
      const parsedHttps = converters.parseUrlComponents('https://example.com/path');
      expect(parsedHttps?.port).toBe('443');

      const parsedHttp = converters.parseUrlComponents('http://example.com/path');
      expect(parsedHttp?.port).toBe('80');
    });

    it('returns null when parsing invalid URL string', () => {
      expect(converters.parseUrlComponents('not-a-valid-url')).toBeNull();
    });
  });

  describe('Color Conversions', () => {
    it('converts 6-digit HEX to RGB object', () => {
      expect(converters.hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(converters.hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(converters.hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
      expect(converters.hexToRgb('#1890ff')).toEqual({ r: 24, g: 144, b: 255 });
    });

    it('converts 3-digit HEX to RGB object', () => {
      expect(converters.hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(converters.hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
      expect(converters.hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('returns null for invalid HEX color string', () => {
      expect(converters.hexToRgb('invalid')).toBeNull();
      expect(converters.hexToRgb('#1234')).toBeNull();
    });

    it('converts RGB numbers to uppercase HEX string', () => {
      expect(converters.rgbToHex(255, 0, 0)).toBe('#FF0000');
      expect(converters.rgbToHex(0, 255, 0)).toBe('#00FF00');
      expect(converters.rgbToHex(24, 144, 255)).toBe('#1890FF');
    });

    it('clamps out-of-range RGB values to [0, 255]', () => {
      expect(converters.rgbToHex(-10, 300, 100)).toBe('#00FF64');
    });

    it('converts RGB numbers to HSL object', () => {
      expect(converters.rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
      expect(converters.rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
      expect(converters.rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
      expect(converters.rgbToHsl(128, 128, 128)).toEqual({ h: 0, s: 0, l: 50 });
    });
  });

  describe('CSV to JSON Parser', () => {
    it('parses standard comma-delimited CSV text with headers into array of objects', () => {
      const csv = 'name,age,city\nAlice,30,London\nBob,25,New York';
      const result = converters.csvToJson(csv);
      expect(result).toEqual([
        { name: 'Alice', age: '30', city: 'London' },
        { name: 'Bob', age: '25', city: 'New York' }
      ]);
    });

    it('parses CSV with quoted values containing commas', () => {
      const csv = 'id,title\n1,"Software Engineer, Senior"\n2,"Designer, Lead"';
      const result = converters.csvToJson(csv);
      expect(result).toEqual([
        { id: '1', title: 'Software Engineer, Senior' },
        { id: '2', title: 'Designer, Lead' }
      ]);
    });

    it('supports custom delimiters (e.g. semicolon or tab)', () => {
      const csvSemi = 'name;role\nAlice;Admin\nBob;User';
      const resSemi = converters.csvToJson(csvSemi, ';');
      expect(resSemi).toEqual([
        { name: 'Alice', role: 'Admin' },
        { name: 'Bob', role: 'User' }
      ]);
    });

    it('parses CSV without headers into 2D array of values', () => {
      const csv = 'val1,val2\nval3,val4';
      const result = converters.csvToJson(csv, ',', false);
      expect(result).toEqual([
        ['val1', 'val2'],
        ['val3', 'val4']
      ]);
    });

    it('returns empty array for empty CSV input', () => {
      expect(converters.csvToJson('')).toEqual([]);
      expect(converters.csvToJson('   ')).toEqual([]);
    });
  });

  describe('Morse Code Translation', () => {
    it('translates text with letters, numbers, and punctuation to Morse code', () => {
      expect(converters.textToMorse('SOS')).toBe('... --- ...');
      expect(converters.textToMorse('HELLO WORLD')).toBe(
        '.... . .-.. .-.. --- / .-- --- .-. .-.. -..'
      );
      expect(converters.textToMorse('123')).toBe('.---- ..--- ...--');
    });

    it('translates Morse code back to uppercase text', () => {
      expect(converters.morseToText('... --- ...')).toBe('SOS');
      expect(converters.morseToText('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')).toBe(
        'HELLO WORLD'
      );
    });

    it('returns empty string for empty text/morse input', () => {
      expect(converters.textToMorse('')).toBe('');
      expect(converters.morseToText('')).toBe('');
    });
  });
});
