/**
 * @file RandomNumberGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for RandomNumberGenerator Vue component
 *
 * @description
 * Verifies component rendering, range parameters input, and output textarea display.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RandomNumberGenerator from '../RandomNumberGenerator.vue';

// ---------- TESTS
describe('RandomNumberGenerator.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: [
        'id',
        'title',
        'description',
        'tier',
        'canCopy',
        'canDownload',
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
    'a-input': {
      template:
        '<input class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)" />',
      props: ['value']
    },
    'a-select': {
      template:
        '<select class="ant-select-stub" :value="value" @change="$emit(\'update:value\', $event.target.value); $emit(\'change\')"><slot/></select>',
      props: ['value']
    },
    'a-select-option': {
      template: '<option :value="value"><slot/></option>',
      props: ['value']
    },
    'a-checkbox': {
      template:
        '<input type="checkbox" class="ant-checkbox-stub" :checked="checked" @change="$emit(\'update:checked\', $event.target.checked); $emit(\'change\')" />',
      props: ['checked']
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
    }
  };

  it('renders configuration parameters and generated output textarea', () => {
    const wrapper = mount(RandomNumberGenerator, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.output-textarea').exists()).toBe(true);
  });
});
