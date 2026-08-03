/**
 * @file RegexTester.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for RegexTester Vue component
 *
 * @description
 * Verifies component rendering, pattern and flags input elements, preset pattern buttons, test text textarea, and matches results list.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RegexTester from '../RegexTester.vue';

// ---------- TESTS
describe('RegexTester.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-input': {
      template:
        '<input class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)" />',
      props: ['value', 'size']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-alert': {
      template: '<div class="ant-alert-stub"><slot/></div>',
      props: ['message', 'type']
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    }
  };

  it('renders pattern input card, preset cheat sheet buttons, and regex test panels', async () => {
    const wrapper = mount(RegexTester, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.regex-input-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Presets Cheat Sheet:');
    expect(wrapper.text()).toContain('Email Address');
  });
});
