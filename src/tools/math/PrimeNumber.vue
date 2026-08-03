<!--
/**
 * @file PrimeNumber.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Prime Number Checker & Generator tool component
 *
 * @description
 * Tests integer primality, displays prime factor breakdown, next/prev primes,
 * and generates prime number ranges using the Sieve of Eratosthenes.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <ToolCard
    id="prime-number"
    title="Prime Number Checker & Generator"
    description="Test integer primality, view prime factorizations, and generate prime number ranges."
    tier="Tier 1"
    :can-copy="!!checkResult || generatedPrimes.length > 0"
    :can-reset="true"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @copy="handleCopy"
    @reset="handleReset"
    @sample="handleSample"
  >
    <template #icon>
      <CheckCircleOutlined />
    </template>

    <div class="prime-tool-layout">
      <!-- PANELS GRID -->
      <div class="prime-panels-grid">
        <!-- PRIMALITY CHECKER PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[SINGLE_VAL] PRIMALITY CHECKER</span>
          </div>
          <div class="panel-body">
            <div class="input-row">
              <label>ENTER INTEGER TO TEST:</label>
              <a-input-number
                v-model:value="checkInput"
                :min="0"
                :max="999999999999"
                style="width: 100%"
                class="workbench-input"
                @change="evaluatePrime"
              />
            </div>

            <div v-if="checkResult" class="result-box" :class="{ 'is-prime': checkResult.isPrime }">
              <div class="status-stamp">
                <span v-if="checkResult.isPrime" class="stamp-prime">✓ PRIME NUMBER</span>
                <span v-else class="stamp-composite">✕ COMPOSITE NUMBER</span>
              </div>
              <p class="explanation-text">{{ checkResult.explanation }}</p>

              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-lbl">PRIME FACTORS:</span>
                  <span class="detail-val">{{ checkResult.factors.join(' × ') }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-lbl">PREVIOUS PRIME:</span>
                  <span class="detail-val">{{ checkResult.prevPrime ?? 'None' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-lbl">NEXT PRIME:</span>
                  <span class="detail-val">{{ checkResult.nextPrime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RANGE GENERATOR PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">[SIEVE_RANGE] PRIME GENERATOR</span>
            <span v-if="generatedPrimes.length > 0" class="stats-pill">
              {{ generatedPrimes.length }} PRIMES FOUND
            </span>
          </div>
          <div class="panel-body">
            <div class="range-inputs-grid">
              <div class="input-item">
                <label>START RANGE:</label>
                <a-input-number
                  v-model:value="rangeStart"
                  :min="1"
                  :max="500000"
                  style="width: 100%"
                />
              </div>
              <div class="input-item">
                <label>END RANGE:</label>
                <a-input-number
                  v-model:value="rangeEnd"
                  :min="1"
                  :max="500000"
                  style="width: 100%"
                />
              </div>
            </div>

            <a-button type="primary" class="workbench-primary-btn" @click="generatePrimeRange">
              <template #icon><ThunderboltOutlined /></template>
              GENERATE PRIMES
            </a-button>

            <div v-if="generatedPrimes.length > 0" class="primes-output-box">
              <textarea
                :value="generatedPrimes.join(', ')"
                readonly
                rows="8"
                class="code-editor output-textarea"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { usePrimeNumber } from '../../composables/math/usePrimeNumber';
import { CheckCircleOutlined, ThunderboltOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  checkInput,
  checkResult,
  rangeStart,
  rangeEnd,
  generatedPrimes,
  evaluatePrime,
  generatePrimeRange,
  handleSample,
  handleCopy,
  handleReset
} = usePrimeNumber();

evaluatePrime();
</script>

<style scoped>
.prime-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-family);
}

.prime-panels-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 840px) {
  .prime-panels-grid {
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

.input-row,
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

.range-inputs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.workbench-primary-btn {
  font-family: var(--font-family) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  height: 38px;
}

.result-box {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-stamp {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.stamp-prime {
  color: var(--success-color);
}

.stamp-composite {
  color: var(--error-color);
}

.explanation-text {
  font-size: 12px;
  color: var(--text-primary);
}

.details-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 6px;
  border-top: 1px dashed var(--border-color);
}

.detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
}

.detail-lbl {
  color: var(--text-secondary);
  font-weight: 700;
}

.detail-val {
  font-weight: 700;
  color: var(--text-primary);
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
