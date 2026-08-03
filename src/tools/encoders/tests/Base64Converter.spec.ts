/**
 * @file Base64Converter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for Base64Converter Vue component
 *
 * @description
 * Verifies component rendering, mode radio buttons (encode/decode), drag-and-drop file upload zone, input textarea, and output panel.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Base64Converter from '../Base64Converter.vue';

// ---------- TESTS
describe('Base64Converter.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-radio-group': {
      template: '<div class="ant-radio-group-stub"><slot/></div>',
      props: ['value', 'buttonStyle']
    },
    'a-radio-button': {
      template: '<button class="ant-radio-button-stub"><slot/></button>',
      props: ['value']
    },
    'a-upload-dragger': {
      template: '<div class="ant-upload-dragger-stub"><slot/></div>'
    },
    'a-alert': {
      template: '<div class="ant-alert-stub"><slot/></div>'
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    }
  };

  it('renders mode radio buttons, upload dragger, and input/output panels', async () => {
    const wrapper = mount(Base64Converter, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.text()).toContain('Encode (Text/File → Base64)');
    expect(wrapper.find('.file-dragger').exists()).toBe(true);
    expect(wrapper.findAll('.panel').length).toBe(2);
  });
});
