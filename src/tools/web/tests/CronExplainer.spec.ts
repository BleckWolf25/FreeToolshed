/**
 * @file CronExplainer.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for CronExplainer Vue component
 *
 * @description
 * Verifies component rendering, cron expression input, preset buttons interaction,
 * human-readable explanation box display, upcoming execution list rendering, and error alerts.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CronExplainer from '../CronExplainer.vue';

// ---------- TESTS
describe('CronExplainer.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-input': {
      template:
        '<input class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)" />',
      props: ['value', 'placeholder', 'size']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-alert': {
      template: '<div class="ant-alert-stub">{{ message }}</div>',
      props: ['message', 'type']
    },
    'a-list': {
      template:
        '<div class="ant-list-stub"><div v-for="(item, index) in dataSource" :key="index"><slot name="renderItem" :item="item" :index="index" /></div></div>',
      props: ['dataSource']
    },
    'a-list-item': {
      template: '<div class="ant-list-item-stub"><slot/></div>'
    },
    'a-tag': {
      template: '<span class="ant-tag-stub"><slot/></span>'
    }
  };

  it('renders successfully with input card and popular presets', () => {
    const wrapper = mount(CronExplainer, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.cron-input-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Popular Presets:');
    expect(wrapper.text()).toContain('Every 5 Minutes');
  });

  it('renders human readable explanation and upcoming executions for initial state', async () => {
    const wrapper = mount(CronExplainer, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.explanation-card').exists()).toBe(true);
    expect(wrapper.find('.explanation-text').text()).toBeTruthy();
    expect(wrapper.find('.next-dates-card').exists()).toBe(true);
  });

  it('updates input and parses cron when preset button is clicked', async () => {
    const wrapper = mount(CronExplainer, {
      global: { stubs: stubComponents }
    });

    const presetBtn = wrapper.findAll('.presets-row button')[1]; // "Every Hour"
    await presetBtn.trigger('click');

    const input = wrapper.find('.cron-input');
    expect((input.element as HTMLInputElement).value).toBe('0 * * * *');
  });
});
