/**
 * @file useMinifier.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useMinifier composable
 *
 * @description
 * Tests code minification for JSON, CSS, and JS languages, comment/whitespace removal regexes,
 * compression savings stats calculation, JSON beautification, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useMinifier } from '../useMinifier';

// ---------- TESTS
describe('useMinifier composable', () => {
  it('initializes with default lang "json" and empty input state', () => {
    const { lang, inputCode, outputCode, stats, SAMPLES, faq, compatibility } = useMinifier();
    expect(lang.value).toBe('json');
    expect(inputCode.value).toBe('');
    expect(outputCode.value).toBe('');
    expect(stats.value).toBeNull();
    expect(SAMPLES.json).toBeTruthy();
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('CSS');
  });

  it('minifies JSON code and computes reduction stats', () => {
    const { lang, inputCode, outputCode, stats, minifyCode } = useMinifier();
    lang.value = 'json';
    inputCode.value = '{\n  "appName": "FreeToolshed",\n  "version": 1\n}';
    minifyCode();

    expect(outputCode.value).toBe('{"appName":"FreeToolshed","version":1}');
    expect(stats.value).not.toBeNull();
    expect(stats.value.minifiedBytes).toBeLessThan(stats.value.originalBytes);
  });

  it('minifies CSS code by removing comments and extra spaces', () => {
    const { lang, inputCode, outputCode, minifyCode } = useMinifier();
    lang.value = 'css';
    inputCode.value = '/* Navigation */\n.header {\n  color: red;\n  margin: 0px;\n}';
    minifyCode();

    expect(outputCode.value).toBe('.header{color:red;margin:0px;}');
    expect(outputCode.value.includes('Navigation')).toBe(false);
  });

  it('minifies JS code by stripping block and line comments', () => {
    const { lang, inputCode, outputCode, minifyCode } = useMinifier();
    lang.value = 'js';
    inputCode.value =
      '// Line comment\nfunction add(a, b) {\n  /* Block comment */\n  return a + b;\n}';
    minifyCode();

    expect(outputCode.value).toBe('function add(a,b){return a + b;}');
  });

  it('beautifies JSON input and resets state', () => {
    const { lang, inputCode, outputCode, beautifyCode, handleReset } = useMinifier();
    lang.value = 'json';
    inputCode.value = '{"a":1,"b":2}';
    beautifyCode();

    expect(outputCode.value).toContain('{\n  "a": 1');

    handleReset();
    expect(inputCode.value).toBe('');
    expect(outputCode.value).toBe('');
  });
});
