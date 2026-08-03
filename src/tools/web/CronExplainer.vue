<!--
/**
 * @file CronExplainer.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Cron Expression Parser & Explainer tool component
 *
 * @description
 * Parses cron expressions into human-readable sentences and calculates upcoming execution times.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="cron-explainer"
    title="Cron Expression Explainer"
    description="Parse cron schedules into plain human-readable sentences and view upcoming execution dates."
    tier="Tier 3"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <ScheduleOutlined />
    </template>

    <div class="cron-tool-layout">
      <!-- INPUT BAR & PRESETS -->
      <div class="cron-input-card">
        <label>Cron Expression (5-6 fields):</label>
        <div class="input-row">
          <a-input
            v-model:value="cronExpression"
            placeholder="e.g. */5 * * * * or 0 9 * * 1-5"
            size="large"
            class="cron-input text-mono"
            @input="parseCron"
          />
          <a-button type="primary" size="large" @click="parseCron">Parse Schedule</a-button>
        </div>

        <div class="presets-row">
          <span>Popular Presets:</span>
          <a-space wrap>
            <a-button
              v-for="p in PRESETS"
              :key="p.exp"
              size="small"
              type="dashed"
              @click="loadPreset(p.exp)"
            >
              {{ p.label }} ({{ p.exp }})
            </a-button>
          </a-space>
        </div>
      </div>

      <!-- ERROR CALLOUT -->
      <a-alert v-if="cronError" :message="cronError" type="error" show-icon />

      <!-- PARSED EXPLANATION CARD -->
      <div v-if="humanExplanation" class="explanation-card">
        <div class="explanation-header">
          <span class="exp-title">Human Readable Explanation</span>
        </div>
        <div class="explanation-text">{{ humanExplanation }}</div>
      </div>

      <!-- UPCOMING EXECUTIONS -->
      <div v-if="nextDates.length > 0" class="next-dates-card">
        <h3>Next 5 Scheduled Executions</h3>
        <a-list size="small" bordered :data-source="nextDates">
          <template #renderItem="{ item, index }">
            <a-list-item>
              <a-space>
                <a-tag color="blue">#{{ index + 1 }}</a-tag>
                <span class="text-mono">{{ item }}</span>
              </a-space>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useCronExplainer } from '../../composables/web/useCronExplainer';
import { ScheduleOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  cronExpression,
  humanExplanation,
  cronError,
  nextDates,
  PRESETS,
  parseCron,
  loadPreset,
  handleReset
} = useCronExplainer();
</script>

<style scoped>
.cron-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cron-input-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-row {
  display: flex;
  gap: 12px;
}

.cron-input {
  font-size: 18px;
}

.presets-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--text-secondary);
  flex-wrap: wrap;
}

.explanation-card {
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.08) 0%, rgba(9, 109, 217, 0.08) 100%);
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  padding: 20px;
}

.exp-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.explanation-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 4px;
}

.next-dates-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
