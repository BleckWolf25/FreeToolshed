<!--
/**
 * @file JsonFormatter.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary JSON Formatter, Validator, Prettifier, and Minifier tool component
 *
 * @description
 * Parses raw JSON string input, validates syntax, displays formatted output with indent controls, offers minification, copy, and download.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="json-formatter"
    title="JSON Formatter & Validator"
    description="Format, minify, validate, and inspect JSON documents with detailed error details."
    tier="Tier 1"
    :can-copy="true"
    :can-download="true"
    :can-reset="true"
    :has-sample="true"
    :faq="faq"
    :compatibility="['JSON', 'JSONC', 'JSON5']"
    @copy="handleCopy"
    @download="handleDownload"
    @reset="handleReset"
    @sample="handleSample"
  >
    <template #icon>
      <CodeOutlined />
    </template>

    <div class="json-tool-layout">
      <!-- CONTROLS TOOLBAR -->
      <div class="toolbar-controls">
        <a-space wrap align="center">
          <a-button type="primary" @click="formatJson">
            <template #icon><AlignLeftOutlined /></template>
            Prettify JSON
          </a-button>

          <a-button type="default" @click="minifyJson">
            <template #icon><CompressOutlined /></template>
            Minify JSON
          </a-button>

          <a-select v-model:value="indentSize" style="width: 130px" @change="formatJson">
            <a-select-option :value="2">2 Spaces</a-select-option>
            <a-select-option :value="4">4 Spaces</a-select-option>
            <a-select-option :value="8">8 Spaces</a-select-option>
          </a-select>
        </a-space>

        <div v-if="isValid !== null" class="status-indicator">
          <a-tag v-if="isValid" color="success">Valid JSON</a-tag>
          <a-tag v-else color="error">Invalid JSON Syntax</a-tag>
        </div>
      </div>

      <!-- ERROR ALERT -->
      <a-alert
        v-if="errorMessage"
        :message="errorMessage"
        type="error"
        show-icon
        closable
        class="error-alert"
      />

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <!-- INPUT PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Input JSON</span>
            <span class="char-count">{{ inputValue.length }} chars</span>
          </div>
          <a-textarea
            v-model:value="inputValue"
            placeholder="Paste raw JSON here..."
            :rows="16"
            class="code-editor"
            @input="handleInput"
          />
        </div>

        <!-- OUTPUT PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Formatted Output</span>
            <span class="char-count">{{ outputValue.length }} chars</span>
          </div>
          <a-textarea
            :value="outputValue"
            readonly
            placeholder="Formatted JSON will appear here..."
            :rows="16"
            class="code-editor readonly-editor"
          />
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useJsonFormatter } from '../../composables/formatters/useJsonFormatter';
import { CodeOutlined, AlignLeftOutlined, CompressOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  inputValue,
  outputValue,
  indentSize,
  isValid,
  errorMessage,
  faq,
  handleSample,
  handleInput,
  formatJson,
  minifyJson,
  handleCopy,
  handleDownload,
  handleReset
} = useJsonFormatter();
</script>

<style scoped>
.json-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toolbar-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.error-alert {
  margin-top: 4px;
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
}

.panel-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary);
}

.char-count {
  font-size: 11px;
  color: var(--text-secondary);
}

.code-editor {
  border: none !important;
  resize: vertical;
  border-radius: 0 !important;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

.readonly-editor {
  cursor: default;
}
</style>
