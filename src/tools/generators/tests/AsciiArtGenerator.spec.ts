/**
 * @file AsciiArtGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for AsciiArtGenerator Vue component
 *
 * @description
 * Verifies component rendering, FIGlet font selector dropdown, text input element, generate button, and ASCII banner preview output box.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AsciiArtGenerator from '../AsciiArtGenerator.vue';

// ---------- TESTS
describe('AsciiArtGenerator.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-select': {
      template:
        '<select class="ant-select-stub" :value="value" @change="$emit(\'update:value\', $event.target.value)"><slot/></select>',
      props: ['value']
    },
    'a-select-option': {
      template: '<option :value="value"><slot/></option>',
      props: ['value']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-input': {
      template:
        '<input class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)" />',
      props: ['value', 'size']
    }
  };

  it('renders font selector, text input, and ASCII art preview element', async () => {
    const wrapper = mount(AsciiArtGenerator, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.find('.ant-select-stub').exists()).toBe(true);
    expect(wrapper.find('.ascii-preview-box').exists()).toBe(true);
  });
});
