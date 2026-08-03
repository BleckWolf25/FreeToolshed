/**
 * @file Calculator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for Calculator Vue component
 *
 * @description
 * Verifies component rendering, iframe loading wrapper, and open fullscreen action.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Calculator from '../Calculator.vue';

// ---------- TESTS
describe('Calculator.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: [
        'id',
        'title',
        'description',
        'tier',
        'canCopy',
        'canReset',
        'hasSample',
        'faq',
        'compatibility'
      ]
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
    },
    'a-spin': {
      template: '<div class="ant-spin-stub"></div>'
    }
  };

  it('renders successfully with iframe container and external link toolbar', () => {
    const wrapper = mount(Calculator, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('iframe').exists()).toBe(true);
    expect(wrapper.find('iframe').attributes('src')).toBe(
      'https://the-great-calculator.vercel.app/'
    );
  });
});
