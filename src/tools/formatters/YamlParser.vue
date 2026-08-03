<!--
/**
 * @file YamlParser.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary YAML to JSON & JSON to YAML Converter tool component
 *
 * @description
 * Parses and converts YAML documents to JSON format and JSON strings back to YAML structures.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="yaml-parser"
    title="YAML / JSON Parser & Converter"
    description="Parse and convert seamlessly between YAML and JSON formats with validation checking."
    tier="Tier 3"
    :can-copy="!!outputValue"
    :can-download="!!outputValue"
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

    <div class="yaml-tool-layout">
      <!-- MODE CONTROLS -->
      <div class="toolbar-controls">
        <a-space wrap align="center">
          <a-radio-group v-model:value="mode" button-style="solid" @change="processConversion">
            <a-radio-button value="yamlToJson">YAML → JSON</a-radio-button>
            <a-radio-button value="jsonToYaml">JSON → YAML</a-radio-button>
          </a-radio-group>

          <a-button type="default" @click="loadSample">Load Sample</a-button>
        </a-space>
      </div>

      <!-- ERROR ALERT -->
      <a-alert v-if="errorMessage" :message="errorMessage" type="error" show-icon />

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">{{
              mode === 'yamlToJson' ? 'YAML Input' : 'JSON Input'
            }}</span>
            <span class="char-count">{{ inputValue.length }} chars</span>
          </div>
          <a-textarea
            v-model:value="inputValue"
            :placeholder="
              mode === 'yamlToJson' ? 'Paste YAML code here...' : 'Paste JSON code here...'
            "
            :rows="16"
            class="code-editor"
            @input="processConversion"
          />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">{{
              mode === 'yamlToJson' ? 'JSON Output' : 'YAML Output'
            }}</span>
            <span class="char-count">{{ outputValue.length }} chars</span>
          </div>
          <a-textarea
            :value="outputValue"
            readonly
            :placeholder="
              mode === 'yamlToJson'
                ? 'Converted JSON will appear here...'
                : 'Converted YAML will appear here...'
            "
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
import { useYamlParser } from '../../composables/formatters/useYamlParser';
import { CodeOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  mode,
  inputValue,
  outputValue,
  errorMessage,
  processConversion,
  loadSample,
  handleCopy,
  handleDownload,
  handleReset
} = useYamlParser();
</script>

<style scoped>
.yaml-tool-layout {
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
</style>
