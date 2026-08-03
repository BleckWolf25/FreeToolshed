<!--
/**
 * @file ToolCard.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Reusable wrapper component for tool pages with action toolbar, title, favorite toggle, and layout container
 *
 * @description
 * Encloses individual tools within a consistent header layout displaying tool icon, title, description,
 * tier badge, favorite button, copy output button, download button, and reset action.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
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
                    <h4>Compatibility</h4>
                    <div class="compat-tags">
                      <a-tag v-for="c in compatibility" :key="c" color="green">{{ c }}</a-tag>
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
              <a-button type="text" shape="circle" class="info-btn">
                <template #icon><QuestionCircleOutlined /></template>
              </a-button>
            </a-popover>

            <a-tag :color="getCategoryColor(category)" class="tier-tag">{{ category }}</a-tag>
            <a-tooltip :title="isFav ? 'Remove from Favorites' : 'Add to Favorites'">
              <a-button type="text" shape="circle" class="fav-btn" @click="toggleFav">
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
          <a-tooltip v-if="hasSample" title="Load sample data for testing">
            <a-button type="dashed" @click="$emit('sample')">
              <template #icon><ExperimentOutlined /></template>
              Load Sample
            </a-button>
          </a-tooltip>
          <a-tooltip v-if="canCopy" title="Copy Output to Clipboard">
            <a-button type="default" @click="$emit('copy')">
              <template #icon><CopyOutlined /></template>
              Copy
            </a-button>
          </a-tooltip>
          <a-tooltip v-if="canDownload" title="Download Output File">
            <a-button type="default" @click="$emit('download')">
              <template #icon><DownloadOutlined /></template>
              Download
            </a-button>
          </a-tooltip>
          <a-tooltip v-if="canReset" title="Reset Tool Input">
            <a-button type="text" danger @click="$emit('reset')">
              <template #icon><ReloadOutlined /></template>
              Reset
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

const emit = defineEmits(['copy', 'download', 'reset', 'sample']);

// ---------- REACTIVE STATE
const isFav = ref(false);

// ---------- METHODS
const toggleFav = () => {
  storage.toggleFavorite(props.id);
  isFav.value = storage.isFavorite(props.id);
};

const getCategoryColor = (c: any) => {
  switch (c) {
    case 'Formatters & Parsers':
      return 'blue';
    case 'Encoders & Decoders':
      return 'green';
    case 'Generators':
      return 'orange';
    case 'Text & Code':
      return 'purple';
    case 'Web & Misc':
      return 'magenta';
    default:
      return 'default';
  }
};

onMounted(() => {
  isFav.value = storage.isFavorite(props.id);
  storage.addRecentTool(props.id);
});
</script>

<style scoped>
.tool-card-container {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
  border-radius: 10px;
  background: rgba(24, 144, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
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
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.tool-title {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.2;
}

.info-btn {
  color: var(--text-secondary);
  opacity: 0.7;
}
.info-btn:hover {
  opacity: 1;
  color: #1890ff;
}

.tool-info-popover .tool-info-content {
  max-width: 320px;
}
.tool-info-content h4 {
  margin: 0 0 8px 0;
  font-weight: 600;
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
.faq-sec :deep(.ant-collapse-header) {
  padding-left: 0;
  padding-right: 0;
}
.faq-sec :deep(.ant-collapse-content-box) {
  padding-left: 0;
  padding-right: 0;
  color: var(--text-secondary);
}

.tier-tag {
  font-size: 11px;
}

.fav-btn {
  font-size: 16px;
}

.tool-description {
  color: var(--text-secondary);
  font-size: 13px;
  margin-top: 4px;
  margin-bottom: 0;
}

.tool-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tool-body {
  width: 100%;
}
</style>
