<!--
/**
 * @file AsciiArtGenerator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary ASCII Art Generator tool component
 *
 * @description
 * Generates text-based ASCII art from input strings using multiple font styles and customizable borders.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="ascii-art-generator"
    title="ASCII Art Text Generator"
    description="Render text as ASCII art banners with customizable FIGlet font styles."
    tier="Tier 3"
    :can-copy="!!asciiArtOutput"
    :can-download="!!asciiArtOutput"
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
      <BorderOutlined />
    </template>

    <div class="ascii-tool-layout">
      <!-- CONFIG BAR -->
      <div class="toolbar-controls">
        <a-space wrap align="center">
          <span>FIGlet Font:</span>
          <a-select v-model:value="fontStyle" style="width: 160px" @change="generateAsciiArt">
            <a-select-option value="Standard">Standard</a-select-option>
            <a-select-option value="Slant">Slant</a-select-option>
            <a-select-option value="3D-ASCII">3D ASCII</a-select-option>
            <a-select-option value="Banner">Banner</a-select-option>
            <a-select-option value="Doom">Doom</a-select-option>
          </a-select>

          <a-button type="primary" @click="generateAsciiArt">Generate Banner</a-button>
        </a-space>
      </div>

      <!-- INPUT PANEL -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Banner Text Input</span>
        </div>
        <a-input
          v-model:value="inputText"
          placeholder="Enter text to render as ASCII banner..."
          size="large"
          class="text-mono"
          @input="generateAsciiArt"
        />
      </div>

      <!-- ASCII ART OUTPUT PREVIEW -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">ASCII Art Preview</span>
        </div>
        <pre class="ascii-preview-box text-mono">{{
          asciiArtOutput || '(banner will render here...)'
        }}</pre>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useAsciiArtGenerator } from '../../composables/generators/useAsciiArtGenerator';
import { BorderOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  inputText,
  fontStyle,
  asciiArtOutput,
  generateAsciiArt,
  handleCopy,
  handleDownload,
  handleReset
} = useAsciiArtGenerator();
</script>

<style scoped>
.ascii-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
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

.ascii-preview-box {
  padding: 20px;
  background: var(--code-bg);
  color: var(--code-text);
  margin: 0;
  overflow-x: auto;
  min-height: 200px;
  font-size: 13px;
  line-height: 1.2;
}
</style>
