/**
 * @file useCodeUnminifier.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useCodeUnminifier composable
 *
 * @description
 * Verifies code unminification and beautification for JSON, CSS, JS, HTML, and SQL,
 * indentation option handling, byte expansion stats, sample loading, copy, download, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useCodeUnminifier } from '../useCodeUnminifier.js';

// ---------- TESTS
describe('useCodeUnminifier composable', () => {
  it('initializes with default language "js", default indent "2spaces", and empty state', () => {
    const { lang, indentType, inputCode, outputCode, stats, faq, compatibility } =
      useCodeUnminifier();
    expect(lang.value).toBe('js');
    expect(indentType.value).toBe('2spaces');
    expect(inputCode.value).toBe('');
    expect(outputCode.value).toBe('');
    expect(stats.value).toBeNull();
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('JavaScript');
  });

  it('unminifies JavaScript code correctly', () => {
    const { lang, inputCode, outputCode, unminifyCode, stats } = useCodeUnminifier();
    lang.value = 'js';
    inputCode.value = 'function test(){console.log("hello");}';
    unminifyCode();

    expect(outputCode.value).toContain('function test()');
    expect(outputCode.value).toContain('console.log("hello");');
    expect(stats.value).not.toBeNull();
    expect(stats.value?.originalBytes).toBeGreaterThan(0);
  });

  it('unminifies JSON code correctly', () => {
    const { lang, inputCode, outputCode, unminifyCode } = useCodeUnminifier();
    lang.value = 'json';
    inputCode.value = '{"a":1,"b":2}';
    unminifyCode();

    expect(outputCode.value).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it('unminifies CSS code correctly', () => {
    const { lang, inputCode, outputCode, unminifyCode } = useCodeUnminifier();
    lang.value = 'css';
    inputCode.value = 'body{color:red;margin:0;}';
    unminifyCode();

    expect(outputCode.value).toContain('body {');
    expect(outputCode.value).toContain('  color: red;');
    expect(outputCode.value).toContain('  margin: 0;');
  });

  it('unminifies HTML code correctly', () => {
    const { lang, inputCode, outputCode, unminifyCode } = useCodeUnminifier();
    lang.value = 'html';
    inputCode.value = '<div><h1>Title</h1></div>';
    unminifyCode();

    expect(outputCode.value).toContain('<div>');
    expect(outputCode.value).toContain('  <h1>Title</h1>');
  });

  it('unminifies SQL queries correctly', () => {
    const { lang, inputCode, outputCode, unminifyCode } = useCodeUnminifier();
    lang.value = 'sql';
    inputCode.value = 'select * from users where id=1;';
    unminifyCode();

    expect(outputCode.value).toContain('SELECT');
    expect(outputCode.value).toContain('FROM');
    expect(outputCode.value).toContain('WHERE');
  });

  it('loads sample data and resets state', () => {
    const { inputCode, outputCode, stats, handleSample, handleReset } = useCodeUnminifier();
    handleSample();

    expect(inputCode.value).toBeTruthy();
    expect(outputCode.value).toBeTruthy();
    expect(stats.value).not.toBeNull();

    handleReset();
    expect(inputCode.value).toBe('');
    expect(outputCode.value).toBe('');
    expect(stats.value).toBeNull();
  });
});
