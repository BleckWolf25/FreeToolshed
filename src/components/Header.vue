<!--
/**
 * @file Header.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Main navigation header bar with brand title, search modal, and theme toggle
 *
 * @description
 * Provides top navbar, quick global search modal with keyboard shortcut (Cmd+K / Ctrl+K),
 * dark/light theme switch, and brand navigation link.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
-->
<template>
  <a-layout-header class="app-header">
    <div class="header-left">
      <router-link to="/" class="logo-link">
        <div class="logo-box">
          <ToolOutlined class="logo-icon" />
        </div>
        <span class="logo-text">FreeToolshed</span>
        <a-tag color="blue" class="logo-badge">Client-Side</a-tag>
      </router-link>
    </div>

    <div class="header-center">
      <div class="search-trigger" @click="openSearchModal">
        <SearchOutlined />
        <span>Search tools...</span>
        <kbd class="hotkey-badge">{{ isMac ? '⌘K' : 'Ctrl+K' }}</kbd>
      </div>
    </div>

    <div class="header-right">
      <a-tooltip :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <a-button type="text" shape="circle" class="theme-toggle-btn" @click="toggleTheme">
          <template #icon>
            <BulbFilled v-if="theme === 'dark'" style="color: #faad14" />
            <BulbOutlined v-else />
          </template>
        </a-button>
      </a-tooltip>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="github-link">
        <GithubOutlined />
      </a>
    </div>

    <!-- GLOBAL SEARCH MODAL -->
    <a-modal
      v-model:open="searchModalVisible"
      :footer="null"
      :closable="false"
      width="600px"
      class="search-modal"
      @after-close="searchQuery = ''"
    >
      <div class="search-modal-input-wrap">
        <SearchOutlined class="search-modal-icon" />
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          placeholder="Type to search tools (e.g. JSON, JWT, Regex, Base64)..."
          class="search-modal-input"
          @keydown.down.prevent="navigateResults(1)"
          @keydown.up.prevent="navigateResults(-1)"
          @keydown.enter.prevent="selectCurrentResult"
        />
      </div>

      <div class="search-results">
        <div v-if="filteredTools.length === 0" class="no-results">
          No tools matching "{{ searchQuery }}"
        </div>
        <div
          v-for="(tool, index) in filteredTools"
          :key="tool.id"
          :class="['search-item', { active: index === selectedIndex }]"
          @click="selectTool(tool)"
          @mouseenter="selectedIndex = index"
        >
          <div class="search-item-icon">
            <component :is="tool.icon" />
          </div>
          <div class="search-item-info">
            <div class="search-item-name">{{ tool.name }}</div>
            <div class="search-item-desc">{{ tool.description }}</div>
          </div>
          <a-tag :color="getCategoryColor(tool.category)">{{ tool.category }}</a-tag>
        </div>
      </div>
    </a-modal>
  </a-layout-header>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import {
  ToolOutlined,
  SearchOutlined,
  BulbOutlined,
  BulbFilled,
  GithubOutlined
} from '@ant-design/icons-vue';
import { toolsRegistry } from '../router/toolsRegistry.js';

// ---------- PROPS & EMITS
const props = defineProps({
  theme: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['toggle-theme']);

// ---------- REACTIVE STATE
const router = useRouter();
const searchModalVisible = ref(false);
const searchQuery = ref('');
const selectedIndex = ref(0);
const searchInputRef = ref<HTMLInputElement | null>(null);
const isMac = ref(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

// ---------- COMPUTED PROPERTIES
const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) return toolsRegistry.slice(0, 8);
  const q = searchQuery.value.toLowerCase();
  return toolsRegistry.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
});

// ---------- METHODS
const toggleTheme = () => {
  emit('toggle-theme');
};

const openSearchModal = () => {
  searchModalVisible.value = true;
  selectedIndex.value = 0;
  nextTick(() => {
    if (searchInputRef.value) {
      searchInputRef.value.focus();
    }
  });
};

const selectTool = (tool: any) => {
  searchModalVisible.value = false;
  router.push(tool.path);
};

const navigateResults = (direction: number) => {
  if (filteredTools.value.length === 0) return;
  selectedIndex.value =
    (selectedIndex.value + direction + filteredTools.value.length) % filteredTools.value.length;
};

const selectCurrentResult = () => {
  if (filteredTools.value.length > 0 && selectedIndex.value < filteredTools.value.length) {
    selectTool(filteredTools.value[selectedIndex.value]);
  }
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

// ---------- KEYBOARD SHORTCUT (CMD+K / CTRL+K)
const handleKeyDown = (e: {
  metaKey: any;
  ctrlKey: any;
  key: string;
  preventDefault: () => void;
}) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.logo-badge {
  font-size: 10px;
  line-height: 14px;
}

.header-center {
  flex: 1;
  max-width: 420px;
  margin: 0 24px;
}

.search-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 6px 12px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  width: 250px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);
}

.search-trigger:hover {
  border-color: #1890ff;
  color: var(--text-primary);
  background: var(--card-bg);
}

.hotkey-badge {
  margin-left: auto;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  color: var(--text-secondary);
  font-family: inherit;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle-btn {
  font-size: 18px;
}

.github-link {
  font-size: 20px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

/* SEARCH MODAL STYLES */
.search-modal-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.search-modal-icon {
  font-size: 18px;
  color: var(--text-secondary);
}

.search-modal-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: var(--text-primary);
}

.search-results {
  max-height: 380px;
  overflow-y: auto;
  padding: 8px;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.search-item.active {
  background: var(--bg-color);
}

.search-item-icon {
  font-size: 18px;
  color: #1890ff;
}

.search-item-info {
  flex: 1;
}

.search-item-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.search-item-desc {
  font-size: 12px;
  color: var(--text-secondary);
}

.no-results {
  padding: 24px;
  text-align: center;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }
  .logo-text,
  .logo-badge {
    display: none;
  }
  .search-trigger {
    width: auto;
    min-width: 40px;
    justify-content: center;
    padding: 0 8px;
  }
  .search-trigger span,
  .hotkey-badge {
    display: none;
  }
  .header-left,
  .header-right {
    flex: none;
  }
  .header-center {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
</style>
