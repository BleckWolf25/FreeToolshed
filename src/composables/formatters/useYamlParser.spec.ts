/**
 * @file useYamlParser.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useYamlParser composable
 *
 * @description
 * Tests YAML to JSON conversion, JSON to YAML conversion, invalid syntax error handling, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useYamlParser } from './useYamlParser';

describe('useYamlParser composable', () => {
  it('initializes with default mode "yamlToJson" and default YAML input state', () => {
    const { mode, inputValue, outputValue, errorMessage, SAMPLES, faq, compatibility } =
      useYamlParser();
    expect(mode.value).toBe('yamlToJson');
    expect(inputValue.value).toBeTruthy();
    expect(errorMessage.value).toBe('');
    expect(SAMPLES.yamlToJson).toBeTruthy();
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('YAML');
  });

  it('converts YAML input string into formatted JSON output string', () => {
    const { mode, inputValue, outputValue, processConversion } = useYamlParser();
    mode.value = 'yamlToJson';
    inputValue.value = 'title: FreeToolshed\nversion: 1.0.0';
    processConversion();

    expect(outputValue.value).toContain('"title": "FreeToolshed"');
    expect(outputValue.value).toContain('"version": "1.0.0"');
  });

  it('converts JSON input string into YAML output dump', () => {
    const { mode, inputValue, outputValue, processConversion } = useYamlParser();
    mode.value = 'jsonToYaml';
    inputValue.value = '{\n  "title": "FreeToolshed",\n  "offline": true\n}';
    processConversion();

    expect(outputValue.value).toContain('title: FreeToolshed');
    expect(outputValue.value).toContain('offline: true');
  });

  it('handles malformed YAML syntax and sets errorMessage string', () => {
    const { mode, inputValue, errorMessage, outputValue, processConversion } = useYamlParser();
    mode.value = 'yamlToJson';
    inputValue.value = 'title: [unclosed list';
    processConversion();

    expect(errorMessage.value).toBeTruthy();
    expect(outputValue.value).toBe('');
  });

  it('loads sample YAML code and resets state', () => {
    const { inputValue, outputValue, errorMessage, loadSample, handleReset } = useYamlParser();
    loadSample();
    expect(inputValue.value).toContain('host: 127.0.0.1');

    handleReset();
    expect(inputValue.value).toBe('');
    expect(outputValue.value).toBe('');
    expect(errorMessage.value).toBe('');
  });
});
