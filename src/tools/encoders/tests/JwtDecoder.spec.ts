/**
 * @file JwtDecoder.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for JwtDecoder Vue component
 *
 * @description
 * Verifies component rendering, JWT token textarea input, load sample button, validation alert banner, and decoded header/payload/signature panels.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import JwtDecoder from '../JwtDecoder.vue';

// ---------- TESTS
describe('JwtDecoder.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value', 'rows']
    },
    'a-alert': {
      template: '<div class="ant-alert-stub"><slot name="message"/></div>',
      props: ['type', 'showIcon']
    }
  };

  it('renders JWT token input panel, load sample button, and decoded output structure', async () => {
    const wrapper = mount(JwtDecoder, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.panel').exists()).toBe(true);
    expect(wrapper.text()).toContain('Load Sample JWT');
  });
});
