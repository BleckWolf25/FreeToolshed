<!--
/**
 * @file MorseTranslator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Text & Morse Code Translator tool component
 *
 * @description
 * Translates plain text to Morse code and vice versa, featuring audio playback simulation.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="morse-translator"
    title="Morse Code Translator"
    description="Translate text to Morse code and play audio tones using Web Audio API oscillators."
    tier="Tier 3"
    :can-copy="!!outputMorse"
    :can-reset="true"
    @copy="handleCopy"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <AudioOutlined />
    </template>

    <div class="morse-tool-layout">
      <!-- TRANSLATION MODE BAR -->
      <div class="toolbar-controls">
        <a-radio-group v-model:value="mode" button-style="solid" @change="processTranslation">
          <a-radio-button value="textToMorse">Text → Morse Code</a-radio-button>
          <a-radio-button value="morseToText">Morse Code → Text</a-radio-button>
        </a-radio-group>

        <!-- AUDIO PLAYBACK CONTROLS -->
        <a-space wrap align="center">
          <a-button type="primary" :disabled="!outputMorse || isPlaying" @click="playMorseAudio">
            <template #icon><CaretRightOutlined /></template>
            Play Audio
          </a-button>

          <a-button type="default" :disabled="!isPlaying" @click="stopMorseAudio">
            <template #icon><PauseOutlined /></template>
            Stop Audio
          </a-button>

          <span>Speed (WPM): {{ wpm }}</span>
          <a-slider
            v-model:value="wpm"
            :min="5"
            :max="30"
            style="min-width: 100px; flex: 1; max-width: 160px; margin: 0 4px"
          />
        </a-space>
      </div>

      <!-- EDITOR PANELS GRID -->
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">{{
              mode === 'textToMorse' ? 'Plain Text Input' : 'Morse Code Input (. and -)'
            }}</span>
          </div>
          <a-textarea
            v-model:value="inputText"
            :placeholder="
              mode === 'textToMorse'
                ? 'Type text to translate...'
                : 'Type morse code (use spaces between letters, / for words)...'
            "
            :rows="8"
            class="code-editor"
            @input="processTranslation"
          />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">{{
              mode === 'textToMorse' ? 'Morse Code Output' : 'Translated Text Output'
            }}</span>
          </div>
          <a-textarea :value="outputMorse" readonly :rows="8" class="code-editor readonly-editor" />
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useMorseTranslator } from '../../composables/text/useMorseTranslator';
import { AudioOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  mode,
  inputText,
  outputMorse,
  wpm,
  isPlaying,
  processTranslation,
  playMorseAudio,
  stopMorseAudio,
  handleCopy,
  handleReset
} = useMorseTranslator();
</script>

<style scoped>
.morse-tool-layout {
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

.readonly-editor {
  cursor: default;
}
</style>
