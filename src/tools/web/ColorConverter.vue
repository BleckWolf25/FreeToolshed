<!--
/**
 * @file ColorConverter.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Color Format Converter tool component
 *
 * @description
 * Converts color values between HEX, RGB, HSL, and HSV formats with color preview and custom workbench picker.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <ToolCard
    id="color-converter"
    title="Color Code Converter & Picker"
    description="Convert between HEX, RGB, HSL color codes and analyze WCAG accessibility contrast ratios."
    tier="Tier 2"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <BgColorsOutlined />
    </template>

    <div class="color-tool-layout">
      <!-- COLOR PREVIEW HEADER CARD -->
      <div class="color-preview-banner" :style="{ backgroundColor: hexColor }">
        <div class="banner-inner">
          <WorkbenchColorPicker v-model:value="hexColor" @change="onHexChange" />
          <span class="banner-hex-title">{{ hexColor.toUpperCase() }}</span>
        </div>
      </div>

      <!-- INPUT FIELDS GRID -->
      <div class="inputs-grid">
        <div class="input-card">
          <label>HEX Color</label>
          <a-input v-model:value="hexColor" size="large" class="text-mono" @input="onHexChange">
            <template #suffix>
              <a-button
                type="link"
                size="small"
                class="workbench-btn-link"
                @click="copyVal(hexColor, 'HEX')"
                >Copy</a-button
              >
            </template>
          </a-input>
        </div>

        <div class="input-card">
          <label>RGB Color</label>
          <a-input :value="rgbString" readonly size="large" class="text-mono">
            <template #suffix>
              <a-button
                type="link"
                size="small"
                class="workbench-btn-link"
                @click="copyVal(rgbString, 'RGB')"
                >Copy</a-button
              >
            </template>
          </a-input>
        </div>

        <div class="input-card">
          <label>HSL Color</label>
          <a-input :value="hslString" readonly size="large" class="text-mono">
            <template #suffix>
              <a-button
                type="link"
                size="small"
                class="workbench-btn-link"
                @click="copyVal(hslString, 'HSL')"
                >Copy</a-button
              >
            </template>
          </a-input>
        </div>
      </div>

      <!-- ACCESSIBILITY CONTRAST SECTION -->
      <div class="accessibility-card">
        <h3>WCAG 2.1 Contrast Analysis</h3>
        <div class="contrast-cols">
          <div class="contrast-item">
            <div
              class="contrast-sample uppercase-text"
              :style="{ backgroundColor: hexColor, color: '#FFFFFF' }"
            >
              White Text
            </div>
            <div class="contrast-stats">
              <span
                >RATIO: <strong>{{ whiteContrastRatio }}:1</strong></span
              >
              <span
                :class="['contrast-badge', Number(whiteContrastRatio) >= 4.5 ? 'pass' : 'fail']"
              >
                {{ Number(whiteContrastRatio) >= 4.5 ? '[PASS AA]' : '[FAIL AA]' }}
              </span>
            </div>
          </div>

          <div class="contrast-item">
            <div
              class="contrast-sample uppercase-text"
              :style="{ backgroundColor: hexColor, color: '#000000' }"
            >
              Black Text
            </div>
            <div class="contrast-stats">
              <span
                >RATIO: <strong>{{ blackContrastRatio }}:1</strong></span
              >
              <span
                :class="['contrast-badge', Number(blackContrastRatio) >= 4.5 ? 'pass' : 'fail']"
              >
                {{ Number(blackContrastRatio) >= 4.5 ? '[PASS AA]' : '[FAIL AA]' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useColorConverter } from '../../composables/web/useColorConverter';
import { BgColorsOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';
import WorkbenchColorPicker from '../../components/WorkbenchColorPicker.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  hexColor,
  rgbString,
  hslString,
  whiteContrastRatio,
  blackContrastRatio,
  onHexChange,
  copyVal,
  handleReset
} = useColorConverter();
</script>

<style scoped>
.color-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-family);
}

.color-preview-banner {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border-strong);
}

.banner-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--card-bg);
  padding: 10px 24px;
  border: 2px solid var(--border-strong);
}

.banner-hex-title {
  font-family: var(--font-code);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.input-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-card label {
  font-weight: 700;
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.workbench-btn-link {
  font-family: var(--font-family);
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
}

.accessibility-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.accessibility-card h3 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.contrast-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.contrast-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contrast-sample {
  height: 48px;
  border: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 13px;
}

.contrast-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.contrast-badge {
  font-weight: 700;
  font-size: 11px;
  padding: 2px 6px;
  border: 1px solid var(--border-strong);
}

.contrast-badge.pass {
  background: var(--success-color);
  color: #ffffff;
}

.contrast-badge.fail {
  background: var(--error-color);
  color: #ffffff;
}

@media (max-width: 640px) {
  .contrast-cols {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .banner-inner {
    padding: 8px 12px;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .banner-hex-title {
    font-size: 18px;
  }
}
</style>
