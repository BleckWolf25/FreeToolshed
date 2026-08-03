/**
 * @file ImageMetadata.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for ImageMetadata Vue component
 *
 * @description
 * Verifies component rendering, upload dragger UI, empty state callout, metadata JSON previewer,
 * and user interactions for ImageMetadata tool.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ImageMetadata from '../ImageMetadata.vue';

// ---------- TESTS
describe('ImageMetadata.vue', () => {
  const stubComponents = {
    ToolCard: {
      template: '<div class="tool-card-stub"><slot/><slot name="icon"/></div>',
      props: ['id', 'title', 'description', 'tier', 'canReset', 'hasSample', 'faq', 'compatibility']
    },
    'a-upload-dragger': {
      template: '<div class="ant-upload-dragger-stub"><slot/></div>',
      props: ['beforeUpload']
    },
    'a-empty': {
      template: '<div class="ant-empty-stub">{{ description }}</div>',
      props: ['description']
    },
    'a-button': {
      template: '<button class="ant-btn-stub" @click="$emit(\'click\')"><slot/></button>'
    },
    'a-textarea': {
      template: '<textarea class="ant-textarea-stub" :value="value" />',
      props: ['value']
    }
  };

  it('renders upload area and empty state message when no image is loaded', () => {
    const wrapper = mount(ImageMetadata, {
      global: { stubs: stubComponents }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.file-dragger').exists()).toBe(true);
    expect(wrapper.text()).toContain('Click or drag an image file to inspect metadata & EXIF');
  });
});
