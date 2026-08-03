/**
 * @file vite.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vite build configuration for FreeToolshed
 *
 * @description
 * Configures Vue 3 plugin, path aliases (@ mapping to ./src), dev server settings,
 * asset optimization, and dependency pre-bundling for fast loading.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// ---------- VITE CONFIGURATION
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 2000
  }
});
