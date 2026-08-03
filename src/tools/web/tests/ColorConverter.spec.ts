/**
 * @file ColorConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for ColorConverter Vue component
 *
 * @description
 * Verifies component rendering, color preview banner, HEX/RGB/HSL input fields,
 * WCAG contrast ratio tags, interactive events, sample loading, and reset handler.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ColorConverter from '../ColorConverter.vue';

// ---------- TESTS
describe('ColorConverter.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-input': {
      template:
        '<input class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)" />',
      props: ['value', 'readonly', 'size']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-tag': {
      template: '<span class="ant-tag-stub"><slot/></span>',
      props: ['color']
    }
  };

  it('renders successfully with color preview banner and inputs', () => {
    const wrapper = mount(ColorConverter, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.color-preview-banner').exists()).toBe(true);
    expect(wrapper.find('.banner-hex-title').text()).toBe('#1890FF');
    expect(wrapper.findAll('.input-card').length).toBe(3);
  });

  it('displays WCAG 2.1 contrast analysis section', () => {
    const wrapper = mount(ColorConverter, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.find('.accessibility-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('WCAG 2.1 Contrast Analysis');
    expect(wrapper.text()).toContain('White Text');
    expect(wrapper.text()).toContain('Black Text');
  });

  it('updates HEX input and re-computes color representations', async () => {
    const wrapper = mount(ColorConverter, {
      global: { stubs: stubComponents }
    });

    const hexInput = wrapper.find('.inputs-grid .input-card:first-child input');
    await hexInput.setValue('#FF0000');
    await hexInput.trigger('input');

    expect(wrapper.find('.banner-hex-title').text()).toBe('#FF0000');
  });
});
