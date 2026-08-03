/**
 * @file useCsvToJson.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useCsvToJson composable
 *
 * @description
 * Tests CSV string parsing into JSON objects array, customizable delimiters (comma, semicolon, tab, pipe),
 * header toggle mode, preview table rows generation, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useCsvToJson } from '../useCsvToJson';

// ---------- TESTS
describe('useCsvToJson composable', () => {
  it('initializes with default CSV sample text, delimiter comma, and hasHeaders true', () => {
    const { csvInput, delimiter, hasHeaders, faq, compatibility } = useCsvToJson();
    expect(csvInput.value).toBeTruthy();
    expect(delimiter.value).toBe(',');
    expect(hasHeaders.value).toBe(true);
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('CSV');
  });

  it('converts CSV input to formatted JSON output and populates table preview rows', () => {
    const { csvInput, outputJson, parsedRows, tableColumns, convertCsv } = useCsvToJson();
    csvInput.value = 'name,age,city\nAlice,30,New York\nBob,25,Los Angeles';
    convertCsv();

    expect(parsedRows.value.length).toBe(2);
    expect(parsedRows.value[0]).toEqual({ name: 'Alice', age: '30', city: 'New York' });
    expect(outputJson.value).toContain('"name": "Alice"');
    expect(tableColumns.value.length).toBe(3);
  });

  it('handles custom semicolon delimiter and headerless mode', () => {
    const { csvInput, delimiter, hasHeaders, parsedRows, convertCsv } = useCsvToJson();
    csvInput.value = 'Alice;30;New York\nBob;25;Los Angeles';
    delimiter.value = ';';
    hasHeaders.value = false;
    convertCsv();

    expect(parsedRows.value.length).toBe(2);
    expect(parsedRows.value[0]).toEqual(['Alice', '30', 'New York']);
  });

  it('loads sample CSV data and resets state', () => {
    const { csvInput, outputJson, parsedRows, loadSample, handleReset } = useCsvToJson();
    loadSample();
    expect(csvInput.value).toContain('John Doe');
    expect(outputJson.value).toBeTruthy();

    handleReset();
    expect(csvInput.value).toBe('');
    expect(outputJson.value).toBe('');
    expect(parsedRows.value.length).toBe(0);
  });
});
