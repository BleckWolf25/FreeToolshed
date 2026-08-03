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
 * Converts color values between HEX, RGB, HSL, and HSV formats with color preview and pickers.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
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
          <input type="color" v-model="hexColor" class="native-color-picker" @input="onHexChange" />
          <span class="banner-hex-title" :style="{ color: contrastTextColor }">{{
            hexColor.toUpperCase()
          }}</span>
        </div>
      </div>

      <!-- INPUT FIELDS GRID -->
      <div class="inputs-grid">
        <div class="input-card">
          <label>HEX Color</label>
          <a-input v-model:value="hexColor" size="large" @input="onHexChange">
            <template #suffix>
              <a-button type="link" size="small" @click="copyVal(hexColor, 'HEX')">Copy</a-button>
            </template>
          </a-input>
        </div>

        <div class="input-card">
          <label>RGB Color</label>
          <a-input :value="rgbString" readonly size="large">
            <template #suffix>
              <a-button type="link" size="small" @click="copyVal(rgbString, 'RGB')">Copy</a-button>
            </template>
          </a-input>
        </div>

        <div class="input-card">
          <label>HSL Color</label>
          <a-input :value="hslString" readonly size="large">
            <template #suffix>
              <a-button type="link" size="small" @click="copyVal(hslString, 'HSL')">Copy</a-button>
            </template>
          </a-input>
        </div>
      </div>

      <!-- ACCESSIBILITY CONTRAST SECTION -->
      <div class="accessibility-card">
        <h3>WCAG 2.1 Contrast Analysis</h3>
        <div class="contrast-cols">
          <div class="contrast-item">
            <div class="contrast-sample" :style="{ backgroundColor: hexColor, color: '#FFFFFF' }">
              White Text
            </div>
            <div class="contrast-stats">
              <span
                >Ratio: <strong>{{ whiteContrastRatio }}:1</strong></span
              >
              <a-tag :color="Number(whiteContrastRatio) >= 4.5 ? 'success' : 'error'">
                {{ Number(whiteContrastRatio) >= 4.5 ? 'Pass (AA)' : 'Fail (AA)' }}
              </a-tag>
            </div>
          </div>

          <div class="contrast-item">
            <div class="contrast-sample" :style="{ backgroundColor: hexColor, color: '#000000' }">
              Black Text
            </div>
            <div class="contrast-stats">
              <span
                >Ratio: <strong>{{ blackContrastRatio }}:1</strong></span
              >
              <a-tag :color="Number(blackContrastRatio) >= 4.5 ? 'success' : 'error'">
                {{ Number(blackContrastRatio) >= 4.5 ? 'Pass (AA)' : 'Fail (AA)' }}
              </a-tag>
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
  contrastTextColor,
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
}

.color-preview-banner {
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.banner-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  padding: 10px 24px;
  border-radius: 30px;
}

.native-color-picker {
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
}

.banner-hex-title {
  font-family: var(--font-code);
  font-size: 24px;
  font-weight: 700;
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
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
}

.accessibility-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  height: 44px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.contrast-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
</style>
