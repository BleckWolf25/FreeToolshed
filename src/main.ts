/**
 * @file main.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Client-side entry point instantiating Vue 3 application instance
 *
 * @description
 * Mounts Vue 3 application instance to DOM (#app), registers Vue Router, imports global styles,
 * and initializes Ant Design Vue UI framework components.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
// ---------- IMPORTS
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';

// Import Ant Design Vue CSS & Global CSS
import 'ant-design-vue/dist/reset.css';
import './styles/main.css';

// ---------- APP INSTANTIATION
const app = createApp(App);

app.use(router);
app.use(Antd);

app.mount('#app');
