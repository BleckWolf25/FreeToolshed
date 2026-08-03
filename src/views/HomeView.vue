<!--
/**
 * @file HomeView.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Home view component displaying the tool selection dashboard with search and category filtering
 *
 * @description
 * Provides a landing page for FreeToolshed.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
-->
<template>
  <div class="home-container">
    <!-- HERO SECTION -->
    <div class="hero-card">
      <h1 class="hero-title">FreeToolshed</h1>
      <p class="hero-subtitle">
        Lightweight, zero-ad, client-side utilities for developers. Fast, private, and 100%
        offline-ready.
      </p>

      <div class="search-filter-bar">
        <a-input-search
          v-model:value="searchFilter"
          placeholder="Filter tools by keyword (e.g. JSON, JWT, Hash, Base64, Regex, QR)..."
          size="large"
          allow-clear
          class="hero-search-input"
        >
          <template #prefix><SearchOutlined /></template>
        </a-input-search>
      </div>

      <div class="stats-row">
        <div class="stat-badge">
          <span class="stat-num">21</span>
          <span class="stat-lbl">Developer Tools</span>
        </div>
        <div class="stat-badge">
          <span class="stat-num">0</span>
          <span class="stat-lbl">Backend Calls</span>
        </div>
        <div class="stat-badge">
          <span class="stat-num">100%</span>
          <span class="stat-lbl">Client Side</span>
        </div>
      </div>
    </div>

    <!-- RECENTLY & FAVORITE TOOLS -->
    <div v-if="favoriteTools.length > 0" class="section-container">
      <h2 class="section-title">
        <StarFilled style="color: #faad14; margin-right: 8px" />
        Favorite Tools
      </h2>
      <div class="tools-grid">
        <div
          v-for="tool in favoriteTools"
          :key="tool.id"
          class="grid-tool-card"
          @click="navigateTo(tool.path)"
        >
          <div class="grid-tool-header">
            <div class="grid-tool-icon">
              <component :is="tool.icon" />
            </div>
            <a-tag :color="getCategoryColor(tool.category)">{{ tool.category }}</a-tag>
          </div>
          <h3 class="grid-tool-name">{{ tool.name }}</h3>
          <p class="grid-tool-desc">{{ tool.description }}</p>
        </div>
      </div>
    </div>

    <!-- DYNAMIC CATEGORY GRIDS -->
    <template v-for="cat in categories" :key="cat.name">
      <div v-if="getToolsByCategory(cat.name).length > 0" class="section-container">
        <h2 class="section-title">
          <component :is="cat.icon" :style="{ color: cat.hex, marginRight: '8px' }" />
          {{ cat.name }}
        </h2>
        <div class="tools-grid">
          <div
            v-for="tool in getToolsByCategory(cat.name)"
            :key="tool.id"
            class="grid-tool-card"
            @click="navigateTo(tool.path)"
          >
            <div class="grid-tool-header">
              <div class="grid-tool-icon">
                <component :is="tool.icon" />
              </div>
              <a-tag :color="cat.color">{{ cat.name }}</a-tag>
            </div>
            <h3 class="grid-tool-name">{{ tool.name }}</h3>
            <p class="grid-tool-desc">{{ tool.description }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, computed } from 'vue';
import { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric, useRouter } from 'vue-router';
import {
  SearchOutlined,
  StarFilled,
  CodeOutlined,
  RetweetOutlined,
  FireOutlined,
  FormOutlined,
  ToolOutlined
} from '@ant-design/icons-vue';
import { toolsRegistry } from '../router/toolsRegistry.js';
import { storage } from '../utils/storage.js';

// ---------- REACTIVE STATE
const router = useRouter();
const searchFilter = ref('');

const categories = [
  { name: 'Formatters & Parsers', icon: CodeOutlined, color: 'blue', hex: '#1890ff' },
  { name: 'Encoders & Decoders', icon: RetweetOutlined, color: 'green', hex: '#52c41a' },
  { name: 'Generators', icon: FireOutlined, color: 'orange', hex: '#fa8c16' },
  { name: 'Text & Code', icon: FormOutlined, color: 'purple', hex: '#722ed1' },
  { name: 'Web & Misc', icon: ToolOutlined, color: 'magenta', hex: '#eb2f96' }
];

// ---------- COMPUTED PROPERTIES
const filterTools = (tools: any[]) => {
  if (!searchFilter.value.trim()) return tools;
  const q = searchFilter.value.toLowerCase();
  return tools.filter(
    (t: { name: string; description: string; tags: any[] }) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag: string) => tag.toLowerCase().includes(q))
  );
};

const favoriteTools = computed(() => {
  const favIds = storage.getFavorites();
  return toolsRegistry.filter((t) => favIds.includes(t.id));
});

const getToolsByCategory = (catName: string) => {
  return filterTools(toolsRegistry.filter((t: any) => t.category === catName));
};

// ---------- METHODS
const navigateTo = (path: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) => {
  router.push(path).catch((e) => console.error('ROUTER ERROR:', e));
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
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero-card {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border-radius: 16px;
  padding: 40px;
  color: #ffffff;
  text-align: center;
  box-shadow: 0 8px 24px rgba(24, 144, 255, 0.25);
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #ffffff;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 24px auto;
}

.search-filter-bar {
  max-width: 640px;
  margin: 0 auto 24px auto;
}

.hero-search-input :deep(.ant-input) {
  border-radius: 10px;
  padding-left: 12px;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.stat-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
}

.stat-lbl {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
}

.section-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  margin: 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.grid-tool-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.grid-tool-card:hover {
  transform: translateY(-3px);
  border-color: #1890ff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.grid-tool-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.grid-tool-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.grid-tool-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 6px 0;
}

.grid-tool-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
  flex: 1;
}
</style>
