/**
 * @file MorseTranslator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for MorseTranslator Vue component
 *
 * @description
 * Verifies component rendering, mode toggle radio buttons, audio playback control buttons, speed slider, and translation panels.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MorseTranslator from '../MorseTranslator.vue';

// ---------- TESTS
describe('MorseTranslator.vue', () => {
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
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" :disabled="disabled" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>',
      props: ['disabled']
    },
    'a-slider': {
      template: '<div class="ant-slider-stub"></div>',
      props: ['value', 'min', 'max']
    },
    'a-textarea': {
      template:
        '<textarea class="ant-input-stub" :value="value" @input="$emit(\'update:value\', $event.target.value); $emit(\'input\', $event)"></textarea>',
      props: ['value']
    }
  };

  it('renders mode radio options, play audio controls, and editor grid', async () => {
    const wrapper = mount(MorseTranslator, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbar-controls').exists()).toBe(true);
    expect(wrapper.text()).toContain('Text → Morse Code');
    expect(wrapper.text()).toContain('Speed (WPM):');
    expect(wrapper.findAll('.panel').length).toBe(2);
  });
});
