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
 * @updated 03/08/2026
 */
-->
<template>
  <ToolCard
    id="json-formatter"
    title="JSON Formatter & Validator"
    description="Format, minify, validate, and inspect JSON documents with detailed error details."
    tier="Tier 1"
    :can-copy="!!outputValue"
    :can-download="!!outputValue"
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
      <div class="toolbar-card">
        <div class="toolbar-controls">
          <a-button type="primary" class="workbench-primary-btn" @click="formatJson">
            <template #icon><AlignLeftOutlined /></template>
            PRETTIFY JSON
          </a-button>

          <a-button type="default" class="workbench-btn" @click="minifyJson">
            <template #icon><CompressOutlined /></template>
            MINIFY JSON
          </a-button>

          <div class="control-item">
            <label>INDENT SPACING</label>
            <a-select v-model:value="indentSize" style="width: 130px" @change="formatJson">
              <a-select-option :value="2">2 Spaces</a-select-option>
              <a-select-option :value="4">4 Spaces</a-select-option>
              <a-select-option :value="8">8 Spaces</a-select-option>
            </a-select>
          </div>
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
            <span class="panel-title">[RAW_INPUT] JSON SOURCE</span>
            <span class="byte-count">{{ inputValue.length }} CHARS</span>
          </div>
          <a-textarea
            v-model:value="inputValue"
            placeholder="Paste raw JSON string here..."
            :rows="14"
            class="code-editor block-cursor"
            @input="handleInput"
          />
        </div>

        <!-- OUTPUT PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[FORMATTED_OUTPUT] JSON RESULT</span>
            <span v-if="isValid !== null" class="stats-pill">
              {{ isValid ? '[VALID SYNTAX]' : '[INVALID SYNTAX]' }}
            </span>
          </div>
          <textarea
            :value="outputValue"
            readonly
            placeholder="(Formatted JSON output will appear here...)"
            rows="14"
            class="code-editor output-textarea"
          ></textarea>
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
  font-family: var(--font-family);
}

.toolbar-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
}

.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.control-item label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.08em;
}

.workbench-primary-btn {
  font-family: var(--font-family) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  height: 38px;
}

.workbench-btn {
  font-family: var(--font-family) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  height: 38px;
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
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
}

.panel-title {
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.byte-count {
  color: var(--text-secondary);
  font-size: 10px;
}

.code-editor {
  border: none !important;
  resize: vertical;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
  width: 100%;
  padding: 14px;
  font-family: var(--font-code) !important;
  font-size: 13px;
  line-height: 1.4;
  outline: none;
}

.output-textarea {
  cursor: default;
}
</style>
