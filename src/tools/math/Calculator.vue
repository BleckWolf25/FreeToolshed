<!--
/**
 * @file Calculator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Scientific & Graphical Calculator iframe tool component
 *
 * @description
 * Embeds The Great Calculator web application inside a responsive workbench frame
 * with fallback loading state, fullscreen option, and direct link actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <ToolCard
    id="calculator"
    title="Scientific & Graphical Calculator"
    description="Accurate, full-featured scientific, trigonometric, matrix, and function graphing calculator."
    tier="Tier 1"
    :can-copy="true"
    :can-reset="true"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @copy="handleCopy"
    @reset="handleReset"
    @sample="handleSample"
  >
    <template #icon>
      <CalculatorOutlined />
    </template>

    <div class="calculator-tool-layout">
      <!-- BENCH FRAME TOOLBAR -->
      <div class="toolbar-card">
        <div class="toolbar-info">
          <span class="app-badge">[THE_GREAT_CALCULATOR_V4]</span>
          <span class="app-status">100% ACCURATE · SCIENTIFIC & GRAPHICAL ENGINE</span>
        </div>
        <div class="toolbar-actions">
          <a :href="calculatorUrl" target="_blank" rel="noopener noreferrer">
            <a-button type="default" class="workbench-btn">
              <template #icon><ExportOutlined /></template>
              OPEN FULLSCREEN
            </a-button>
          </a>
        </div>
      </div>

      <!-- IFRAME CONTAINER -->
      <div class="iframe-workbench-frame">
        <div v-if="isLoading" class="loading-overlay">
          <a-spin size="large" />
          <span class="loading-text">LOADING SCIENTIFIC CALCULATOR ENGINE...</span>
        </div>

        <iframe
          v-if="calculatorUrl"
          :src="calculatorUrl"
          title="The Great Calculator"
          class="calculator-iframe"
          allow="fullscreen"
          @load="handleIframeLoad"
        ></iframe>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useCalculator } from '../../composables/math/useCalculator';
import { CalculatorOutlined, ExportOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  calculatorUrl,
  isLoading,
  handleIframeLoad,
  handleSample,
  handleCopy,
  handleReset
} = useCalculator();
</script>

<style scoped>
.calculator-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-family);
}

.toolbar-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 12px 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.toolbar-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-badge {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 11px;
  color: var(--stamp-text);
  background: var(--stamp-bg);
  padding: 2px 8px;
  border: 1px solid var(--border-strong);
}

.app-status {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}

.workbench-btn {
  font-family: var(--font-family) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  height: 34px;
}

.iframe-workbench-frame {
  position: relative;
  width: 100%;
  height: 720px;
  background: var(--card-bg);
  border: 2px solid var(--border-strong);
  overflow: hidden;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--card-bg);
  z-index: 10;
}

.loading-text {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.08em;
}

.calculator-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
}
</style>
