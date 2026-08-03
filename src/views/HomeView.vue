<!--
/**
 * @file HomeView.vue
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Home view component displaying the brutalist "Pegboard Index" tool dashboard
 *
 * @description
 * Replaces traditional card grids with a high-density, brutalist pegboard index. Features
 * full-width category rows, stamped Oswald section headers, dense tool line-items with 3-word
 * concise summaries, and zero-delay mechanical color inversion on hover.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <div class="home-container">
    <!-- BLUEPRINT HERO BENCH -->
    <div class="hero-bench dot-grid-bg">
      <div class="hero-stamp-box">
        <span class="hero-tag">[SPEC_V1.0.0]</span>
        <h1 class="hero-title">FREETOOLSHED WORKBENCH</h1>
        <p class="hero-subtitle">
          LIGHTWEIGHT, NO-SERVER, UTILITIES · FAST, PRIVATE, AND 100% OFFLINE-READY
        </p>
      </div>

      <div class="search-filter-bar">
        <div class="search-input-wrap">
          <SearchOutlined class="search-icon" />
          <input
            v-model="searchFilter"
            type="text"
            placeholder="FILTER INDEX BY KEYWORD (e.g. JSON, JWT, HASH, BASE64, REGEX)..."
            class="hero-search-input block-cursor"
          />
          <kbd v-if="searchFilter" class="clear-btn" @click="searchFilter = ''">CLEAR</kbd>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-badge">
          <span class="stat-num">[{{ totalToolsCount }}]</span>
          <span class="stat-lbl">TOTAL TOOLS</span>
        </div>
        <div class="stat-divider">|</div>
        <div class="stat-badge">
          <span class="stat-num">[0]</span>
          <span class="stat-lbl">BACKEND CALLS</span>
        </div>
        <div class="stat-divider">|</div>
        <div class="stat-badge">
          <span class="stat-num">[100%]</span>
          <span class="stat-lbl">CLIENT SIDE</span>
        </div>
      </div>
    </div>

    <!-- FAVORITE TOOLS PEGBOARD -->
    <div v-if="favoriteTools.length > 0" class="section-container">
      <div class="stamp-heading">
        <StarFilled style="color: #faad14; margin-right: 8px" />
        <h2>[-] FAVORITE TOOLS</h2>
        <div class="stamp-heading-rule"></div>
        <span class="category-pill">[{{ favoriteTools.length }}]</span>
      </div>

      <div class="pegboard-index">
        <div
          v-for="tool in favoriteTools"
          :key="tool.id"
          class="pegboard-row"
          @click="navigateTo(tool.path)"
        >
          <div class="pegboard-icon">
            <component :is="tool.icon" />
          </div>
          <div class="pegboard-name">{{ tool.name }}</div>
          <div class="pegboard-dot">·</div>
          <div class="pegboard-desc">{{ tool.shortDesc || tool.description }}</div>
          <div class="pegboard-arrow">›</div>
        </div>
      </div>
    </div>

    <!-- FULL-WIDTH CATEGORY PEGBOARD ROWS -->
    <template v-for="cat in categories" :key="cat.name">
      <div v-if="getToolsByCategory(cat.name).length > 0" class="section-container">
        <div class="stamp-heading">
          <h2>[-] {{ cat.name }}</h2>
          <div class="stamp-heading-rule"></div>
          <span class="category-pill">[{{ getToolsByCategory(cat.name).length }} TOOLS]</span>
        </div>

        <div class="pegboard-index">
          <div
            v-for="tool in getToolsByCategory(cat.name)"
            :key="tool.id"
            class="pegboard-row"
            @click="navigateTo(tool.path)"
          >
            <div class="pegboard-icon">
              <component :is="tool.icon" />
            </div>
            <div class="pegboard-name">{{ tool.name }}</div>
            <div class="pegboard-dot">·</div>
            <div class="pegboard-desc">{{ tool.shortDesc || tool.description }}</div>
            <div class="pegboard-arrow">›</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  SearchOutlined,
  StarFilled,
  CodeOutlined,
  RetweetOutlined,
  FireOutlined,
  FormOutlined,
  ToolOutlined,
  CalculatorOutlined
} from '@ant-design/icons-vue';
import { toolsRegistry, ToolItem } from '../router/toolsRegistry.js';
import { storage } from '../utils/storage.js';

// ---------- REACTIVE STATE
const router = useRouter();
const searchFilter = ref('');

const categories = [
  { name: 'MATHEMATICS', icon: CalculatorOutlined },
  { name: 'FORMATTERS & PARSERS', icon: CodeOutlined },
  { name: 'ENCODERS & DECODERS', icon: RetweetOutlined },
  { name: 'GENERATORS', icon: FireOutlined },
  { name: 'TEXT & CODE', icon: FormOutlined },
  { name: 'WEB & MISC', icon: ToolOutlined }
];

// Map categories to tool category strings
const categoryMap: Record<string, string> = {
  MATHEMATICS: 'Mathematics',
  'FORMATTERS & PARSERS': 'Formatters & Parsers',
  'ENCODERS & DECODERS': 'Encoders & Decoders',
  GENERATORS: 'Generators',
  'TEXT & CODE': 'Text & Code',
  'WEB & MISC': 'Web & Misc'
};

// ---------- COMPUTED PROPERTIES
const totalToolsCount = computed(() => toolsRegistry.length);

const filterTools = (tools: ToolItem[]) => {
  if (!searchFilter.value.trim()) return tools;
  const q = searchFilter.value.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
};

const favoriteTools = computed(() => {
  const favIds = storage.getFavorites();
  return filterTools(toolsRegistry.filter((t) => favIds.includes(t.id)));
});

const getToolsByCategory = (catDisplayName: string) => {
  const registryCategory = categoryMap[catDisplayName] || catDisplayName;
  return filterTools(toolsRegistry.filter((t) => t.category === registryCategory));
};

// ---------- METHODS
const navigateTo = (path: string) => {
  router.push(path).catch((e) => console.error('ROUTER ERROR:', e));
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 36px;
  font-family: var(--font-family);
}

.hero-bench {
  background: var(--card-bg);
  border: 2px solid var(--border-strong);
  padding: 36px 32px;
  text-align: center;
}

.hero-stamp-box {
  margin-bottom: 24px;
}

.hero-tag {
  font-family: var(--font-family);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.1em;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 6px 0;
  color: var(--text-primary);
}

.hero-subtitle {
  font-family: var(--font-family);
  font-size: 12px;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  max-width: 680px;
  margin: 0 auto;
}

.search-filter-bar {
  max-width: 680px;
  margin: 0 auto 24px auto;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-strong);
  padding: 10px 16px;
}

.search-icon {
  font-size: 16px;
  color: var(--text-primary);
}

.hero-search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
}

.clear-btn {
  cursor: pointer;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: var(--font-family);
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-num {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
}

.stat-lbl {
  font-size: 11px;
  color: var(--text-secondary);
}

.stat-divider {
  color: var(--border-color);
}

.section-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pegboard-index {
  border: 1px solid var(--border-strong);
  display: flex;
  flex-direction: column;
}

.pegboard-icon {
  font-size: 18px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
}

.pegboard-name {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: var(--text-primary);
}

.pegboard-dot {
  color: var(--toolbox-grey);
  font-weight: 700;
}

.pegboard-desc {
  font-family: var(--font-family);
  font-size: 12px;
  color: var(--toolbox-grey);
  flex: 1;
}

.pegboard-arrow {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .hero-bench {
    padding: 24px 16px;
  }
  .hero-title {
    font-size: 28px;
  }
  .stats-row {
    flex-direction: column;
    gap: 8px;
  }
  .stat-divider {
    display: none;
  }
  .pegboard-row {
    flex-wrap: wrap;
    gap: 8px;
  }
  .pegboard-dot,
  .pegboard-desc {
    width: 100%;
  }
}
</style>
