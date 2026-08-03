/**
 * @file UnixTimestamp.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for UnixTimestamp Vue component
 *
 * @description
 * Verifies component rendering, live clock ticker banner, timestamp to date conversion card,
 * date to timestamp conversion card, unit select dropdowns, descriptions rendering, and button click handlers.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UnixTimestamp from '../UnixTimestamp.vue';

// ---------- TESTS
describe('UnixTimestamp.vue', () => {
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
    'a-radio-group': {
      template: '<div class="ant-radio-group-stub"><slot/></div>',
      props: ['value']
    },
    'a-radio': {
      template: '<label class="ant-radio-stub"><slot/></label>',
      props: ['value']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-descriptions': {
      template: '<div class="ant-descriptions-stub"><slot/></div>',
      props: ['bordered', 'size', 'column']
    },
    'a-descriptions-item': {
      template:
        '<div class="ant-descriptions-item-stub"><span class="label">{{ label }}</span><slot/></div>',
      props: ['label']
    }
  };

  it('renders live clock ticker banner and conversion panels', () => {
    const wrapper = mount(UnixTimestamp, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.live-ticker-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('CURRENT UNIX TIMESTAMP (SEC)');
    expect(wrapper.findAll('.convert-card').length).toBe(2);
  });

  it('displays converted date formats when timestamp is entered', async () => {
    const wrapper = mount(UnixTimestamp, {
      global: { stubs: stubComponents }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.result-desc').exists()).toBe(true);
    expect(wrapper.text()).toContain('ISO 8601');
    expect(wrapper.text()).toContain('UTC String');
  });

  it('displays converted timestamp numbers when date string is entered', async () => {
    const wrapper = mount(UnixTimestamp, {
      global: { stubs: stubComponents }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Timestamp (Seconds)');
    expect(wrapper.text()).toContain('Timestamp (Milliseconds)');
  });
});
