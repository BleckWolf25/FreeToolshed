<!--
/**
 * @file ToolCard.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Reusable wrapper component for tool pages with action toolbar, stamped title, favorite toggle, and layout container
 *
 * @description
 * Encloses individual tools within a consistent workbench layout displaying tool icon, stamped title, description,
 * tier badge, favorite button, copy output button, download button, and reset action with zero border radius.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <div class="tool-card-container">
    <!-- TOOL HEADER BAR -->
    <div class="tool-header">
      <div class="tool-title-section">
        <div class="tool-icon-wrapper">
          <slot name="icon">
            <ToolOutlined class="default-icon" />
          </slot>
        </div>
        <div class="tool-info">
          <div class="tool-title-row">
            <h1 class="tool-title">{{ title }}</h1>

            <a-popover
              v-if="faq.length || compatibility.length"
              placement="bottomLeft"
              trigger="hover"
              overlayClassName="tool-info-popover"
            >
              <template #content>
                <div class="tool-info-content">
                  <div v-if="compatibility && compatibility.length" class="compatibility-sec">
                    <h4>COMPATIBILITY</h4>
                    <div class="compat-tags">
                      <span v-for="c in compatibility" :key="c" class="category-pill">{{ c }}</span>
                    </div>
                  </div>
                  <div v-if="faq && faq.length" class="faq-sec">
                    <h4>FAQ</h4>
                    <a-collapse ghost accordion>
                      <a-collapse-panel v-for="(item, i) in faq" :key="i" :header="item.q">
                        <p>{{ item.a }}</p>
                      </a-collapse-panel>
                    </a-collapse>
                  </div>
                </div>
              </template>
              <a-button type="text" class="workbench-icon-btn">
                <template #icon><QuestionCircleOutlined /></template>
              </a-button>
            </a-popover>

            <span class="category-pill">{{ category }}</span>
            <a-tooltip :title="isFav ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'">
              <a-button type="text" class="workbench-icon-btn" @click="toggleFav">
                <template #icon>
                  <StarFilled v-if="isFav" style="color: #faad14" />
                  <StarOutlined v-else />
                </template>
              </a-button>
            </a-tooltip>
          </div>
          <p class="tool-description">{{ description }}</p>
        </div>
      </div>

      <!-- TOOL ACTIONS TOOLBAR -->
      <div class="tool-actions">
        <slot name="actions">
          <a-tooltip v-if="hasSample" title="LOAD SAMPLE DATA FOR TESTING">
            <a-button class="workbench-btn" @click="$emit('sample')">
              <template #icon><ExperimentOutlined /></template>
              SAMPLE
            </a-button>
          </a-tooltip>
          <a-tooltip v-if="canCopy" title="COPY OUTPUT TO CLIPBOARD">
            <a-button class="workbench-btn" @click="$emit('copy')">
              <template #icon><CopyOutlined /></template>
              COPY
            </a-button>
          </a-tooltip>
          <a-tooltip v-if="canDownload" title="DOWNLOAD OUTPUT FILE">
            <a-button class="workbench-btn" @click="$emit('download')">
              <template #icon><DownloadOutlined /></template>
              DOWNLOAD
            </a-button>
          </a-tooltip>
          <a-tooltip v-if="canReset" title="RESET TOOL INPUT">
            <a-button class="workbench-btn danger-btn" @click="$emit('reset')">
              <template #icon><ReloadOutlined /></template>
              RESET
            </a-button>
          </a-tooltip>
        </slot>
      </div>
    </div>

    <!-- MAIN TOOL CONTENT PANEL -->
    <div class="tool-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, onMounted, type PropType } from 'vue';
import {
  ToolOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DownloadOutlined,
  ReloadOutlined,
  QuestionCircleOutlined,
  ExperimentOutlined
} from '@ant-design/icons-vue';
import { storage } from '../utils/storage.js';

// ---------- PROPS & EMITS
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Formatters & Parsers'
  },
  canCopy: {
    type: Boolean,
    default: false
  },
  canDownload: {
    type: Boolean,
    default: false
  },
  canReset: {
    type: Boolean,
    default: false
  },
  hasSample: {
    type: Boolean,
    default: false
  },
  faq: {
    type: Array as PropType<{ q: string; a: string }[]>,
    default: () => []
  },
  compatibility: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

defineEmits(['copy', 'download', 'reset', 'sample']);

// ---------- REACTIVE STATE
const isFav = ref(false);

// ---------- METHODS
const toggleFav = () => {
  storage.toggleFavorite(props.id);
  isFav.value = storage.isFavorite(props.id);
};

onMounted(() => {
  isFav.value = storage.isFavorite(props.id);
  storage.addRecentTool(props.id);
});
</script>

<style scoped>
.tool-card-container {
  background: var(--card-bg);
  border: 2px solid var(--border-strong);
  padding: 24px;
  font-family: var(--font-family);
}

.tool-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.tool-title-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
  min-width: 280px;
}

.tool-icon-wrapper {
  width: 44px;
  height: 44px;
  background: var(--stamp-bg);
  color: var(--stamp-text);
  border: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.tool-info {
  flex: 1;
}

.tool-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.tool-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: 0.03em;
}

.workbench-icon-btn {
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 2px 8px;
}
.workbench-icon-btn:hover {
  background: var(--invert-bg) !important;
  color: var(--invert-text) !important;
}

.tool-info-content h4 {
  font-family: var(--font-display);
  margin: 0 0 8px 0;
  font-weight: 700;
  color: var(--text-primary);
}

.compatibility-sec {
  margin-bottom: 16px;
}

.compat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tool-description {
  color: var(--text-secondary);
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 0;
}

.tool-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.workbench-btn {
  font-family: var(--font-family);
  font-size: 11px;
  font-weight: 700;
  border: 1px solid var(--border-strong);
  background: var(--card-bg);
  color: var(--text-primary);
  height: 34px;
  padding: 0 12px;
  text-transform: uppercase;
}

.workbench-btn:hover {
  background: var(--invert-bg) !important;
  color: var(--invert-text) !important;
}

.danger-btn:hover {
  background: var(--error-color) !important;
  color: #ffffff !important;
  border-color: var(--error-color) !important;
}

.tool-body {
  width: 100%;
}
</style>
