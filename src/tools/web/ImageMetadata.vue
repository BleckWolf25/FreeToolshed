<!--
/**
 * @file ImageMetadata.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Image Metadata & EXIF Viewer tool component
 *
 * @description
 * Extracts EXIF metadata, dimensions, file size, MIME type, and color depth from image files.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="image-metadata"
    title="Image Metadata / EXIF Viewer"
    description="Inspect image file properties, resolution, mime type, and EXIF camera metadata client-side."
    tier="Tier 3"
    :can-download="!!metadataJson"
    :can-reset="true"
    @download="handleDownload"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <PictureOutlined />
    </template>

    <div class="image-tool-layout">
      <!-- FILE UPLOAD DRAG/DROP -->
      <a-upload-dragger
        name="file"
        :before-upload="handleFileUpload"
        :show-upload-list="false"
        accept="image/*"
        class="file-dragger"
      >
        <p class="ant-upload-drag-icon">
          <PictureOutlined />
        </p>
        <p class="ant-upload-text">Click or drag an image file to inspect metadata & EXIF</p>
      </a-upload-dragger>

      <!-- RESULTS GRID -->
      <div v-if="imageData" class="results-grid">
        <!-- IMAGE PREVIEW CARD -->
        <div class="preview-card">
          <h3>Image Preview</h3>
          <img :src="imageData.url" alt="Uploaded Image" class="image-preview" />
          <div class="basic-stats">
            <div><strong>File Name:</strong> {{ imageData.name }}</div>
            <div>
              <strong>Dimensions:</strong> {{ imageData.width }} × {{ imageData.height }} px
            </div>
            <div><strong>File Size:</strong> {{ imageData.sizeFormatted }}</div>
            <div><strong>MIME Type:</strong> {{ imageData.type }}</div>
          </div>
        </div>

        <!-- EXIF METADATA JSON PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">EXIF & Image Header Metadata</span>
            <a-button type="link" size="small" @click="copyMetadata">Copy JSON</a-button>
          </div>
          <pre class="json-code text-mono">{{ metadataJson }}</pre>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useImageMetadata } from '../../composables/web/useImageMetadata';
import { PictureOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  imageData,
  metadataJson,
  handleFileUpload,
  copyMetadata,
  handleDownload,
  handleReset
} = useImageMetadata();
</script>

<style scoped>
.image-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.file-dragger {
  padding: 16px !important;
}

.results-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}

.preview-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image-preview {
  max-width: 100%;
  max-height: 240px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.basic-stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;

  color: var(--text-primary);
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

.json-code {
  padding: 16px;
  background: var(--code-bg);
  color: var(--code-text);
  margin: 0;
  border-radius: 0;
  overflow-x: auto;
  max-height: 400px;
  font-size: 13px;
}
</style>
