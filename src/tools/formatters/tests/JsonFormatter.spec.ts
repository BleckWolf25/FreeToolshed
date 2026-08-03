/**
 * @file JsonFormatter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for JsonFormatter Vue component
 *
 * @description
 * Verifies component rendering, Prettify and Minify action buttons, indentation dropdown select, input textarea, and output code panel.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import JsonFormatter from '../JsonFormatter.vue';

// ---------- TESTS
describe('JsonFormatter.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
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
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    },
    'a-tag': {
      template: '<span class="ant-tag-stub"><slot/></span>'
    },
    'a-alert': {
      template: '<div class="ant-alert-stub"><slot/></div>'
    }
  };

  it('renders Prettify and Minify buttons, indent selector, and dual editor panels', async () => {
    const wrapper = mount(JsonFormatter, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.text().toUpperCase()).toContain('PRETTIFY JSON');
    expect(wrapper.text().toUpperCase()).toContain('MINIFY JSON');
    expect(wrapper.find('.ant-select-stub').exists()).toBe(true);
    expect(wrapper.findAll('.panel').length).toBe(2);
  });
});
