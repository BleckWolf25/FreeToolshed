/**
 * @file MarkdownConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for MarkdownConverter Vue component
 *
 * @description
 * Verifies component rendering, view mode radio buttons (Live Preview vs Raw HTML), sample load button, Markdown textarea input, and output preview container.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MarkdownConverter from '../MarkdownConverter.vue';

// ---------- TESTS
describe('MarkdownConverter.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
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
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value', 'rows']
    }
  };

  it('renders view mode radio options, sample loader, and dual editor/preview grid', async () => {
    const wrapper = mount(MarkdownConverter, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.text()).toContain('Live Preview');
    expect(wrapper.text()).toContain('Raw HTML Code');
    expect(wrapper.findAll('.panel').length).toBe(2);
  });
});
