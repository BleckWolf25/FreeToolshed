<!--
/**
 * @file HashGenerator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Cryptographic Hash Generator tool component
 *
 * @description
 * Computes MD5, SHA-1, SHA-256, and SHA-512 hashes for any input string using Crypto-JS.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="hash-generator"
    title="Hash Generator (MD5, SHA)"
    description="Calculate cryptographic hashes including MD5, SHA-1, SHA-256, and SHA-512 for text or file inputs."
    tier="Tier 1"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <SafetyCertificateOutlined />
    </template>

    <div class="hash-tool-layout">
      <!-- FILE OR TEXT INPUT -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Input Text / File</span>
          <a-upload :before-upload="handleFileUpload" :show-upload-list="false">
            <a-button size="small">
              <template #icon><UploadOutlined /></template>
              Hash File
            </a-button>
          </a-upload>
        </div>
        <a-textarea
          v-model:value="inputValue"
          placeholder="Type or paste text to generate hashes..."
          :rows="4"
          class="code-editor"
        />
      </div>

      <!-- HASH RESULTS CARDS -->
      <div class="hashes-list">
        <div v-for="h in hashResults" :key="h.name" class="hash-card">
          <div class="hash-header">
            <span class="hash-name">{{ h.name }}</span>
            <a-space size="small">
              <a-button type="link" size="small" @click="copyHash(h.hex, `${h.name} (Hex)`)">
                Copy Hex
              </a-button>
              <a-button
                v-if="h.base64"
                type="link"
                size="small"
                @click="copyHash(h.base64, `${h.name} (Base64)`)"
              >
                Copy Base64
              </a-button>
            </a-space>
          </div>
          <div class="hash-value text-mono">{{ h.hex || '(hash output will appear here...)' }}</div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useHashGenerator } from '../../composables/generators/useHashGenerator';
import { SafetyCertificateOutlined, UploadOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  inputValue,
  hashResults,
  handleFileUpload,
  copyHash,
  handleReset
} = useHashGenerator();
</script>

<style scoped>
.hash-tool-layout {
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
  font-weight: 600;
  font-size: 13px;
}

.code-editor {
  border: none !important;
  resize: vertical;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

.hashes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hash-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
}

.hash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.hash-name {
  font-weight: 700;
  font-size: 13px;
  color: var(--primary-color);
}

.hash-value {
  font-size: 13px;
  word-break: break-all;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 8px;
}
</style>
