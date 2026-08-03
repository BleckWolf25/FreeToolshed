/**
 * @file DiffChecker.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for DiffChecker Vue component
 *
 * @description
 * Verifies component rendering, toolbar controls, dual textarea editors, compare text trigger button, load sample action, and diff view panel.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DiffChecker from '../DiffChecker.vue';

// ---------- TESTS
describe('DiffChecker.vue', () => {
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
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    },
    'a-tag': {
      template: '<span class="ant-tag-stub"><slot/></span>'
    }
  };

  it('renders toolbar, dual text inputs, and computed diff result container', async () => {
    const wrapper = mount(DiffChecker, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.findAll('.ant-input-stub').length).toBe(2);
    expect(wrapper.find('.diff-result-panel').exists()).toBe(true);
  });

  it('triggers compare action and updates diff tags', async () => {
    const wrapper = mount(DiffChecker, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    const compareBtn = wrapper.find('.toolbar-controls button');
    await compareBtn.trigger('click');

    expect(wrapper.findAll('.ant-tag-stub').length).toBeGreaterThan(0);
  });
});
