/**
 * @file storage.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for storage wrapper utility
 *
 * @description
 * Tests theme persistence, favorites management, recent tools history tracking (order and cap of 10),
 * tool state saving/loading with fallback defaults, safe JSON parsing, and clipboard copy fallback.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from '../storage';

// ---------- TESTS
describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Theme Management', () => {
    it('defaults to light theme when no theme key is stored', () => {
      expect(storage.getTheme()).toBe('light');
    });

    it('sets and retrieves custom theme preference', () => {
      storage.setTheme('dark');
      expect(storage.getTheme()).toBe('dark');

      storage.setTheme('system');
      expect(storage.getTheme()).toBe('system');
    });

    it('returns fallback default when localStorage contains invalid JSON', () => {
      localStorage.setItem('freetoolshed_theme', 'invalid json string {');
      expect(storage.getTheme()).toBe('light');
    });
  });

  describe('Favorites Management', () => {
    it('returns empty array when no favorites are saved', () => {
      expect(storage.getFavorites()).toEqual([]);
    });

    it('toggles favorites on and off correctly', () => {
      expect(storage.isFavorite('json-formatter')).toBe(false);

      const favs1 = storage.toggleFavorite('json-formatter');
      expect(favs1).toEqual(['json-formatter']);
      expect(storage.isFavorite('json-formatter')).toBe(true);

      const favs2 = storage.toggleFavorite('color-converter');
      expect(favs2).toEqual(['json-formatter', 'color-converter']);
      expect(storage.isFavorite('color-converter')).toBe(true);

      const favs3 = storage.toggleFavorite('json-formatter');
      expect(favs3).toEqual(['color-converter']);
      expect(storage.isFavorite('json-formatter')).toBe(false);
    });
  });

  describe('Recent Tools History', () => {
    it('adds recent tools keeping newest first and capping at 10 items', () => {
      for (let i = 1; i <= 15; i++) {
        storage.addRecentTool(`tool-${i}`);
      }

      const recents = storage.getRecentTools();
      expect(recents.length).toBe(10);
      expect(recents[0]).toBe('tool-15');
      expect(recents[9]).toBe('tool-6');
      expect(recents).not.toContain('tool-1');
    });

    it('moves an existing tool to the top of recents without duplicating', () => {
      storage.addRecentTool('tool-a');
      storage.addRecentTool('tool-b');
      storage.addRecentTool('tool-c');

      const recents1 = storage.getRecentTools();
      expect(recents1).toEqual(['tool-c', 'tool-b', 'tool-a']);

      storage.addRecentTool('tool-a');
      const recents2 = storage.getRecentTools();
      expect(recents2).toEqual(['tool-a', 'tool-c', 'tool-b']);
    });
  });

  describe('Tool State Persistence', () => {
    it('saves and retrieves complex tool state objects', () => {
      const state = { input: 'hello', indent: 4, options: { active: true } };
      storage.saveToolState('json-formatter', state);

      const loadedState = storage.getToolState('json-formatter');
      expect(loadedState).toEqual(state);
    });

    it('returns fallback value when no state is saved for given tool', () => {
      const fallback = { defaultVal: 100 };
      expect(storage.getToolState('non-existent-tool', fallback)).toEqual(fallback);
    });
  });

  describe('copyToClipboard', () => {
    it('returns false when text parameter is empty or falsy', async () => {
      const result = await storage.copyToClipboard('');
      expect(result).toBe(false);
    });

    it('uses navigator.clipboard.writeText in secure contexts', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: writeTextMock },
        writable: true,
        configurable: true
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
        configurable: true
      });

      const success = await storage.copyToClipboard('Sample Text');
      expect(success).toBe(true);
      expect(writeTextMock).toHaveBeenCalledWith('Sample Text');
    });

    it('falls back to document.execCommand when navigator.clipboard is unavailable', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true
      });
      const execMock = vi.fn().mockReturnValue(true);
      document.execCommand = execMock;

      const success = await storage.copyToClipboard('Fallback Text');
      expect(success).toBe(true);
      expect(execMock).toHaveBeenCalledWith('copy');
    });
  });
});
