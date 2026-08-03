<!--
/**
 * @file CodeUnminifier.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Code UnMinifier & Beautifier tool component
 *
 * @description
 * Unminifies, expands, and formats minified JSON, CSS, JavaScript, HTML, and SQL code snippets
 * with customizable indent spacing and real-time statistics.
 *
 * @since 03/08/2026
 */
-->
<template>
  <ToolCard
    id="code-unminifier"
    title="Code UnMinifier & Beautifier"
    description="Format, beautify, and unminify compressed JSON, CSS, JavaScript, HTML, and SQL snippets."
    tier="Tier 1"
    :can-copy="!!outputCode"
    :can-download="!!outputCode"
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
      <CodeOutlined />
    </template>

    <div class="unminifier-tool-layout">
      <!-- CONFIGURATION TOOLBAR -->
      <div class="toolbar-card">
        <div class="toolbar-controls">
          <div class="control-item">
            <label>LANGUAGE</label>
            <a-select v-model:value="lang" style="width: 170px" @change="unminifyCode">
              <a-select-option value="js">JavaScript (JS)</a-select-option>
              <a-select-option value="css">CSS</a-select-option>
              <a-select-option value="json">JSON</a-select-option>
              <a-select-option value="html">HTML / XML</a-select-option>
              <a-select-option value="sql">SQL Query</a-select-option>
            </a-select>
          </div>

          <div class="control-item">
            <label>INDENT SPACING</label>
            <a-select v-model:value="indentType" style="width: 140px" @change="unminifyCode">
              <a-select-option value="2spaces">2 Spaces</a-select-option>
              <a-select-option value="4spaces">4 Spaces</a-select-option>
              <a-select-option value="tabs">Tabs</a-select-option>
            </a-select>
          </div>

          <a-button type="primary" class="workbench-primary-btn" @click="unminifyCode">
            <template #icon><CodeOutlined /></template>
            UNMINIFY CODE
          </a-button>
        </div>
      </div>

      <!-- INPUT & OUTPUT PANELS -->
      <div class="unminifier-panels-grid">
        <!-- INPUT CODE PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[MINIFIED_INPUT] PASTE CODE HERE</span>
            <span v-if="inputCode" class="byte-count">{{ inputCode.length }} CHARS</span>
          </div>
          <a-textarea
            v-model:value="inputCode"
            placeholder="Paste minified JSON, CSS, JS, HTML, or SQL code here..."
            :rows="12"
            class="code-editor block-cursor"
            @input="unminifyCode"
          />
        </div>

        <!-- UNMINIFIED OUTPUT PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[UNMINIFIED_OUTPUT] FORMATTED PREVIEW</span>
            <span v-if="stats" class="stats-pill">
              {{ stats.unminifiedBytes }} BYTES ({{ stats.expansionPercent }})
            </span>
          </div>
          <textarea
            :value="outputCode"
            readonly
            placeholder="(Unminified code will render here...)"
            rows="12"
            class="code-editor output-textarea"
          ></textarea>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useCodeUnminifier } from '../../composables/formatters/useCodeUnminifier';
import { CodeOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  lang,
  indentType,
  inputCode,
  outputCode,
  stats,
  unminifyCode,
  handleSample,
  handleCopy,
  handleDownload,
  handleReset
} = useCodeUnminifier();
</script>

<style scoped>
.unminifier-tool-layout {
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
  margin-top: auto;
  height: 38px;
}

.unminifier-panels-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 840px) {
  .unminifier-panels-grid {
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

.stats-pill {
  font-size: 10px;
  font-weight: 700;
  color: var(--stamp-text);
  background: var(--stamp-bg);
  padding: 2px 6px;
  border: 1px solid var(--border-strong);
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
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
  cursor: default;
}
</style>
