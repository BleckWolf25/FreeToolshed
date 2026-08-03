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
 * Minifies and compresses JSON, CSS, and JavaScript source code with size reduction statistics.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
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
      <div class="toolbar-controls">
        <a-space wrap align="center">
          <span>Language:</span>
          <a-radio-group v-model:value="lang" button-style="solid" @change="processCode">
            <a-radio-button value="json">JSON</a-radio-button>
            <a-radio-button value="css">CSS</a-radio-button>
            <a-radio-button value="js">JavaScript</a-radio-button>
          </a-radio-group>

          <a-button type="primary" @click="minifyCode">
            <template #icon><CompressOutlined /></template>
            Minify Code
          </a-button>

          <a-button type="default" @click="beautifyCode"> Beautify / Prettify </a-button>

          <a-button type="dashed" @click="loadSample"> Load Sample </a-button>
        </a-space>

        <!-- STATS BADGE -->
        <div v-if="stats" class="stats-badge">
          <a-tag color="purple">
            Savings: {{ stats.savings }}% ({{ stats.originalBytes }} B →
            {{ stats.minifiedBytes }} B)
          </a-tag>
        </div>
      </div>

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Original Input Code</span>
            <span class="char-count">{{ inputCode.length }} chars</span>
          </div>
          <a-textarea
            v-model:value="inputCode"
            placeholder="Paste code snippet here..."
            :rows="16"
            class="code-editor"
            @input="processCode"
          />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Minified Output Code</span>
            <span class="char-count">{{ outputCode.length }} chars</span>
          </div>
          <a-textarea
            :value="outputCode"
            readonly
            placeholder="Minified code will appear here..."
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
  loadSample,
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
}

.toolbar-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
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
</style>
