/**
 * @file eslint.config.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary ESLint configuration for FreeToolshed.
 *
 * @description
 * Uses ESLint with TypeScript, Vue, and Prettier configurations to enforce code quality and style guidelines across the project.
 *
 * @since 31/07/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

// ---------- CONFIGURATION
export default tseslint.config(
  // Ignores
  {
    ignores: ['dist/**', 'node_modules/**', '.qodo/**', 'test-results/**', 'playwright-report/**']
  },

  // Configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-useless-escape': 'off',
      'prefer-const': 'off',
      'vue/no-v-html': 'off',
      'vue/attributes-order': 'off',
      'preserve-caught-error': 'off',
      'vue/attribute-hyphenation': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  eslintConfigPrettier
);
