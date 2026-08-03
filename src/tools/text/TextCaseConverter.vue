<!--
/**
 * @file TextCaseConverter.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Text Case Converter & Formatting tool component
 *
 * @description
 * Converts text case between camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, and Title Case.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="text-case-converter"
    title="Text Case Converter"
    description="Transform text to UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, and dot.case."
    tier="Tier 1"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <FontSizeOutlined />
    </template>

    <div class="case-tool-layout">
      <!-- INPUT PANEL -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Original Text Input</span>
          <div class="stats-counter">
            <span>{{ charCount }} Characters</span> • <span>{{ wordCount }} Words</span> •
            <span>{{ lineCount }} Lines</span>
          </div>
        </div>
        <a-textarea
          v-model:value="inputValue"
          placeholder="Type or paste text to convert case..."
          :rows="5"
          class="code-editor"
        />
      </div>

      <!-- CONVERTED RESULTS GRID -->
      <div class="cases-grid">
        <div v-for="c in caseResults" :key="c.key" class="case-card">
          <div class="case-card-header">
            <span class="case-title">{{ c.label }}</span>
            <a-button type="link" size="small" @click="copyCase(c.value, c.label)">
              <template #icon><CopyOutlined /></template>
              Copy
            </a-button>
          </div>
          <div class="case-card-content">
            {{ c.value || '(output will appear here...)' }}
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useTextCaseConverter } from '../../composables/text/useTextCaseConverter';
import { FontSizeOutlined, CopyOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  inputValue,
  charCount,
  wordCount,
  lineCount,
  caseResults,
  copyCase,
  handleReset
} = useTextCaseConverter();
</script>

<style scoped>
.case-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.stats-counter {
  font-size: 12px;
  color: var(--text-secondary);
}

.code-editor {
  border: none !important;
  resize: vertical;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.case-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
}

.case-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.case-title {
  font-weight: 600;
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.case-card-content {
  font-family: var(--font-code);
  font-size: 13px;
  color: var(--text-primary);
  word-break: break-all;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 8px;
  min-height: 38px;
}
</style>
