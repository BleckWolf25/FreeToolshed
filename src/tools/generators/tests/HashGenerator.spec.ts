/**
 * @file HashGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for HashGenerator Vue component
 *
 * @description
 * Verifies component rendering, text input textarea, file upload button, and computed hash output cards (MD5, SHA-1, SHA-256, SHA-512).
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HashGenerator from '../HashGenerator.vue';

// ---------- TESTS
describe('HashGenerator.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-upload': {
      template: '<div class="ant-upload-stub"><slot/></div>',
      props: ['beforeUpload', 'showUploadList']
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value', 'rows']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    }
  };

  it('renders file upload button, input textarea, and 4 hash result cards', async () => {
    const wrapper = mount(HashGenerator, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.ant-upload-stub').exists()).toBe(true);
    expect(wrapper.find('.ant-input-stub').exists()).toBe(true);
    expect(wrapper.findAll('.hash-card').length).toBe(4);
  });
});
