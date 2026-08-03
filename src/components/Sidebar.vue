<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="270"
    breakpoint="lg"
    :collapsed-width="0"
    theme="light"
    class="app-sidebar"
    collapsible
  >
    <div class="sidebar-inner">
      <div class="sidebar-header">
        <span class="sidebar-header-title">[INDEX_TREE]</span>
      </div>

      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        class="sidebar-menu"
      >
        <!-- HOME / INDEX LINK -->
        <a-menu-item key="home" class="tree-home-item" @click="navigateTo('/')">
          <template #icon><HomeOutlined /></template>
          <span class="tree-label">[00] INDEX OVERVIEW</span>
        </a-menu-item>

        <div class="menu-divider"></div>

        <!-- TREE CATEGORIES -->
        <a-sub-menu v-for="cat in categories" :key="cat.name" class="tree-sub-menu">
          <template #title>
            <div class="category-header-row">
              <span class="tree-toggle-prefix">
                {{ openKeys.includes(cat.name) ? '[-]' : '[+]' }}
              </span>
              <span class="category-name">{{ cat.shortName || cat.name }}</span>
              <span class="category-count">[{{ getToolsByCategory(cat.name).length }}]</span>
            </div>
          </template>

          <a-menu-item
            v-for="(tool, index) in getToolsByCategory(cat.name)"
            :key="tool.id"
            class="tree-tool-item"
            @click="navigateTo(tool.path)"
          >
            <template #icon>
              <span class="tree-branch">{{
                index === getToolsByCategory(cat.name).length - 1 ? '└─' : '├─'
              }}</span>
            </template>
            <span class="tool-name">{{ tool.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HomeOutlined } from '@ant-design/icons-vue';
import { toolsRegistry } from '../router/toolsRegistry.js';

// ---------- REACTIVE STATE
const route = useRoute();
const router = useRouter();
const collapsed = ref(false);
const selectedKeys = ref<string[]>([]);

const categories = [
  { name: 'Formatters & Parsers', shortName: 'FORMATTERS' },
  { name: 'Encoders & Decoders', shortName: 'ENCODERS' },
  { name: 'Generators', shortName: 'GENERATORS' },
  { name: 'Text & Code', shortName: 'TEXT & CODE' },
  { name: 'Web & Misc', shortName: 'WEB & MISC' }
];

const openKeys = ref<string[]>(categories.map((c) => c.name));

// ---------- COMPUTED TOOL GROUPS
const getToolsByCategory = (catName: string) => {
  return toolsRegistry.filter((t) => t.category === catName);
};

// ---------- ROUTE WATCHER FOR MENU HIGHLIGHT
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      selectedKeys.value = ['home'];
    } else {
      const tool = toolsRegistry.find((t) => t.path === newPath);
      if (tool) {
        selectedKeys.value = [tool.id];
      }
    }
  },
  { immediate: true }
);

// ---------- METHODS
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.app-sidebar {
  border-right: 1px solid var(--border-color);
  background: var(--card-bg) !important;
  font-family: var(--font-family);
}

.sidebar-inner {
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 12px 0;
}

.sidebar-header {
  padding: 8px 16px 12px 16px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 8px;
}

.sidebar-header-title {
  font-family: var(--font-family);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.sidebar-menu {
  border-right: none !important;
  background: transparent !important;
  font-family: var(--font-family) !important;
}

.menu-divider {
  height: 1px;
  background: var(--border-color);
  margin: 8px 0;
}

.tree-home-item {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 12px;
}

.category-header-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-primary);
  width: 100%;
}

.tree-toggle-prefix {
  color: var(--text-secondary);
  font-family: var(--font-code);
}

.category-name {
  flex: 1;
  letter-spacing: 0.05em;
}

.category-count {
  font-size: 11px;
  color: var(--text-secondary);
  font-family: var(--font-code);
}

.tree-tool-item {
  font-family: var(--font-family);
  font-size: 12px;
  padding-left: 28px !important;
}

.tree-branch {
  font-family: var(--font-code);
  color: var(--text-secondary);
  margin-right: 6px;
}

.tool-name {
  font-size: 12px;
}

:deep(.ant-menu-sub) {
  background: transparent !important;
}

:deep(.ant-menu-item-selected) {
  background: var(--invert-bg) !important;
  color: var(--invert-text) !important;
}

:deep(.ant-menu-item-selected .tree-branch),
:deep(.ant-menu-item-selected .anticon) {
  color: var(--invert-text) !important;
}

:deep(.ant-menu-item:hover) {
  background: var(--invert-bg) !important;
  color: var(--invert-text) !important;
}

:deep(.ant-menu-item:hover .tree-branch),
:deep(.ant-menu-item:hover .anticon) {
  color: var(--invert-text) !important;
}
</style>
