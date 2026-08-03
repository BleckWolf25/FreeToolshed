<!--
/**
 * @file PasswordGenerator.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Secure Random Password & Passphrase Generator tool component
 *
 * @description
 * Generates secure passwords and memorable passphrases with length, character set, and strength indicators.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="password-generator"
    title="Strong Password Generator"
    description="Generate secure random passwords with configurable length, character sets, and strength scoring."
    tier="Tier 1"
    :can-copy="!!password"
    :can-reset="true"
    @copy="copyPrimary"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <KeyOutlined />
    </template>

    <div class="pass-tool-layout">
      <!-- MAIN PASSWORD DISPLAY -->
      <div class="primary-password-card">
        <div class="password-text">{{ password }}</div>
        <a-space>
          <a-button type="primary" size="large" @click="generateNewPassword">
            <template #icon><ReloadOutlined /></template>
            Regenerate
          </a-button>
          <a-button size="large" @click="copyPrimary">
            <template #icon><CopyOutlined /></template>
            Copy
          </a-button>
        </a-space>
      </div>

      <!-- STRENGTH METER BAR -->
      <div class="strength-bar-section">
        <div class="strength-label-row">
          <span>Password Strength:</span>
          <strong :style="{ color: strengthInfo.color }">{{ strengthInfo.text }}</strong>
        </div>
        <a-progress
          :percent="strengthInfo.score"
          :stroke-color="strengthInfo.color"
          :show-info="false"
        />
      </div>

      <!-- OPTIONS CONFIGURATION -->
      <div class="config-card">
        <h3>Configuration Options</h3>

        <div class="config-item">
          <div class="config-label">
            <span>Password Length:</span>
            <strong>{{ options.length }} characters</strong>
          </div>
          <a-slider
            v-model:value="options.length"
            :min="6"
            :max="64"
            @change="generateNewPassword"
          />
        </div>

        <div class="switches-grid">
          <div class="switch-row">
            <a-switch v-model:checked="options.uppercase" @change="generateNewPassword" />
            <span>Include Uppercase (A-Z)</span>
          </div>
          <div class="switch-row">
            <a-switch v-model:checked="options.lowercase" @change="generateNewPassword" />
            <span>Include Lowercase (a-z)</span>
          </div>
          <div class="switch-row">
            <a-switch v-model:checked="options.numbers" @change="generateNewPassword" />
            <span>Include Numbers (0-9)</span>
          </div>
          <div class="switch-row">
            <a-switch v-model:checked="options.symbols" @change="generateNewPassword" />
            <span>Include Symbols (!@#$%^&*)</span>
          </div>
          <div class="switch-row">
            <a-switch v-model:checked="options.excludeAmbiguous" @change="generateNewPassword" />
            <span>Exclude Ambiguous (i, l, 1, O, 0)</span>
          </div>
        </div>
      </div>

      <!-- BATCH GENERATION SECTION -->
      <div class="batch-card">
        <div class="batch-header">
          <h3>Batch Generation</h3>
          <a-button type="default" size="small" @click="generateBatch">
            Generate 5 Passwords
          </a-button>
        </div>
        <div v-if="batchList.length > 0" class="batch-list">
          <div v-for="(p, i) in batchList" :key="i" class="batch-item">
            <span class="batch-text">{{ p }}</span>
            <a-button type="link" size="small" @click="copyBatchItem(p)">
              <template #icon><CopyOutlined /></template>
              Copy
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { usePasswordGenerator } from '../../composables/generators/usePasswordGenerator';
import { KeyOutlined, ReloadOutlined, CopyOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  password,
  batchList,
  options,
  strengthInfo,
  generateNewPassword,
  generateBatch,
  copyPrimary,
  copyBatchItem,
  handleReset
} = usePasswordGenerator();
</script>

<style scoped>
.pass-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.primary-password-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.password-text {
  font-family: var(--font-code);
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  word-break: break-all;
}

.strength-bar-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.strength-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;

  color: var(--text-secondary);
}

.config-card,
.batch-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.config-label {
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  color: var(--text-primary);
}

.switches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.switch-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-primary);
}

.batch-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.batch-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.batch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px 12px;
}

.batch-text {
  font-family: var(--font-code);
  font-size: 14px;
  color: var(--text-primary);
}
</style>
