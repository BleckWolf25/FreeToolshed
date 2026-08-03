/**
 * @file useCsvToJson.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for CSV to JSON & JSON to CSV Converter
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the CsvToJson component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { message } from 'ant-design-vue';
import { converters } from '../../utils/converters.js';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useCsvToJson
export function useCsvToJson() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Can I use custom delimiters?',
      a: 'Yes, you can specify custom delimiters like pipes (|) or semicolons (;).'
    }
  ];
  const compatibility = ['CSV', 'TSV', 'JSON'];
  const handleSample = () => {
    csvInput.value = 'name,age,city\nAlice,30,New York\nBob,25,Los Angeles';
    convertCsv();
  };

  // ---------- REACTIVE STATE
  const csvInput = ref(
    'id,name,role,email\n1,Alice,Developer,alice@example.com\n2,Bob,Designer,bob@example.com\n3,Charlie,Manager,charlie@example.com'
  );
  const delimiter = ref(',');
  const hasHeaders = ref(true);
  const outputJson = ref('');
  const parsedRows = ref<any[]>([]);

  const SAMPLE_CSV =
    'id,name,role,status\n101,John Doe,Frontend Lead,Active\n102,Jane Smith,DevOps Engineer,Active\n103,Alex Johnson,QA Architect,Inactive';

  // ---------- COMPUTED TABLE
  const previewRows = computed(() => parsedRows.value.slice(0, 10));

  const tableColumns = computed(() => {
    if (parsedRows.value.length === 0) return [];
    const firstRow = parsedRows.value[0];
    return Object.keys(firstRow).map((k) => ({
      title: k,
      dataIndex: k,
      key: k
    }));
  });

  // ---------- METHODS
  const convertCsv = () => {
    if (!csvInput.value.trim()) {
      outputJson.value = '';
      parsedRows.value = [];
      return;
    }

    try {
      const result = converters.csvToJson(csvInput.value, delimiter.value, hasHeaders.value);
      parsedRows.value = Array.isArray(result) ? result : [];
      outputJson.value = JSON.stringify(result, null, 2);
    } catch (e: any) {
      message.error('Failed to parse CSV: ' + e.message);
      outputJson.value = '';
      parsedRows.value = [];
    }
  };

  const loadSample = () => {
    csvInput.value = SAMPLE_CSV;
    convertCsv();
  };

  const handleCopy = async () => {
    if (!outputJson.value) return;
    const success = await storage.copyToClipboard(outputJson.value);
    if (success) message.success('JSON output copied!');
  };

  const handleDownload = () => {
    if (!outputJson.value) return;
    const blob = new Blob([outputJson.value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    message.success('JSON downloaded!');
  };

  const handleReset = () => {
    csvInput.value = '';
    outputJson.value = '';
    parsedRows.value = [];
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      convertCsv();
    });
  } else {
    convertCsv();
  }

  return {
    faq,
    compatibility,
    handleSample,
    csvInput,
    delimiter,
    hasHeaders,
    outputJson,
    parsedRows,
    SAMPLE_CSV,
    previewRows,
    tableColumns,
    convertCsv,
    loadSample,
    handleCopy,
    handleDownload,
    handleReset
  };
}
