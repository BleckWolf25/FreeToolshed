<!--
/**
 * @file NumberBaseConverter.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Number Base Converter tool component (Binary, Octal, Decimal, Hex, Custom 2-36)
 *
 * @description
 * Synchronized multi-base input converter with 8/16/32-bit binary bitwise breakdown and Two's Complement visualization.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <ToolCard
    id="number-base-converter"
    title="Number Base Converter"
    description="Convert between Binary, Octal, Decimal, Hexadecimal, and Custom bases with 8/16/32-bit representations."
    tier="Tier 1"
    :can-copy="isValid"
    :can-reset="true"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @copy="handleCopy"
    @reset="handleReset"
    @sample="handleSample"
  >
    <template #icon>
      <RetweetOutlined />
    </template>

    <div class="base-tool-layout">
      <!-- ERROR ALERT -->
      <a-alert
        v-if="errorMessage"
        :message="errorMessage"
        type="error"
        show-icon
        closable
        class="error-alert"
      />

      <!-- MULTI-BASE INPUTS GRID -->
      <div class="base-inputs-grid">
        <!-- DECIMAL -->
        <div class="base-card">
          <div class="base-card-header">
            <span class="base-tag">[BASE_10]</span>
            <span class="base-title">DECIMAL</span>
          </div>
          <a-input
            v-model:value="decimalInput"
            placeholder="e.g. 255"
            class="workbench-base-input"
            @input="updateFromDecimal"
          />
        </div>

        <!-- HEXADECIMAL -->
        <div class="base-card">
          <div class="base-card-header">
            <span class="base-tag">[BASE_16]</span>
            <span class="base-title">HEXADECIMAL</span>
          </div>
          <a-input
            v-model:value="hexInput"
            placeholder="e.g. FF"
            class="workbench-base-input"
            @input="updateFromHex"
          />
        </div>

        <!-- BINARY -->
        <div class="base-card">
          <div class="base-card-header">
            <span class="base-tag">[BASE_2]</span>
            <span class="base-title">BINARY</span>
          </div>
          <a-input
            v-model:value="binaryInput"
            placeholder="e.g. 11111111"
            class="workbench-base-input"
            @input="updateFromBinary"
          />
        </div>

        <!-- OCTAL -->
        <div class="base-card">
          <div class="base-card-header">
            <span class="base-tag">[BASE_8]</span>
            <span class="base-title">OCTAL</span>
          </div>
          <a-input
            v-model:value="octalInput"
            placeholder="e.g. 377"
            class="workbench-base-input"
            @input="updateFromOctal"
          />
        </div>
      </div>

      <!-- CUSTOM BASE CONTROL -->
      <div class="custom-base-card">
        <div class="custom-header">
          <div class="custom-title-wrap">
            <span class="base-tag">[CUSTOM_BASE]</span>
            <span class="base-title">BASE {{ customBase }}</span>
          </div>
          <div class="custom-slider-wrap">
            <label>BASE RADIX (2-36):</label>
            <a-slider
              v-model:value="customBase"
              :min="2"
              :max="36"
              style="width: 180px"
              @change="updateFromDecimal"
            />
          </div>
        </div>
        <a-input
          v-model:value="customInput"
          placeholder="Custom base string..."
          class="workbench-base-input"
          @input="updateFromCustom"
        />
      </div>

      <!-- BITWISE REPRESENTATION VISUALIZATION -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">[BITWISE_LAYOUT] BINARY BIT REPRESENTATION</span>
        </div>
        <div class="panel-body">
          <div class="bit-row">
            <span class="bit-lbl">8-BIT UNSIGNED:</span>
            <code class="bit-val">{{ bit8 }}</code>
          </div>
          <div class="bit-row">
            <span class="bit-lbl">16-BIT UNSIGNED:</span>
            <code class="bit-val">{{ bit16 }}</code>
          </div>
          <div class="bit-row">
            <span class="bit-lbl">32-BIT UNSIGNED:</span>
            <code class="bit-val">{{ bit32 }}</code>
          </div>
          <div class="bit-row">
            <span class="bit-lbl">8-BIT TWO'S COMPLEMENT:</span>
            <code class="bit-val">{{ twosComplement8 }}</code>
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useNumberBaseConverter } from '../../composables/math/useNumberBaseConverter';
import { RetweetOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  binaryInput,
  octalInput,
  decimalInput,
  hexInput,
  customBase,
  customInput,
  bit8,
  bit16,
  bit32,
  twosComplement8,
  isValid,
  errorMessage,
  updateFromDecimal,
  updateFromBinary,
  updateFromOctal,
  updateFromHex,
  updateFromCustom,
  handleSample,
  handleCopy,
  handleReset
} = useNumberBaseConverter();

updateFromDecimal();
</script>

<style scoped>
.base-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-family);
}

.base-inputs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .base-inputs-grid {
    grid-template-columns: 1fr;
  }
}

.base-card,
.custom-base-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-card-header,
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.custom-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-slider-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.custom-slider-wrap label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-secondary);
}

.base-tag {
  font-size: 10px;
  font-weight: 700;
  color: var(--stamp-text);
  background: var(--stamp-bg);
  padding: 1px 6px;
  border: 1px solid var(--border-strong);
}

.base-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}

.workbench-base-input {
  font-family: var(--font-code) !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
  border: 1px solid var(--border-strong) !important;
  padding: 8px 12px !important;
}

.panel {
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
}

.panel-title {
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.panel-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  flex-wrap: wrap;
  gap: 8px;
}

.bit-lbl {
  font-weight: 700;
  color: var(--text-secondary);
}

.bit-val {
  font-family: var(--font-code);
  font-weight: 700;
  font-size: 12px;
  color: var(--text-primary);
  background: var(--card-bg);
  padding: 2px 8px;
  border: 1px solid var(--border-color);
  letter-spacing: 0.1em;
}
</style>
