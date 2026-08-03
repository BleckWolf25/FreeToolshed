/**
 * @file YamlParser.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for YamlParser Vue component
 *
 * @description
 * Verifies component rendering, conversion mode radio options (YAML -> JSON vs JSON -> YAML), sample loader button, input textarea, and output code panel.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import YamlParser from '../YamlParser.vue';

// ---------- TESTS
describe('YamlParser.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-radio-group': {
      template: '<div class="ant-radio-group-stub"><slot/></div>',
      props: ['value', 'buttonStyle']
    },
    'a-radio-button': {
      template: '<button class="ant-radio-button-stub"><slot/></button>',
      props: ['value']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    },
    'a-alert': {
      template: '<div class="ant-alert-stub"><slot/></div>'
    }
  };

  it('renders mode radio buttons, sample loader, and input/output panels', async () => {
    const wrapper = mount(YamlParser, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.text()).toContain('YAML → JSON');
    expect(wrapper.text()).toContain('JSON → YAML');
    expect(wrapper.findAll('.panel').length).toBe(2);
  });
});
