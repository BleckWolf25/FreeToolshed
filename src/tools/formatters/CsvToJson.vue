<!--
/**
 * @file CsvToJson.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary CSV to JSON & JSON to CSV Converter tool component
 *
 * @description
 * Bi-directionally converts structured CSV strings to JSON arrays and vice versa.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="csv-to-json"
    title="CSV to JSON Converter"
    description="Convert CSV spreadsheets to JSON arrays with customizable delimiters and table preview."
    tier="Tier 3"
    :can-copy="!!outputJson"
    :can-download="!!outputJson"
    :can-reset="true"
    @copy="handleCopy"
    @download="handleDownload"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <TableOutlined />
    </template>

    <div class="csv-tool-layout">
      <!-- CONFIG TOOLBAR -->
      <div class="toolbar-controls">
        <a-space wrap align="center">
          <span>Delimiter:</span>
          <a-select v-model:value="delimiter" style="width: 120px" @change="convertCsv">
            <a-select-option value=",">Comma (,)</a-select-option>
            <a-select-option value=";">Semicolon (;)</a-select-option>
            <a-select-option value="&#9;">Tab (\t)</a-select-option>
            <a-select-option value="|">Pipe (|)</a-select-option>
          </a-select>

          <a-checkbox v-model:checked="hasHeaders" @change="convertCsv"
            >First Row is Header</a-checkbox
          >

          <a-button type="default" @click="loadSample">Load Sample CSV</a-button>
        </a-space>
      </div>

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">CSV Input</span>
            <span class="char-count">{{ csvInput.length }} chars</span>
          </div>
          <a-textarea
            v-model:value="csvInput"
            placeholder="Paste CSV text here..."
            :rows="14"
            class="code-editor"
            @input="convertCsv"
          />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">JSON Output</span>
            <span class="char-count">{{ outputJson.length }} chars</span>
          </div>
          <a-textarea
            :value="outputJson"
            readonly
            placeholder="Converted JSON array will appear here..."
            :rows="14"
            class="code-editor readonly-editor"
          />
        </div>
      </div>

      <!-- DATA TABLE PREVIEW -->
      <div v-if="parsedRows.length > 0" class="table-preview-card">
        <h3>Data Table Preview (Showing first {{ Math.min(10, parsedRows.length) }} rows)</h3>
        <a-table
          :data-source="previewRows"
          :columns="tableColumns"
          size="small"
          :pagination="false"
          bordered
        />
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useCsvToJson } from '../../composables/formatters/useCsvToJson';
import { TableOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  csvInput,
  delimiter,
  hasHeaders,
  outputJson,
  parsedRows,
  previewRows,
  tableColumns,
  convertCsv,
  loadSample,
  handleCopy,
  handleDownload,
  handleReset
} = useCsvToJson();
</script>

<style scoped>
.csv-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toolbar-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .editor-grid {
    grid-template-columns: 1fr;
  }
}

.panel {
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 13px;
}

.code-editor {
  border: none !important;
  resize: vertical;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

.readonly-editor {
  cursor: default;
}

.table-preview-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
