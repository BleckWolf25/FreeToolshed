<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="260"
    breakpoint="lg"
    :collapsed-width="0"
    theme="light"
    class="app-sidebar"
    collapsible
  >
    <div class="sidebar-inner">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        class="sidebar-menu"
      >
        <!-- HOME LINK -->
        <a-menu-item key="home" @click="navigateTo('/')">
          <template #icon><HomeOutlined /></template>
          <span>Dashboard Overview</span>
        </a-menu-item>

        <a-menu-divider />

        <!-- CATEGORIES -->
        <a-sub-menu v-for="cat in categories" :key="cat.name">
          <template #icon>
            <component :is="cat.icon" :style="{ color: cat.color }" />
          </template>
          <template #title>
            <span class="group-title">{{ cat.name }}</span>
          </template>
          <a-menu-item
            v-for="tool in getToolsByCategory(cat.name)"
            :key="tool.id"
            @click="navigateTo(tool.path)"
          >
            <template #icon><component :is="tool.icon" /></template>
            <span>{{ tool.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, watch } from 'vue';
import {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
  useRoute,
  useRouter
} from 'vue-router';
import {
  HomeOutlined,
  CodeOutlined,
  RetweetOutlined,
  FireOutlined,
  FormOutlined,
  ToolOutlined
} from '@ant-design/icons-vue';
import { toolsRegistry } from '../router/toolsRegistry.js';

// ---------- REACTIVE STATE
const route = useRoute();
const router = useRouter();
const collapsed = ref(false);
const selectedKeys = ref<string[]>([]);

const categories = [
  { name: 'Formatters & Parsers', icon: CodeOutlined, color: '#1890ff' },
  { name: 'Encoders & Decoders', icon: RetweetOutlined, color: '#52c41a' },
  { name: 'Generators', icon: FireOutlined, color: '#fa8c16' },
  { name: 'Text & Code', icon: FormOutlined, color: '#722ed1' },
  { name: 'Web & Misc', icon: ToolOutlined, color: '#eb2f96' }
];

const openKeys = ref<string[]>(categories.map((c) => c.name));

// ---------- COMPUTED TOOL GROUPS
const getToolsByCategory = (catName: string) => {
  return toolsRegistry.filter((t: any) => t.category === catName);
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
const navigateTo = (path: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) => {
  router.push(path);
};
</script>

<style scoped>
.app-sidebar {
  border-right: 1px solid var(--border-color);
  background: var(--card-bg) !important;
}

.sidebar-inner {
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 8px 0;
}

.sidebar-menu {
  border-right: none !important;
  background: transparent !important;
}

.group-title {
  font-weight: 600;
  font-size: 13px;
}
</style>
