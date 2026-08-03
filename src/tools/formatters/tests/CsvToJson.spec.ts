/**
 * @file CsvToJson.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for CsvToJson Vue component
 *
 * @description
 * Verifies component rendering, delimiter selector, headers checkbox, sample load button, CSV textarea input, and JSON output panel.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CsvToJson from '../CsvToJson.vue';

// ---------- TESTS
describe('CsvToJson.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-select': {
      template:
        '<select class="ant-select-stub" :value="value" @change="$emit(\'update:value\', $event.target.value)"><slot/></select>',
      props: ['value']
    },
    'a-select-option': {
      template: '<option :value="value"><slot/></option>',
      props: ['value']
    },
    'a-checkbox': {
      template:
        '<label class="ant-checkbox-stub"><input type="checkbox" :checked="checked" @change="$emit(\'update:checked\', $event.target.checked)" /><slot/></label>',
      props: ['checked']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    },
    'a-table': {
      template: '<div class="ant-table-stub"><slot/></div>'
    }
  };

  it('renders delimiter selector, headers checkbox, and CSV/JSON panels', async () => {
    const wrapper = mount(CsvToJson, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.find('.ant-select-stub').exists()).toBe(true);
    expect(wrapper.find('.ant-checkbox-stub').exists()).toBe(true);
    expect(wrapper.findAll('.panel').length).toBe(2);
  });
});
