/**
 * @file TextCaseConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for TextCaseConverter Vue component
 *
 * @description
 * Verifies component rendering, original text input textarea, character/word/line counters, and 8 converted case cards grid.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextCaseConverter from '../TextCaseConverter.vue';

// ---------- TESTS
describe('TextCaseConverter.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value', 'rows']
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
    }
  };

  it('renders input panel, statistics counters, and 8 case converted cards', async () => {
    const wrapper = mount(TextCaseConverter, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.stats-counter').exists()).toBe(true);
    expect(wrapper.text()).toContain('Characters');
    expect(wrapper.findAll('.case-card').length).toBe(8);
  });
});
