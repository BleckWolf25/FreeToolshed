/**
 * @file NumberBaseConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for NumberBaseConverter Vue component
 *
 * @description
 * Verifies component rendering, multi-base inputs, and bitwise representation layout.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NumberBaseConverter from '../NumberBaseConverter.vue';

// ---------- TESTS
describe('NumberBaseConverter.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: [
        'id',
        'title',
        'description',
        'tier',
        'canCopy',
        'canReset',
        'hasSample',
        'faq',
        'compatibility'
      ]
    },
    'a-input': {
      template:
        '<input class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)" />',
      props: ['value']
    },
    'a-slider': {
      template:
        '<input type="range" class="ant-slider-stub" :value="value" @change="$emit(\'update:value\', Number($event.target.value)); $emit(\'change\')" />',
      props: ['value']
    },
    'a-alert': {
      template: '<div class="ant-alert-stub"><slot/></div>'
    }
  };

  it('renders multi-base cards and bitwise layout panel', () => {
    const wrapper = mount(NumberBaseConverter, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAll('.base-card').length).toBe(4);
    expect(wrapper.find('.panel').exists()).toBe(true);
  });
});
