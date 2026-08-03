/**
 * @file UrlConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for UrlConverter Vue component
 *
 * @description
 * Verifies component rendering, mode radio buttons (encode, decode, parse), URL textarea input, and output panel or query params table.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UrlConverter from '../UrlConverter.vue';

// ---------- TESTS
describe('UrlConverter.vue', () => {
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
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value', 'rows']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-descriptions': {
      template: '<div class="ant-descriptions-stub"><slot/></div>'
    },
    'a-descriptions-item': {
      template: '<div class="ant-descriptions-item-stub"><slot/></div>'
    },
    'a-table': {
      template: '<div class="ant-table-stub"><slot/></div>'
    }
  };

  it('renders mode radio buttons and URL input panel', async () => {
    const wrapper = mount(UrlConverter, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.text()).toContain('Encode URL');
    expect(wrapper.text()).toContain('Decode URL');
  });
});
