/**
 * @file storage.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Local storage utility wrapper for user settings, history, and favorites
 *
 * @description
 * Handles local storage interactions with safe JSON parsing, fallback defaults,
 * tool usage history tracking, favorite tools persistence, and theme preferences.
 *
 * @since 01/08/2026
 * @updated 01/08/2026
 */
// ---------- CONSTANTS
const KEYS = {
  THEME: 'freetoolshed_theme',
  FAVORITES: 'freetoolshed_favorites',
  RECENT_TOOLS: 'freetoolshed_recent',
  TOOL_STATE: 'freetoolshed_state_'
};

// ---------- HELPER FUNCTIONS
const getItem = (key: string, fallback: any = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
};

const setItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key "${key}" to localStorage:`, error);
  }
};

// ---------- EXPORTED STORAGE UTILITIES
export const storage = {
  // Theme Management
  getTheme() {
    return getItem(KEYS.THEME, 'light');
  },
  setTheme(theme: string) {
    setItem(KEYS.THEME, theme);
  },

  // Favorites Management
  getFavorites() {
    return getItem(KEYS.FAVORITES, []);
  },
  toggleFavorite(toolId: string) {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(toolId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(toolId);
    }
    setItem(KEYS.FAVORITES, favorites);
    return favorites;
  },
  isFavorite(toolId: string) {
    return this.getFavorites().includes(toolId);
  },

  // Recent Tools History
  getRecentTools() {
    return getItem(KEYS.RECENT_TOOLS, []);
  },
  addRecentTool(toolId: string) {
    let recent = this.getRecentTools().filter((id: any) => id !== toolId);
    recent.unshift(toolId);
    if (recent.length > 10) recent = recent.slice(0, 10);
    setItem(KEYS.RECENT_TOOLS, recent);
    return recent;
  },

  // Generic Tool State Persistence
  getToolState(toolId: string, fallback = {}) {
    return getItem(KEYS.TOOL_STATE + toolId, fallback);
  },
  saveToolState(toolId: string, state: any) {
    setItem(KEYS.TOOL_STATE + toolId, state);
  },

  // Copy to Clipboard with Fallback
  async copyToClipboard(text: string) {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        textArea.remove();
        return successful;
      }
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      return false;
    }
  }
};
