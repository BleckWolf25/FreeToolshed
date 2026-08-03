<!--
/**
 * @file UnixTimestamp.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unix Timestamp Converter & Date Formatter tool component
 *
 * @description
 * Converts Unix timestamps to human-readable date formats (UTC, ISO, Local) and date strings back to epoch timestamps.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="unix-timestamp"
    title="Unix Timestamp Converter"
    description="Convert Unix epoch timestamps (seconds & ms) to human dates, UTC, ISO 8601, and back."
    tier="Tier 3"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <ClockCircleOutlined />
    </template>

    <div class="timestamp-tool-layout">
      <!-- LIVE CURRENT TIMESTAMP BANNER -->
      <div class="live-ticker-card">
        <div class="ticker-item">
          <span class="ticker-label">CURRENT UNIX TIMESTAMP (SEC)</span>
          <span class="ticker-value text-mono">{{ currentSec }}</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-label">CURRENT UNIX TIMESTAMP (MS)</span>
          <span class="ticker-value text-mono">{{ currentMs }}</span>
        </div>
      </div>

      <!-- CONVERTER PANELS GRID -->
      <div class="converter-grid">
        <!-- TIMESTAMP TO DATE -->
        <div class="convert-card">
          <h3>Timestamp → Date</h3>
          <div class="input-group">
            <a-input
              v-model:value="tsInput"
              placeholder="Enter epoch timestamp (e.g. 1700000000)"
              size="large"
              class="text-mono"
              @input="convertTsToDate"
            />
            <a-radio-group v-model:value="tsUnit" @change="convertTsToDate">
              <a-radio value="s">Seconds</a-radio>
              <a-radio value="ms">Milliseconds</a-radio>
            </a-radio-group>
          </div>

          <a-descriptions v-if="tsResult" bordered size="small" :column="1" class="result-desc">
            <a-descriptions-item label="ISO 8601">{{ tsResult.iso }}</a-descriptions-item>
            <a-descriptions-item label="UTC String">{{ tsResult.utc }}</a-descriptions-item>
            <a-descriptions-item label="Local Date/Time">{{ tsResult.local }}</a-descriptions-item>
          </a-descriptions>
        </div>

        <!-- DATE TO TIMESTAMP -->
        <div class="convert-card">
          <h3>Date → Timestamp</h3>
          <div class="input-group">
            <a-input
              v-model:value="dateInput"
              placeholder="e.g. 2026-08-01 12:00:00 or ISO string"
              size="large"
              class="text-mono"
              @input="convertDateToTs"
            />
            <a-button type="default" @click="setNow">Use Current Time</a-button>
          </div>

          <a-descriptions v-if="dateResult" bordered size="small" :column="1" class="result-desc">
            <a-descriptions-item label="Timestamp (Seconds)">
              <span class="text-mono">{{ dateResult.sec }}</span>
              <a-button type="link" size="small" @click="copyVal(dateResult.sec)">Copy</a-button>
            </a-descriptions-item>
            <a-descriptions-item label="Timestamp (Milliseconds)">
              <span class="text-mono">{{ dateResult.ms }}</span>
              <a-button type="link" size="small" @click="copyVal(dateResult.ms)">Copy</a-button>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useUnixTimestamp } from '../../composables/web/useUnixTimestamp';
import { ClockCircleOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  currentSec,
  currentMs,
  tsInput,
  tsUnit,
  tsResult,
  dateInput,
  dateResult,
  convertTsToDate,
  convertDateToTs,
  setNow,
  copyVal,
  handleReset
} = useUnixTimestamp();
</script>

<style scoped>
.timestamp-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.live-ticker-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  text-align: center;
}

@media (max-width: 600px) {
  .live-ticker-card {
    grid-template-columns: 1fr;
  }
}

.ticker-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ticker-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}

.ticker-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
}

.converter-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .converter-grid {
    grid-template-columns: 1fr;
  }
}

.convert-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-desc {
  background: var(--card-bg);
}
</style>
