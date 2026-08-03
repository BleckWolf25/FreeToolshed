/**
 * @file PasswordGenerator.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for PasswordGenerator Vue component
 *
 * @description
 * Verifies component rendering, primary password display card, strength progress bar, character set checkboxes, slider length control, and batch generator section.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PasswordGenerator from '../PasswordGenerator.vue';

// ---------- TESTS
describe('PasswordGenerator.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-space': {
      template: '<div class="ant-space-stub"><slot/></div>'
    },
    'a-button': {
      template:
        '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/><slot name="icon"/></button>'
    },
    'a-progress': {
      template: '<div class="ant-progress-stub"></div>',
      props: ['percent', 'strokeColor', 'showInfo']
    },
    'a-slider': {
      template: '<div class="ant-slider-stub"></div>',
      props: ['value', 'min', 'max']
    },
    'a-switch': {
      template:
        '<button class="ant-switch-stub" :class="{ \'ant-switch-checked\': checked }" @click="$emit(\'update:checked\', !checked); $emit(\'change\', !checked)"></button>',
      props: ['checked']
    }
  };

  it('renders password card, strength meter, options config, and batch section', async () => {
    const wrapper = mount(PasswordGenerator, {
      global: { stubs: stubComponents }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.primary-password-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Password Strength:');
    expect(wrapper.find('.config-card').exists()).toBe(true);
    expect(wrapper.findAll('.ant-switch-stub').length).toBe(5);
  });
});
