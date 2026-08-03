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
 * Encloses the web application in Ant Design Vue's ConfigProvider re-themed to a brutalist,
 * monochrome "Blueprint & Rugged Workbench" design language, handles dark/light theme state
 * switching, layout structural components (Header, Sidebar, Content, Footer), and router outlet.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <a-config-provider :theme="antTheme">
    <div :data-theme="theme" class="app-wrapper dot-grid-bg">
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
// Monochrome re-theme: zero border-radius, high-contrast primary buttons,
// JetBrains Mono UI typeface, sharp bordered surfaces.
const antTheme = computed(() => {
  const isDark = theme.value === 'dark';
  const ink = isDark ? '#ffffff' : '#111111';
  const inkHover = isDark ? '#cccccc' : '#333333';
  const surface = isDark ? '#1c1c1c' : '#ffffff';
  const border = isDark ? '#333333' : '#d6d6d2';
  const primaryText = isDark ? '#1c1c1c' : '#ffffff';

  return {
    algorithm: isDark ? antThemeEngine.darkAlgorithm : antThemeEngine.defaultAlgorithm,
    token: {
      colorPrimary: ink,
      colorTextLightSolid: primaryText,
      colorLink: ink,
      colorLinkHover: inkHover,
      colorInfo: ink,
      colorBgContainer: surface,
      colorBorder: border,
      borderRadius: 0,
      borderRadiusLG: 0,
      borderRadiusSM: 0,
      borderRadiusXS: 0,
      controlHeight: 38,
      wireframe: false,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
    },
    components: {
      Button: {
        borderRadius: 0,
        primaryColor: primaryText,
        colorTextLightSolid: primaryText,
        colorPrimaryHover: inkHover,
        colorPrimaryActive: inkHover
      },
      Input: { borderRadius: 0 },
      Select: { borderRadius: 0 },
      Modal: { borderRadiusLG: 0 },
      Tag: { borderRadiusSM: 0 },
      Menu: {
        borderRadius: 0,
        itemBorderRadius: 0,
        subMenuItemBorderRadius: 0,
        itemSelectedBg: ink,
        itemSelectedColor: primaryText,
        itemHoverBg: ink,
        itemHoverColor: primaryText,
        itemActiveBg: ink
      },
      Popover: { borderRadiusLG: 0 },
      Collapse: { borderRadiusLG: 0 }
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
  color: var(--text-primary);
}

.app-layout {
  min-height: 100vh;
  background: transparent !important;
}

.app-body-layout {
  min-height: calc(100vh - 64px);
  background: transparent !important;
}

.app-content {
  padding: 28px 32px;
  background: transparent;
  overflow-y: auto;
  max-height: calc(100vh - 64px);
  width: 100%;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* TRANSITION ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 992px) {
  .app-body-layout {
    min-height: calc(100vh - 56px);
  }
  .app-content {
    padding: 20px;
    max-height: calc(100vh - 56px);
  }
}

@media (max-width: 768px) {
  .app-content {
    padding: 14px 12px;
  }
}

@media (max-width: 480px) {
  .app-content {
    padding: 10px 8px;
  }
}
</style>
