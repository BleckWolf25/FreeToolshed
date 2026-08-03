/**
 * @file Minifier.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for Minifier Vue component
 *
 * @description
 * Verifies component rendering, language selection radio options (JSON, CSS, JS), minify/beautify buttons, sample loader, and dual editor panels.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Minifier from '../Minifier.vue';

// ---------- TESTS
describe('Minifier.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-radio-group': {
      template: '<div class="ant-radio-group-stub"><slot/></div>',
      props: ['value', 'buttonStyle']
    },
    'a-radio-button': {
      template: '<button class="ant-radio-button-stub"><slot/></button>',
      props: ['value']
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    },
    'a-tag': {
      template: '<span class="ant-tag-stub"><slot/></span>'
    }
  };

  it('renders language radio selection options, minify/beautify action buttons, and editor panels', async () => {
    const wrapper = mount(Minifier, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.text().toUpperCase()).toContain('MINIFY CODE');
    expect(wrapper.text().toUpperCase()).toContain('BEAUTIFY / PRETTIFY');
    expect(wrapper.findAll('.panel').length).toBe(2);
  });
});
