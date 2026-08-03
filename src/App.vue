<!--
/**
 * @file App.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Root application component integrating layout shell and dynamic dark/light theming
 *
 * @description
 * Encloses the web application in Ant Design Vue's ConfigProvider, handles dark/light theme state
 * switching, layout structural components (Header, Sidebar, Content, Footer), and router outlet.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
-->
<template>
  <a-config-provider :theme="antTheme">
    <div :data-theme="theme" class="app-wrapper">
      <a-layout class="app-layout">
        <!-- GLOBAL NAVBAR HEADER -->
        <Header :theme="theme" @toggle-theme="toggleTheme" />

        <a-layout class="app-body-layout">
          <!-- NAVIGATION SIDEBAR -->
          <Sidebar />

          <!-- MAIN ROUTER CONTENT -->
          <a-layout-content class="app-content">
            <div class="content-container">
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, computed, onMounted } from 'vue';
import { theme as antThemeEngine } from 'ant-design-vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { storage } from './utils/storage.js';

// ---------- REACTIVE STATE
const theme = ref('light');

// ---------- COMPUTED ANT DESIGN THEME TOKENS
const antTheme = computed(() => {
  const isDark = theme.value === 'dark';
  return {
    algorithm: isDark ? antThemeEngine.darkAlgorithm : antThemeEngine.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorError: '#ff4d4f',
      borderRadius: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }
  };
});

// ---------- METHODS
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  storage.setTheme(theme.value);
  document.documentElement.setAttribute('data-theme', theme.value);
};

onMounted(() => {
  const saved = storage.getTheme();
  theme.value = saved;
  document.documentElement.setAttribute('data-theme', saved);
});
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-primary);
}

.app-layout {
  min-height: 100vh;
}

.app-body-layout {
  min-height: calc(100vh - 64px);
}

.app-content {
  padding: 24px;
  background: var(--bg-color);
  overflow-y: auto;
  max-height: calc(100vh - 64px);
}

.content-container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

/* TRANSITION ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .app-content {
    padding: 12px;
  }
}
</style>
