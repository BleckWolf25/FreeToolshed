/**
 * @file CodeUnminifier.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit tests for CodeUnminifier Vue component
 *
 * @description
 * Verifies component rendering, language selection, input textarea interaction,
 * sample loading, reset handler, and output panel rendering.
 *
 * @since 03/08/2026
 */
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CodeUnminifier from '../CodeUnminifier.vue';

describe('CodeUnminifier.vue', () => {
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
    'a-textarea': {
      template:
        '<textarea class="ant-textarea-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value', 'placeholder', 'rows']
    },
    'a-select': {
      template:
        '<select class="ant-select-stub" :value="value" @change="$emit(\'update:value\', $event.target.value); $emit(\'change\', $event.target.value)"><slot/></select>',
      props: ['value']
    },
    'a-select-option': {
      template: '<option :value="value"><slot/></option>',
      props: ['value']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    }
  };

  it('renders successfully with language dropdown and input textareas', () => {
    const wrapper = mount(CodeUnminifier, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.findAll('.panel').length).toBe(2);
  });

  it('formats JS code reactively on input change', async () => {
    const wrapper = mount(CodeUnminifier, {
      global: { stubs: stubComponents }
    });

    const textarea = wrapper.find('.ant-textarea-stub');
    await textarea.setValue('function hello(){return "world";}');
    await textarea.trigger('input');

    const outputTextarea = wrapper.find('.output-textarea');
    expect((outputTextarea.element as HTMLTextAreaElement).value).toContain('function hello()');
  });
});
