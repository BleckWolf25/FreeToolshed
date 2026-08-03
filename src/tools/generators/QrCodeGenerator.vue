<!--
/**
 * @file QrCodeGenerator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary QR Code Generator tool component
 *
 * @description
 * Generates custom QR codes from URLs or text with size, margin, color, and SVG/PNG download options.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="qrcode-generator"
    title="QR Code Generator"
    description="Create customizable QR Codes for URLs/text and export as PNG or SVG images."
    tier="Tier 2"
    :can-download="!!qrDataUrl"
    :can-reset="true"
    @download="downloadPng"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <QrcodeOutlined />
    </template>

    <div class="qr-tool-layout">
      <!-- CONFIG & INPUT GRID -->
      <div class="qr-grid">
        <!-- INPUT & CONTROLS PANEL -->
        <div class="controls-column">
          <div class="panel">
            <div class="panel-header">
              <span class="panel-title">QR Content Input</span>
            </div>
            <a-textarea
              v-model:value="qrText"
              placeholder="Enter URL or text to encode into QR code..."
              :rows="4"
              class="code-editor"
              @input="generateQrCode"
            />
          </div>

          <div class="config-card">
            <h3>QR Customization Options</h3>
            <div class="options-grid">
              <div class="option-item">
                <label>Size (px): {{ qrSize }}</label>
                <a-slider
                  v-model:value="qrSize"
                  :min="128"
                  :max="512"
                  :step="16"
                  @change="generateQrCode"
                />
              </div>

              <div class="option-item">
                <label>Error Correction Level</label>
                <a-select
                  v-model:value="errorCorrection"
                  style="width: 100%"
                  @change="generateQrCode"
                >
                  <a-select-option value="L">L - Low (7% recovery)</a-select-option>
                  <a-select-option value="M">M - Medium (15% recovery)</a-select-option>
                  <a-select-option value="Q">Q - Quartile (25% recovery)</a-select-option>
                  <a-select-option value="H">H - High (30% recovery)</a-select-option>
                </a-select>
              </div>

              <div class="option-item">
                <label>Foreground Color</label>
                <input
                  type="color"
                  v-model="fgColor"
                  class="color-picker-input"
                  @change="generateQrCode"
                />
              </div>

              <div class="option-item">
                <label>Background Color</label>
                <input
                  type="color"
                  v-model="bgColor"
                  class="color-picker-input"
                  @change="generateQrCode"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- PREVIEW & DOWNLOAD PANEL -->
        <div class="preview-column">
          <div class="qr-preview-card">
            <h3>QR Code Preview</h3>
            <div class="qr-image-wrapper">
              <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR Code Preview" class="qr-img" />
              <div v-else class="qr-placeholder">Type text to render QR Code</div>
            </div>

            <a-space wrap class="download-btn-group">
              <a-button type="primary" size="large" :disabled="!qrDataUrl" @click="downloadPng">
                <template #icon><DownloadOutlined /></template>
                Download PNG
              </a-button>
              <a-button type="default" size="large" :disabled="!qrDataUrl" @click="downloadSvg">
                <template #icon><DownloadOutlined /></template>
                Download SVG
              </a-button>
            </a-space>
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useQrCodeGenerator } from '../../composables/generators/useQrCodeGenerator';
import { QrcodeOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  qrText,
  qrSize,
  errorCorrection,
  fgColor,
  bgColor,
  qrDataUrl,
  generateQrCode,
  downloadPng,
  downloadSvg,
  handleReset
} = useQrCodeGenerator();
</script>

<style scoped>
.qr-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.qr-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
}

@media (max-width: 860px) {
  .qr-grid {
    grid-template-columns: 1fr;
  }
}

.controls-column {
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

.config-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.option-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.option-item label {
  font-size: 13px;
  color: var(--text-secondary);
}

.color-picker-input {
  border: 1px solid var(--border-color);
  border-radius: 6px;
  height: 36px;
  width: 100%;
  cursor: pointer;
  background: transparent;
}

.preview-column {
  display: flex;
  flex-direction: column;
}

.qr-preview-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.qr-image-wrapper {
  width: 240px;
  height: 240px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.qr-img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.qr-placeholder {
  color: var(--text-secondary);
  font-size: 13px;
  padding: 16px;
}

.download-btn-group {
  justify-content: center;
}
</style>
