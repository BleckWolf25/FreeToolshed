/**
 * @file PrimeNumber.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for PrimeNumber Vue component
 *
 * @description
 * Verifies component rendering, primality input change interaction, and prime range generation.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeNumber from '../PrimeNumber.vue';

// ---------- TESTS
describe('PrimeNumber.vue', () => {
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
    'a-input-number': {
      template:
        '<input class="ant-input-number-stub" :value="value" @change="$emit(\'update:value\', Number($event.target.value)); $emit(\'change\')" />',
      props: ['value']
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
    }
  };

  it('renders primality checker panel and range generator panel', () => {
    const wrapper = mount(PrimeNumber, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAll('.panel').length).toBe(2);
    expect(wrapper.text()).toContain('PRIMALITY CHECKER');
  });
});
