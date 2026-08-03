/**
 * @file index.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Router configuration mapping all 21 tool components to dynamic path routes
 *
 * @description
 * Configures HTML5 history routing mode, dynamic code-splitting lazy loading of tool views,
 * route scroll behavior, and page document title resolution for all developer utility routes.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
// ---------- IMPORTS
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { toolsRegistry } from './toolsRegistry.js';

// ---------- LOAD
// Lazy-load component map for code splitting
const componentMap = {
  JsonFormatter: () => import('../tools/formatters/JsonFormatter.vue'),
  Base64Converter: () => import('../tools/encoders/Base64Converter.vue'),
  UrlConverter: () => import('../tools/encoders/UrlConverter.vue'),
  TextCaseConverter: () => import('../tools/text/TextCaseConverter.vue'),
  PasswordGenerator: () => import('../tools/generators/PasswordGenerator.vue'),
  HashGenerator: () => import('../tools/generators/HashGenerator.vue'),
  JwtDecoder: () => import('../tools/encoders/JwtDecoder.vue'),
  UuidGenerator: () => import('../tools/generators/UuidGenerator.vue'),
  RegexTester: () => import('../tools/text/RegexTester.vue'),
  MarkdownConverter: () => import('../tools/formatters/MarkdownConverter.vue'),
  ColorConverter: () => import('../tools/web/ColorConverter.vue'),
  QrCodeGenerator: () => import('../tools/generators/QrCodeGenerator.vue'),
  Minifier: () => import('../tools/formatters/Minifier.vue'),
  DiffChecker: () => import('../tools/text/DiffChecker.vue'),
  CronExplainer: () => import('../tools/web/CronExplainer.vue'),
  UnixTimestamp: () => import('../tools/web/UnixTimestamp.vue'),
  YamlParser: () => import('../tools/formatters/YamlParser.vue'),
  CsvToJson: () => import('../tools/formatters/CsvToJson.vue'),
  ImageMetadata: () => import('../tools/web/ImageMetadata.vue'),
  MorseTranslator: () => import('../tools/text/MorseTranslator.vue'),
  AsciiArtGenerator: () => import('../tools/generators/AsciiArtGenerator.vue')
};

// ---------- ROUTE DEFINITIONS
// Map toolsRegistry to route definitions
const toolRoutes = toolsRegistry.map((t) => ({
  path: t.path,
  name: t.id,
  component: componentMap[t.component as keyof typeof componentMap],
  meta: { title: `${t.name} - FreeToolshed` }
}));

// ---------- ROUTER CREATION
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'FreeToolshed - Free, Client-Side Developer Utilities' }
    },
    ...toolRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'FreeToolshed';
});

export default router;
