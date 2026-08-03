/**
 * @file useSidebar.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable providing shared reactive state for navigation sidebar collapse/expand behavior
 *
 * @description
 * This composable manages the reactive state of the navigation sidebar,
 * allowing components to toggle its collapsed state, set it explicitly,
 * and automatically collapse it on mobile devices based on window width.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';

// ---------- STATE
const collapsed = ref(false);

// ---------- FUNCTION: useSidebar
export function useSidebar() {
  const toggleSidebar = () => {
    collapsed.value = !collapsed.value;
  };

  const setCollapsed = (val: boolean) => {
    collapsed.value = val;
  };

  const closeOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      collapsed.value = true;
    }
  };

  return {
    collapsed,
    toggleSidebar,
    setCollapsed,
    closeOnMobile
  };
}
