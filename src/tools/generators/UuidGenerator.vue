<!--
/**
 * @file UuidGenerator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary UUID (Universally Unique Identifier) Generator tool component
 *
 * @description
 * Generates v4 UUIDs in bulk with uppercase/lowercase formatting and hyphen customization.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="uuid-generator"
    title="UUID / GUID Generator"
    description="Generate version 1 and version 4 Universally Unique Identifiers in bulk."
    tier="Tier 2"
    :can-copy="uuidsList.length > 0"
    :can-download="uuidsList.length > 0"
    :can-reset="true"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @copy="handleCopy"
    @download="handleDownload"
    @reset="generateUuids"
    @sample="handleSample"
  >
    <template #icon>
      <NumberOutlined />
    </template>

    <div class="uuid-tool-layout">
      <!-- CONFIG BAR -->
      <div class="config-toolbar">
        <a-space wrap align="center">
          <span>Version:</span>
          <a-radio-group v-model:value="version" button-style="solid" @change="generateUuids">
            <a-radio-button value="v4">UUID v4 (Random)</a-radio-button>
            <a-radio-button value="v1">UUID v1 (Time-based)</a-radio-button>
          </a-radio-group>

          <span style="margin-left: 12px">Quantity:</span>
          <a-input-number
            v-model:value="count"
            :min="1"
            :max="100"
            style="width: 80px"
            @change="generateUuids"
          />

          <a-checkbox v-model:checked="uppercase" @change="generateUuids">Uppercase</a-checkbox>
          <a-checkbox v-model:checked="hyphens" @change="generateUuids">Include Hyphens</a-checkbox>

          <a-button type="primary" @click="generateUuids">
            <template #icon><ReloadOutlined /></template>
            Regenerate
          </a-button>
        </a-space>
      </div>

      <!-- RESULTS PANEL -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Generated UUIDs ({{ uuidsList.length }})</span>
        </div>
        <a-textarea
          :value="formattedOutput"
          readonly
          :rows="12"
          class="code-editor readonly-editor"
        />
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useUuidGenerator } from '../../composables/generators/useUuidGenerator';
import { NumberOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  version,
  count,
  uppercase,
  hyphens,
  uuidsList,
  formattedOutput,
  generateUuids,
  handleCopy,
  handleDownload
} = useUuidGenerator();
</script>

<style scoped>
.uuid-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-toolbar {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 16px;
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

.readonly-editor {
  cursor: default;
}
</style>
