<!--
/**
 * @file UrlConverter.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary URL Encoder & Decoder tool component
 *
 * @description
 * Encodes special characters in URLs for web transmission and decodes percent-encoded URL strings.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="url-converter"
    title="URL Encoder & Decoder"
    description="Encode/decode URLs and inspect query parameters, protocol, hostname, and path structure."
    tier="Tier 1"
    :can-copy="!!outputValue"
    :can-reset="true"
    @copy="handleCopy"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <LinkOutlined />
    </template>

    <div class="url-tool-layout">
      <!-- MODE TOGGLE TOOLBAR -->
      <div class="toolbar-controls">
        <a-radio-group v-model:value="mode" button-style="solid" @change="processUrl">
          <a-radio-button value="encode">Encode URL</a-radio-button>
          <a-radio-button value="decode">Decode URL</a-radio-button>
          <a-radio-button value="parse">Parse Components & Query Params</a-radio-button>
        </a-radio-group>
      </div>

      <!-- INPUT PANEL -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Input URL / String</span>
        </div>
        <a-textarea
          v-model:value="inputValue"
          placeholder="Paste URL or raw string (e.g. https://api.example.com/v1/search?q=hello%20world&page=1)..."
          :rows="4"
          class="code-editor"
          @input="processUrl"
        />
      </div>

      <!-- OUTPUT PANEL (ENCODE/DECODE) -->
      <div v-if="mode !== 'parse'" class="panel">
        <div class="panel-header">
          <span class="panel-title">{{
            mode === 'encode' ? 'Encoded URL Result' : 'Decoded URL Result'
          }}</span>
        </div>
        <a-textarea
          :value="outputValue"
          readonly
          placeholder="Converted output will appear here..."
          :rows="4"
          class="code-editor readonly-editor"
        />
      </div>

      <!-- PARSED COMPONENTS BREAKDOWN -->
      <div v-if="parsedUrl" class="parsed-breakdown">
        <h3>URL Structure Analysis</h3>
        <a-descriptions bordered size="small" :column="{ xs: 1, sm: 2, md: 3 }">
          <a-descriptions-item label="Protocol">{{ parsedUrl.protocol }}</a-descriptions-item>
          <a-descriptions-item label="Hostname">{{ parsedUrl.hostname }}</a-descriptions-item>
          <a-descriptions-item label="Port">{{ parsedUrl.port }}</a-descriptions-item>
          <a-descriptions-item label="Pathname">{{ parsedUrl.pathname }}</a-descriptions-item>
          <a-descriptions-item label="Hash">{{ parsedUrl.hash || '(none)' }}</a-descriptions-item>
        </a-descriptions>

        <div v-if="parsedUrl.queryParams.length > 0" class="query-params-section">
          <h4>Query Parameters ({{ parsedUrl.queryParams.length }})</h4>
          <a-table
            :data-source="parsedUrl.queryParams"
            :columns="paramColumns"
            size="small"
            :pagination="false"
            row-key="key"
          />
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useUrlConverter } from '../../composables/encoders/useUrlConverter';
import { LinkOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  mode,
  inputValue,
  outputValue,
  parsedUrl,
  paramColumns,
  processUrl,
  handleCopy,
  handleReset
} = useUrlConverter();
</script>

<style scoped>
.url-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toolbar-controls {
  display: flex;
  align-items: center;
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
  padding: 8px 12px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary);
}

.code-editor {
  border: none !important;
  resize: vertical;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

.parsed-breakdown {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.query-params-section {
  margin-top: 8px;
}
</style>
