/**
 * @file vite.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vitest configuration for FreeToolshed
 *
 * @description
 * Configures Vitest testing framework with jsdom environment, includes test files in src, and excludes e2e tests.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

// ---------- CONFIGURATION
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
      exclude: ['e2e/**']
    }
  })
);
