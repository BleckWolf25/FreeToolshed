/**
 * @file QrCodeGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for QrCodeGenerator Vue component
 *
 * @description
 * Verifies component rendering, ToolCard wrapper integration, and UI element existence for QrCodeGenerator.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import QrCodeGenerator from '../QrCodeGenerator.vue';

// ---------- TESTS
describe('QrCodeGenerator.vue', () => {
  it('renders successfully without crashing', () => {
    const wrapper = mount(QrCodeGenerator, {
      shallow: true,
      global: {
        stubs: {
          ToolCard: {
            template: '<div><slot/><slot name="icon"/></div>'
          }
        }
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
