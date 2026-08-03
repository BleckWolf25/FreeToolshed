<!--
/**
 * @file RandomNumberGenerator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Random Number Generator tool component with ranges & exclusions
 *
 * @description
 * Generates customizable random number sets with range min/max bounds, exclusion lists,
 * decimal precision, unique numbers constraint, and sorting controls.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <ToolCard
    id="random-number-generator"
    title="Random Number Generator"
    description="Generate random numbers within custom ranges with exclusion lists, uniqueness constraints, and sorting."
    tier="Tier 1"
    :can-copy="generatedNumbers.length > 0"
    :can-download="generatedNumbers.length > 0"
    :can-reset="true"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @copy="handleCopy"
    @download="handleDownload"
    @reset="handleReset"
    @sample="handleSample"
  >
    <template #icon>
      <NumberOutlined />
    </template>

    <div class="random-tool-layout">
      <!-- PANELS GRID -->
      <div class="random-panels-grid">
        <!-- CONFIGURATION PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[CONFIG] GENERATOR PARAMETERS</span>
          </div>
          <div class="panel-body">
            <div class="inputs-grid">
              <div class="input-item">
                <label>MINIMUM VALUE:</label>
                <a-input-number
                  v-model:value="minVal"
                  style="width: 100%"
                  @change="generateRandomNumbers"
                />
              </div>

              <div class="input-item">
                <label>MAXIMUM VALUE:</label>
                <a-input-number
                  v-model:value="maxVal"
                  style="width: 100%"
                  @change="generateRandomNumbers"
                />
              </div>

              <div class="input-item">
                <label>QUANTITY COUNT:</label>
                <a-input-number
                  v-model:value="count"
                  :min="1"
                  :max="1000"
                  style="width: 100%"
                  @change="generateRandomNumbers"
                />
              </div>

              <div class="input-item">
                <label>SORT ORDER:</label>
                <a-select
                  v-model:value="sortType"
                  style="width: 100%"
                  @change="generateRandomNumbers"
                >
                  <a-select-option value="none">None (Random Order)</a-select-option>
                  <a-select-option value="asc">Ascending (Smallest First)</a-select-option>
                  <a-select-option value="desc">Descending (Largest First)</a-select-option>
                </a-select>
              </div>
            </div>

            <div class="input-item">
              <label>EXCLUSIONS (COMMA/SPACE SEPARATED):</label>
              <a-input
                v-model:value="exclusionsText"
                placeholder="e.g. 7, 13, 42, 100"
                class="workbench-input"
                @input="generateRandomNumbers"
              />
            </div>

            <div class="options-checkbox-row">
              <a-checkbox v-model:checked="allowDuplicates" @change="generateRandomNumbers">
                ALLOW DUPLICATE NUMBERS
              </a-checkbox>

              <a-checkbox v-model:checked="isDecimal" @change="generateRandomNumbers">
                DECIMAL NUMBERS
              </a-checkbox>
            </div>

            <div v-if="isDecimal" class="input-item">
              <label>DECIMAL PLACES:</label>
              <a-input-number
                v-model:value="decimalPlaces"
                :min="1"
                :max="6"
                style="width: 140px"
                @change="generateRandomNumbers"
              />
            </div>

            <a-button type="primary" class="workbench-primary-btn" @click="generateRandomNumbers">
              <template #icon><ReloadOutlined /></template>
              GENERATE RANDOM NUMBERS
            </a-button>
          </div>
        </div>

        <!-- GENERATED NUMBERS PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[RESULT] GENERATED OUTPUT</span>
            <span v-if="generatedNumbers.length > 0" class="stats-pill">
              {{ generatedNumbers.length }} NUMBERS
            </span>
          </div>
          <div class="panel-body">
            <textarea
              :value="generatedNumbers.join(', ')"
              readonly
              rows="14"
              placeholder="(Generated numbers will render here...)"
              class="code-editor output-textarea"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useRandomNumberGenerator } from '../../composables/math/useRandomNumberGenerator';
import { NumberOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  minVal,
  maxVal,
  count,
  isDecimal,
  decimalPlaces,
  allowDuplicates,
  exclusionsText,
  sortType,
  generatedNumbers,
  generateRandomNumbers,
  handleSample,
  handleCopy,
  handleDownload,
  handleReset
} = useRandomNumberGenerator();

generateRandomNumbers();
</script>

<style scoped>
.random-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-family);
}

.random-panels-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 840px) {
  .random-panels-grid {
    grid-template-columns: 1fr;
  }
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
  justify-content: space-between;
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
  gap: 14px;
}

.inputs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.08em;
}

.options-checkbox-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.workbench-primary-btn {
  font-family: var(--font-family) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  height: 38px;
}

.code-editor {
  border: none !important;
  resize: vertical;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
  width: 100%;
  padding: 12px;
  font-family: var(--font-code) !important;
  font-size: 13px;
  line-height: 1.4;
  outline: none;
}

.output-textarea {
  cursor: default;
}
</style>
