<!--
/**
 * @file Minifier.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Code Minifier & Compression tool component for JSON, CSS, and JS
 *
 * @description
 * Minifies and compresses JSON, CSS, and JavaScript code to reduce file payload size.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <ToolCard
    id="minifier"
    title="Code Minifier (JSON, CSS, JS)"
    description="Minify and compress JSON, CSS, and JavaScript code to reduce file payload size."
    tier="Tier 2"
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
      <CompressOutlined />
    </template>

    <div class="minify-tool-layout">
      <!-- LANGUAGE & ACTION TOOLBAR -->
      <div class="toolbar-card">
        <div class="toolbar-controls">
          <div class="control-item">
            <label>TARGET LANGUAGE</label>
            <a-radio-group v-model:value="lang" button-style="solid" @change="processCode">
              <a-radio-button value="json">JSON</a-radio-button>
              <a-radio-button value="css">CSS</a-radio-button>
              <a-radio-button value="js">JavaScript</a-radio-button>
            </a-radio-group>
          </div>

          <a-button type="primary" class="workbench-primary-btn" @click="minifyCode">
            <template #icon><CompressOutlined /></template>
            MINIFY CODE
          </a-button>

          <a-button type="default" class="workbench-btn" @click="beautifyCode">
            BEAUTIFY / PRETTIFY
          </a-button>
        </div>
      </div>

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[ORIGINAL_INPUT] SOURCE CODE</span>
            <span class="byte-count">{{ inputCode.length }} CHARS</span>
          </div>
          <a-textarea
            v-model:value="inputCode"
            placeholder="Paste raw JSON, CSS, or JS snippet here..."
            :rows="14"
            class="code-editor block-cursor"
            @input="processCode"
          />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[MINIFIED_OUTPUT] COMPRESSED PREVIEW</span>
            <span v-if="stats" class="stats-pill">
              SAVINGS: {{ stats.savings }}% ({{ stats.originalBytes }}B →
              {{ stats.minifiedBytes }}B)
            </span>
          </div>
          <textarea
            :value="outputCode"
            readonly
            placeholder="(Minified code will appear here...)"
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
import { useMinifier } from '../../composables/formatters/useMinifier';
import { CompressOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  lang,
  inputCode,
  outputCode,
  stats,
  processCode,
  minifyCode,
  beautifyCode,
  handleCopy,
  handleDownload,
  handleReset
} = useMinifier();
</script>

<style scoped>
.minify-tool-layout {
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

.workbench-btn {
  font-family: var(--font-family) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  margin-top: auto;
  height: 38px;
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
