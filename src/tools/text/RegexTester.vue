<!--
/**
 * @file RegexTester.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Regular Expression Tester & Evaluator tool component
 *
 * @description
 * Tests regex patterns against sample text in real-time, displaying match indices, capture groups, and flag controls.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="regex-tester"
    title="Regex Tester & Evaluator"
    description="Test Regular Expressions in real-time with capture group breakdown and preset cheat sheet."
    tier="Tier 2"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <ExperimentOutlined />
    </template>

    <div class="regex-tool-layout">
      <!-- PATTERN INPUT & FLAGS BAR -->
      <div class="regex-input-card">
        <div class="pattern-row">
          <span class="regex-slash">/</span>
          <a-input
            v-model:value="pattern"
            placeholder="Enter regular expression pattern (e.g. ([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}))"
            size="large"
            class="pattern-input text-mono"
            @input="testRegex"
          />
          <span class="regex-slash">/</span>
          <a-input
            v-model:value="flags"
            placeholder="gims"
            size="large"
            style="width: 80px"
            class="flags-input text-mono"
            @input="testRegex"
          />
        </div>

        <!-- PRESET PATTERNS DROPDOWN -->
        <div class="presets-row">
          <span>Presets Cheat Sheet:</span>
          <a-space wrap>
            <a-button
              v-for="p in PRESET_PATTERNS"
              :key="p.name"
              size="small"
              type="dashed"
              @click="loadPreset(p)"
            >
              {{ p.name }}
            </a-button>
          </a-space>
        </div>
      </div>

      <!-- ERROR ALERT -->
      <a-alert v-if="regexError" :message="regexError" type="error" show-icon />

      <!-- TEST TEXT INPUT & MATCH RESULTS -->
      <div class="editor-grid">
        <!-- TEST STRING INPUT -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Test String Input</span>
          </div>
          <a-textarea
            v-model:value="testText"
            placeholder="Paste text here to evaluate against regular expression..."
            :rows="10"
            class="code-editor"
            @input="testRegex"
          />
        </div>

        <!-- MATCH STATS & GROUPS -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">Match Analysis ({{ matchesList.length }} matches found)</span>
            <span v-if="executionTimeMs !== null" class="exec-time">{{ executionTimeMs }}ms</span>
          </div>

          <div class="matches-container">
            <div v-if="matchesList.length === 0" class="no-matches">No matches found.</div>
            <div v-else class="matches-list">
              <div v-for="(m, idx) in matchesList" :key="idx" class="match-item">
                <div class="match-item-header">
                  <a-tag color="blue">Match #{{ idx + 1 }}</a-tag>
                  <span class="match-index">Index: {{ m.index }}</span>
                </div>
                <div class="match-content text-mono">{{ m.match }}</div>
                <div v-if="m.groups.length > 0" class="groups-list">
                  <div v-for="(grp, gIdx) in m.groups" :key="gIdx" class="group-row">
                    <span class="group-num">Group ${{ gIdx + 1 }}:</span>
                    <span class="group-val text-mono">{{ grp || '(empty)' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useRegexTester } from '../../composables/text/useRegexTester';
import { ExperimentOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  pattern,
  flags,
  testText,
  matchesList,
  regexError,
  executionTimeMs,
  PRESET_PATTERNS,
  testRegex,
  loadPreset,
  handleReset
} = useRegexTester();
</script>

<style scoped>
.regex-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.regex-input-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pattern-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.regex-slash {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-secondary);
}

.presets-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;

  color: var(--text-secondary);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.matches-container {
  padding: 12px;
  max-height: 280px;
  overflow-y: auto;
}

.no-matches {
  text-align: center;
  color: var(--text-secondary);
  padding: 24px;
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.match-item {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 10px;
}

.match-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.match-index {
  font-size: 11px;
  color: var(--text-secondary);
}

.match-content {
  font-size: 13px;
  color: var(--primary-color);
  background: var(--bg-color);
  padding: 6px;
  border-radius: 4px;
  word-break: break-all;
}

.groups-list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px dashed var(--border-color);
  padding-top: 6px;
}

.group-row {
  display: flex;
  gap: 8px;
  font-size: 12px;
}

.group-num {
  color: var(--text-secondary);
}

.group-val {
  color: var(--text-primary);
}
</style>
