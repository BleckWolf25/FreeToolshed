<!--
/**
 * @file Base64Converter.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Base64 Encoder and Decoder tool component
 *
 * @description
 * Encodes plain text into Base64 format and decodes Base64 encoded strings back to plain text.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="base64-converter"
    title="Base64 Encoder & Decoder"
    description="Encode text or files into Base64 strings and decode Base64 data into raw text."
    tier="Tier 1"
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
      <FileSyncOutlined />
    </template>

    <div class="base64-tool-layout">
      <!-- MODE TOGGLE TOOLBAR -->
      <div class="toolbar-controls">
        <a-radio-group v-model:value="mode" button-style="solid" @change="processConversion">
          <a-radio-button value="encode">Encode (Text/File → Base64)</a-radio-button>
          <a-radio-button value="decode">Decode (Base64 → Text/File)</a-radio-button>
        </a-radio-group>

        <!-- FILE UPLOAD DRAG/DROP -->
        <a-upload-dragger
          v-if="mode === 'encode'"
          name="file"
          :before-upload="handleFileUpload"
          :show-upload-list="false"
          class="file-dragger"
        >
          <p class="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p class="ant-upload-text">Click or drag file to encode to Base64</p>
        </a-upload-dragger>
      </div>

      <!-- ERROR ALERT -->
      <a-alert
        v-if="errorMessage"
        :message="errorMessage"
        type="error"
        show-icon
        class="error-alert"
      />

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">{{
              mode === 'encode' ? 'Plain Text Input' : 'Base64 Input String'
            }}</span>
            <span class="char-count">{{ inputValue.length }} chars</span>
          </div>
          <a-textarea
            v-model:value="inputValue"
            :placeholder="
              mode === 'encode'
                ? 'Type or paste plain text...'
                : 'Paste Base64 encoded string here...'
            "
            :rows="14"
            class="code-editor"
            @input="processConversion"
          />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">{{
              mode === 'encode' ? 'Base64 Output String' : 'Decoded Output Text'
            }}</span>
            <span class="char-count">{{ outputValue.length }} chars</span>
          </div>
          <a-textarea
            :value="outputValue"
            readonly
            :placeholder="
              mode === 'encode'
                ? 'Base64 output will appear here...'
                : 'Decoded plain text will appear here...'
            "
            :rows="14"
            class="code-editor readonly-editor"
          />
        </div>
      </div>

      <!-- IMAGE PREVIEW FOR DECODED DATA URIS -->
      <div v-if="imagePreviewUrl" class="image-preview-card">
        <h3>Image Preview</h3>
        <img :src="imagePreviewUrl" alt="Base64 Decoded Preview" class="preview-img" />
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useBase64Converter } from '../../composables/encoders/useBase64Converter';
import { FileSyncOutlined, UploadOutlined } from '@ant-design/icons-vue';
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
  imagePreviewUrl,
  processConversion,
  handleFileUpload,
  handleCopy,
  handleDownload,
  handleReset
} = useBase64Converter();
</script>

<style scoped>
.base64-tool-layout {
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

.file-dragger {
  max-width: 320px;
  padding: 8px !important;
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
}

.panel-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary);
}

.char-count {
  font-size: 11px;
  color: var(--text-secondary);
}

.code-editor {
  border: none !important;
  resize: vertical;
  border-radius: 0 !important;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

.readonly-editor {
  cursor: default;
}

.image-preview-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.preview-img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
</style>
