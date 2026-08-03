<!--
/**
 * @file Header.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Main navigation header bar with stamped brand title, hard-edged search modal, and theme toggle
 *
 * @description
 * Provides top navbar, quick global search modal with block cursor and <kbd> keycaps (Cmd+K / Ctrl+K),
 * dark/light theme switch, and brand navigation link.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <a-layout-header class="app-header">
    <div class="header-left">
      <button class="sidebar-toggle-btn" title="TOGGLE NAVIGATION MENU" @click="toggleSidebar">
        <MenuFoldOutlined v-if="!collapsed" />
        <MenuUnfoldOutlined v-else />
      </button>
      <router-link to="/" class="logo-link">
        <div class="logo-box">
          <ToolOutlined class="logo-icon" />
        </div>
        <div class="logo-text-wrap">
          <span class="logo-text">FREETOOLSHED</span>
          <span class="logo-sub">[CLIENT-SIDE WORKBENCH]</span>
        </div>
      </router-link>
    </div>

    <div class="header-center">
      <div class="search-trigger" @click="openSearchModal">
        <SearchOutlined class="search-trigger-icon" />
        <span class="search-trigger-text">SEARCH TOOLS...</span>
        <kbd class="hotkey-badge">{{ isMac ? '⌘K' : 'CTRL+K' }}</kbd>
      </div>
    </div>

    <div class="header-right">
      <a-tooltip :title="theme === 'dark' ? 'SWITCH TO LIGHT MODE' : 'SWITCH TO DARK MODE'">
        <a-button type="text" class="workbench-btn" @click="toggleTheme">
          <template #icon>
            <BulbFilled v-if="theme === 'dark'" style="color: #faad14" />
            <BulbOutlined v-else />
          </template>
          <span class="btn-label">{{ theme === 'dark' ? '[LIGHT]' : '[DARK]' }}</span>
        </a-button>
      </a-tooltip>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        title="Source Code"
      >
        <GithubOutlined />
      </a>
    </div>

    <!-- GLOBAL SEARCH MODAL (HARD-EDGED BENCH MODAL) -->
    <a-modal
      v-model:open="searchModalVisible"
      :footer="null"
      :closable="false"
      width="640px"
      class="hard-edged-search-modal"
      @after-close="searchQuery = ''"
    >
      <div class="modal-workbench-header">
        <span class="modal-title-stamp">[SEARCH_INDEX]</span>
        <kbd class="kbd-key" @click="searchModalVisible = false">ESC</kbd>
      </div>

      <div class="search-modal-input-wrap">
        <SearchOutlined class="search-modal-icon" />
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          placeholder="TYPE QUERY (e.g. JSON, JWT, REGEX, BASE64)..."
          class="search-modal-input block-cursor"
          @keydown.down.prevent="navigateResults(1)"
          @keydown.up.prevent="navigateResults(-1)"
          @keydown.enter.prevent="selectCurrentResult"
        />
      </div>

      <div class="search-results">
        <div v-if="filteredTools.length === 0" class="no-results">
          NO MATCHING TOOLS FOR "{{ searchQuery }}"
        </div>
        <div
          v-for="(tool, index) in filteredTools"
          :key="tool.id"
          :class="['pegboard-row', { active: index === selectedIndex }]"
          @click="selectTool(tool)"
          @mouseenter="selectedIndex = index"
        >
          <div class="pegboard-icon">
            <component :is="tool.icon" />
          </div>
          <div class="pegboard-info">
            <div class="pegboard-name">{{ tool.name }}</div>
            <div class="pegboard-desc">{{ tool.shortDesc || tool.description }}</div>
          </div>
          <div class="pegboard-cat-badge">
            {{ tool.category }}
          </div>
          <div class="pegboard-arrow">›</div>
        </div>
      </div>

      <div class="modal-workbench-footer">
        <span class="footer-hint"><kbd class="kbd-key">↑↓</kbd> NAVIGATE</span>
        <span class="footer-hint"><kbd class="kbd-key">↵</kbd> SELECT</span>
        <span class="footer-hint"><kbd class="kbd-key">ESC</kbd> CLOSE</span>
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
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue';
import { toolsRegistry, ToolItem } from '../router/toolsRegistry.js';
import { useSidebar } from '../composables/useSidebar.js';

// ---------- PROPS & EMITS
defineProps({
  theme: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['toggle-theme']);

// ---------- REACTIVE STATE
const router = useRouter();
const { collapsed, toggleSidebar } = useSidebar();
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
      t.shortDesc.toLowerCase().includes(q) ||
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

const selectTool = (tool: ToolItem) => {
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

// ---------- KEYBOARD SHORTCUT (CMD+K / CTRL+K)
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
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
  border-bottom: 2px solid var(--border-strong);
  height: 64px;
  line-height: 1.2;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: var(--font-family);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

.sidebar-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 16px;
  transition: none;
  flex-shrink: 0;
}

.sidebar-toggle-btn:hover {
  background: var(--invert-bg);
  color: var(--invert-text);
  border-color: var(--border-strong);
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  height: 100%;
}

.logo-box {
  width: 38px;
  height: 38px;
  background: var(--stamp-bg);
  color: var(--stamp-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1px solid var(--border-strong);
  flex-shrink: 0;
}

.logo-text-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
  line-height: 1;
  margin: 0;
  display: block;
}

.logo-sub {
  font-family: var(--font-family);
  font-size: 9px;
  color: var(--text-secondary);
  letter-spacing: 0.08em;
  line-height: 1;
  margin-top: 3px;
  display: block;
}

.header-center {
  flex: 1;
  max-width: 440px;
  margin: 0 16px;
  display: flex;
  justify-content: center;
}

.search-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-color);
  border: 1px solid var(--border-strong);
  padding: 6px 14px;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 12px;
  font-family: var(--font-family);
  font-weight: 600;
  transition: none;
  width: 100%;
  max-width: 320px;
  user-select: none;
}

.search-trigger:hover {
  background: var(--invert-bg);
  color: var(--invert-text);
}

.search-trigger:hover .search-trigger-icon,
.search-trigger:hover .search-trigger-text {
  color: var(--invert-text);
}

.search-trigger:hover .hotkey-badge {
  background: var(--invert-text);
  color: var(--invert-bg);
}

.hotkey-badge {
  margin-left: auto;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.workbench-btn {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  height: 34px;
  padding: 0 12px;
}

.workbench-btn:hover {
  background: var(--invert-bg) !important;
  color: var(--invert-text) !important;
  border-color: var(--border-strong) !important;
}

.github-link {
  font-size: 18px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--border-color);
}

.github-link:hover {
  background: var(--invert-bg);
  color: var(--invert-text);
}

/* HARD-EDGED SEARCH MODAL */
:deep(.hard-edged-search-modal) {
  max-width: calc(100vw - 24px) !important;
  margin: 12px auto !important;
}

:deep(.hard-edged-search-modal .ant-modal-content) {
  border: 2px solid var(--border-strong) !important;
  box-shadow: 6px 6px 0px var(--border-strong) !important;
  padding: 0 !important;
  background: var(--card-bg) !important;
}

.modal-workbench-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-color);
}

.modal-title-stamp {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;
}

.search-modal-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 2px solid var(--border-strong);
  background: var(--card-bg);
}

.search-modal-icon {
  font-size: 18px;
  color: var(--text-primary);
}

.search-modal-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  width: 100%;
}

.search-modal-input.block-cursor {
  caret-shape: block;
}

.search-results {
  max-height: 380px;
  overflow-y: auto;
}

.pegboard-info {
  flex: 1;
  min-width: 0;
}

.pegboard-name {
  font-weight: 700;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pegboard-desc {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pegboard-cat-badge {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  border: 1px solid var(--border-color);
  padding: 2px 6px;
  white-space: nowrap;
}

.pegboard-arrow {
  font-size: 16px;
  font-weight: 700;
  margin-left: 8px;
}

.pegboard-row.active {
  background: var(--invert-bg) !important;
  color: var(--invert-text) !important;
}

.pegboard-row.active .pegboard-icon,
.pegboard-row.active .pegboard-name,
.pegboard-row.active .pegboard-desc,
.pegboard-row.active .pegboard-cat-badge,
.pegboard-row.active .pegboard-arrow {
  color: var(--invert-text) !important;
  border-color: var(--invert-text) !important;
}

.no-results {
  padding: 32px;
  text-align: center;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.modal-workbench-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-color);
  font-size: 11px;
  color: var(--text-secondary);
  flex-wrap: wrap;
}

.footer-hint {
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 10px;
    height: 56px;
  }
  .logo-text {
    font-size: 17px;
  }
  .logo-sub {
    display: none;
  }
  .logo-box {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  .header-center {
    margin: 0 8px;
  }
  .search-trigger {
    padding: 6px 10px;
    width: auto;
  }
  .search-trigger-text,
  .hotkey-badge {
    display: none;
  }
  .btn-label {
    display: none;
  }
  .workbench-btn {
    padding: 0 8px;
    height: 32px;
  }
  .github-link {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  .sidebar-toggle-btn {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .logo-text-wrap {
    display: none;
  }
  .header-right {
    gap: 6px;
  }
}
</style>
