<!--
/**
 * @file DiffChecker.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Text Diff Comparison tool component
 *
 * @description
 * Compares two text inputs side-by-side or inline to highlight additions, deletions, and modifications.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="diff-checker"
    title="Text Diff Comparison"
    description="Compare two text snippets side-by-side or unified to highlight additions and deletions."
    tier="Tier 2"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <DiffOutlined />
    </template>

    <div class="diff-tool-layout">
      <!-- TOOLBAR -->
      <div class="toolbar-controls">
        <a-space wrap align="center">
          <a-button type="primary" @click="computeDiff">
            <template #icon><DiffOutlined /></template>
            Compare Text
          </a-button>

          <a-button type="default" @click="loadSample"> Load Sample Snippets </a-button>
        </a-space>

        <!-- STATS TAGS -->
        <a-space v-if="diffStats" wrap>
          <a-tag color="success">+{{ diffStats.additions }} Additions</a-tag>
          <a-tag color="error">-{{ diffStats.deletions }} Deletions</a-tag>
        </a-space>
      </div>

      <!-- INPUT PANELS GRID -->
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Original Text (Left)</span>
          </div>
          <a-textarea
            v-model:value="text1"
            placeholder="Paste original text here..."
            :rows="10"
            class="code-editor"
            @input="computeDiff"
          />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Modified Text (Right)</span>
          </div>
          <a-textarea
            v-model:value="text2"
            placeholder="Paste modified text here..."
            :rows="10"
            class="code-editor"
            @input="computeDiff"
          />
        </div>
      </div>

      <!-- DIFF RESULT DISPLAY -->
      <div v-if="diffHtml" class="diff-result-panel">
        <div class="diff-result-header">
          <h3>Visual Diff Breakdown</h3>
        </div>
        <div class="diff-body text-mono" v-html="diffHtml"></div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useDiffChecker } from '../../composables/text/useDiffChecker';
import { DiffOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  text1,
  text2,
  diffHtml,
  diffStats,
  computeDiff,
  loadSample,
  handleReset
} = useDiffChecker();
</script>

<style scoped>
.diff-tool-layout {
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

.diff-result-panel {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.diff-body {
  background: var(--code-bg);
  color: var(--code-text);
  padding: 16px;
  border-radius: 6px;
  max-height: 400px;
  overflow-y: auto;
  line-height: 1.6;
}

:deep(.diff-add) {
  background-color: rgba(82, 196, 26, 0.25);
  color: #73d13d;
  text-decoration: none;
}

:deep(.diff-del) {
  background-color: rgba(255, 77, 79, 0.25);
  color: #ff7875;
  text-decoration: line-through;
}
</style>
