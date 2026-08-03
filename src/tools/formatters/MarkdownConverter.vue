<!--
/**
 * @file MarkdownConverter.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Markdown to HTML Converter & Previewer tool component
 *
 * @description
 * Converts Markdown syntax to clean HTML with real-time preview and raw HTML output.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="markdown-converter"
    title="Markdown to HTML Converter"
    description="Live preview GitHub-flavored Markdown and export clean rendered HTML code."
    tier="Tier 2"
    :can-copy="!!htmlOutput"
    :can-download="!!htmlOutput"
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
      <FileTextOutlined />
    </template>

    <div class="md-tool-layout">
      <!-- VIEW MODE TOGGLE -->
      <div class="toolbar-controls">
        <a-radio-group v-model:value="viewMode" button-style="solid">
          <a-radio-button value="preview">Live Preview</a-radio-button>
          <a-radio-button value="code">Raw HTML Code</a-radio-button>
        </a-radio-group>
        <a-button type="default" @click="loadSample">Load Sample Markdown</a-button>
      </div>

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <!-- MARKDOWN INPUT -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Markdown Input</span>
            <span class="char-count">{{ markdownInput.length }} chars</span>
          </div>
          <a-textarea
            v-model:value="markdownInput"
            placeholder="Type or paste Markdown text..."
            :rows="16"
            class="code-editor"
            @input="renderMarkdown"
          />
        </div>

        <!-- RENDERED HTML PREVIEW / CODE -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">{{
              viewMode === 'preview' ? 'Rendered Output' : 'Generated HTML Code'
            }}</span>
          </div>

          <div
            v-if="viewMode === 'preview'"
            class="rendered-markdown-body"
            v-html="htmlOutput"
          ></div>

          <a-textarea
            v-else
            :value="htmlOutput"
            readonly
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
import { useMarkdownConverter } from '../../composables/formatters/useMarkdownConverter';
import { FileTextOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  markdownInput,
  htmlOutput,
  viewMode,
  renderMarkdown,
  loadSample,
  handleCopy,
  handleDownload,
  handleReset
} = useMarkdownConverter();
</script>

<style scoped>
.md-tool-layout {
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

.rendered-markdown-body {
  padding: 16px;
  background: var(--card-bg);
  min-height: 350px;
  max-height: 500px;
  overflow-y: auto;
  color: var(--text-primary);
}
</style>
