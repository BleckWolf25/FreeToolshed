/**
 * @file useCodeUnminifier.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Code UnMinifier & Beautifier (JSON, CSS, JS, HTML, SQL)
 *
 * @description
 * Manages reactive state, code formatting/beautifying algorithms, indentation options,
 * byte expansion statistics, copy/download actions, and sample data loading.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { storage } from '../../utils/storage.js';

// ---------- INTERFACES
export interface UnminifierStats {
  originalBytes: number;
  unminifiedBytes: number;
  expansionPercent: string;
}

// ---------- FUNCTION: useCodeUnminifier
export function useCodeUnminifier() {
  // ---------- TOOLCARD METADATA
  const faq = [
    {
      q: 'How does the Code UnMinifier work?',
      a: 'It parses minified code tokens and re-structures indentation, block linebreaks, and syntax spacing 100% client-side.'
    },
    {
      q: 'Which languages are supported?',
      a: 'JSON, CSS, JavaScript, HTML/XML, and SQL query formatting.'
    }
  ];

  const compatibility = ['JSON', 'CSS', 'JavaScript', 'HTML/XML', 'SQL'];

  // ---------- REACTIVE STATE
  const lang = ref<'json' | 'css' | 'js' | 'html' | 'sql'>('js');
  const indentType = ref<'2spaces' | '4spaces' | 'tabs'>('2spaces');
  const inputCode = ref('');
  const outputCode = ref('');
  const stats = ref<UnminifierStats | null>(null);

  const SAMPLES: Record<string, string> = {
    js: 'function test(a,b){if(a>b){return a+b;}else{return b-a;}}',
    css: 'body{margin:0;padding:0;font-family:sans-serif;}h1{color:#1890ff;font-size:24px;}',
    json: '{"name":"FreeToolshed","type":"workbench","features":["offline","client-side"],"active":true}',
    html: '<div class="container"><h1>FreeToolshed</h1><p>Client-side developer utilities</p><ul><li>JSON</li><li>Base64</li></ul></div>',
    sql: 'SELECT id,name,email FROM users WHERE active=1 AND role="admin" ORDER BY created_at DESC;'
  };

  // Helper to resolve indentation string
  const getIndentStr = (): string => {
    if (indentType.value === '4spaces') return '    ';
    if (indentType.value === 'tabs') return '\t';
    return '  ';
  };

  // ---------- BEAUTIFY ALGORITHMS
  const unminifyJson = (code: string, indent: string): string => {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, indent);
  };

  const unminifyCss = (code: string, indent: string): string => {
    let result = code
      .replace(/\s*\{\s*/g, ' {\n')
      .replace(/\s*;\s*/g, ';\n')
      .replace(/\s*:\s*/g, ': ')
      .replace(/\s*\}\s*/g, '\n}\n\n')
      .replace(/\s*,\s*/g, ', ');

    const lines = result.split('\n');
    let level = 0;
    const formatted: string[] = [];

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      if (line.endsWith('}')) {
        level = Math.max(0, level - 1);
      }
      formatted.push(indent.repeat(level) + line);
      if (line.endsWith('{')) {
        level++;
      }
    }
    return formatted.join('\n');
  };

  const unminifyJs = (code: string, indent: string): string => {
    let formatted = code
      .replace(/;(?!\s*\*\/)/g, ';\n')
      .replace(/\{/g, ' {\n')
      .replace(/\}/g, '\n}\n')
      .replace(/\s*=>\s*/g, ' => ')
      .replace(/\s*=\s*/g, ' = ');

    const lines = formatted.split('\n');
    let level = 0;
    const result: string[] = [];

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      if (line.startsWith('}')) {
        level = Math.max(0, level - 1);
      }
      result.push(indent.repeat(level) + line);
      if (line.endsWith('{')) {
        level++;
      }
    }
    return result.join('\n');
  };

  const unminifyHtml = (code: string, indent: string): string => {
    const formatted = code.replace(/></g, '>\n<');
    const lines = formatted.split('\n');
    let level = 0;
    const result: string[] = [];

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      if (line.match(/^<\//)) {
        level = Math.max(0, level - 1);
      }

      result.push(indent.repeat(level) + line);

      if (
        line.match(/^<[^\/!\?][^>]*[^\/]>$/) &&
        !line.match(/<(img|br|hr|input|meta|link)[^>]*>/i)
      ) {
        level++;
      }
    }
    return result.join('\n');
  };

  const unminifySql = (code: string, indent: string): string => {
    const keywords = [
      'SELECT',
      'FROM',
      'WHERE',
      'AND',
      'OR',
      'LEFT JOIN',
      'RIGHT JOIN',
      'INNER JOIN',
      'JOIN',
      'ON',
      'GROUP BY',
      'ORDER BY',
      'HAVING',
      'LIMIT',
      'UPDATE',
      'SET',
      'INSERT INTO',
      'VALUES',
      'DELETE FROM'
    ];

    let result = code;
    for (const kw of keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      result = result.replace(regex, `\n${kw}`);
    }

    const lines = result.split('\n');
    const formatted: string[] = [];

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      const isMainKeyword =
        /^(SELECT|FROM|WHERE|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|UPDATE|SET|INSERT INTO|VALUES|DELETE FROM)\b/i.test(
          line
        );
      if (isMainKeyword) {
        formatted.push(line.toUpperCase());
      } else {
        formatted.push(indent + line);
      }
    }
    return formatted.join('\n');
  };

  // ---------- MAIN UNMINIFY FUNCTION
  const unminifyCode = () => {
    if (!inputCode.value.trim()) {
      outputCode.value = '';
      stats.value = null;
      return;
    }

    const indent = getIndentStr();
    let result = '';

    try {
      if (lang.value === 'json') {
        result = unminifyJson(inputCode.value, indent);
      } else if (lang.value === 'css') {
        result = unminifyCss(inputCode.value, indent);
      } else if (lang.value === 'js') {
        result = unminifyJs(inputCode.value, indent);
      } else if (lang.value === 'html') {
        result = unminifyHtml(inputCode.value, indent);
      } else if (lang.value === 'sql') {
        result = unminifySql(inputCode.value, indent);
      }

      outputCode.value = result;

      // Stats calculation
      const origBytes = new TextEncoder().encode(inputCode.value).length;
      const unminBytes = new TextEncoder().encode(result).length;
      const expansionPercent =
        origBytes > 0 ? (((unminBytes - origBytes) / origBytes) * 100).toFixed(1) : '0';

      stats.value = {
        originalBytes: origBytes,
        unminifiedBytes: unminBytes,
        expansionPercent: `+${expansionPercent}%`
      };
    } catch (e: any) {
      message.error('Unminification error: ' + (e.message || e));
      outputCode.value = '';
      stats.value = null;
    }
  };

  const handleSample = () => {
    inputCode.value = SAMPLES[lang.value] || SAMPLES.js;
    unminifyCode();
  };

  const handleCopy = async () => {
    if (!outputCode.value) return;
    const success = await storage.copyToClipboard(outputCode.value);
    if (success) message.success('Unminified code copied to clipboard!');
  };

  const handleDownload = () => {
    if (!outputCode.value) return;
    const extMap: Record<string, string> = {
      json: 'json',
      css: 'css',
      js: 'js',
      html: 'html',
      sql: 'sql'
    };
    const ext = extMap[lang.value] || 'txt';
    const blob = new Blob([outputCode.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unminified.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Unminified file downloaded!');
  };

  const handleReset = () => {
    inputCode.value = '';
    outputCode.value = '';
    stats.value = null;
  };

  return {
    faq,
    compatibility,
    lang,
    indentType,
    inputCode,
    outputCode,
    stats,
    SAMPLES,
    unminifyCode,
    handleSample,
    handleCopy,
    handleDownload,
    handleReset
  };
}
