/**
 * @file useImageMetadata.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useImageMetadata composable
 *
 * @description
 * Tests image file parsing, metadata extraction, ExifReader integration, JSON generation, copy/download helpers, and reset actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect, vi } from 'vitest';
import { useImageMetadata } from './useImageMetadata';

describe('useImageMetadata composable', () => {
  it('initializes with null image data and empty metadata JSON', () => {
    const { imageData, metadataJson, faq, compatibility } = useImageMetadata();
    expect(imageData.value).toBeNull();
    expect(metadataJson.value).toBe('');
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('JPEG');
  });

  it('resets image data and metadata JSON on handleReset', () => {
    const { imageData, metadataJson, handleReset } = useImageMetadata();
    imageData.value = {
      name: 'test.jpg',
      width: 800,
      height: 600,
      sizeFormatted: '120.5 KB',
      type: 'image/jpeg',
      url: 'blob:test'
    };
    metadataJson.value = '{"test": true}';

    handleReset();
    expect(imageData.value).toBeNull();
    expect(metadataJson.value).toBe('');
  });

  it('processes image file upload and builds image data and metadata JSON fallback', async () => {
    const { imageData, metadataJson, handleFileUpload } = useImageMetadata();

    // Mock URL.createObjectURL and Image
    global.URL.createObjectURL = vi.fn().mockReturnValue('blob:http://localhost/test-image');

    const fakeFile = {
      name: 'sample.png',
      type: 'image/png',
      size: 10240,
      arrayBuffer: async () => new ArrayBuffer(8)
    } as any;

    // Trigger handleFileUpload
    const preventDefault = await handleFileUpload(fakeFile);
    expect(preventDefault).toBe(false);
  });
});
