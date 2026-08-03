/**
 * @file useImageMetadata.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Image Metadata & EXIF Viewer
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the ImageMetadata component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import ExifReader from 'exifreader';
import { storage } from '../../utils/storage.js';

// ---------- INTERFACES
export interface ImageData {
  name: string;
  width: number;
  height: number;
  sizeFormatted: string;
  type: string;
  url: string;
}

// ---------- FUNCTION: useImageMetadata
export function useImageMetadata() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Is my image uploaded?',
      a: 'No! Images are parsed completely locally in your browser using ExifReader.'
    }
  ];
  const compatibility = ['JPEG', 'PNG', 'WEBP', 'TIFF', 'HEIC'];
  const handleSample = () => {
    message.info('Please click Browse to load an image from your computer to see EXIF data.');
  };

  // ---------- REACTIVE STATE
  const imageData = ref<ImageData | null>(null);
  const metadataJson = ref('');

  // ---------- METHODS
  const handleFileUpload = async (file: Blob & { name?: string; size: number; type: string }) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = async () => {
      try {
        // Read EXIF tags using ExifReader
        const tags = await ExifReader.load(file as any as File);

        // Clean tags object for serializability
        const cleanTags: Record<string, any> = {};
        for (const [key, val] of Object.entries(tags)) {
          if (key !== 'MakerNote') {
            cleanTags[key] = val.description || val.value;
          }
        }

        imageData.value = {
          name: file.name || 'unknown',
          width: img.width,
          height: img.height,
          sizeFormatted: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type,
          url
        };

        metadataJson.value = JSON.stringify(
          {
            filename: file.name || 'unknown',
            width: img.width,
            height: img.height,
            sizeBytes: file.size,
            mimeType: file.type,
            exif: cleanTags
          },
          null,
          2
        );

        message.success(`Extracted metadata for ${file.name}!`);
      } catch (e) {
        imageData.value = {
          name: file.name || 'unknown',
          width: img.width,
          height: img.height,
          sizeFormatted: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type,
          url
        };
        metadataJson.value = JSON.stringify(
          {
            filename: file.name || 'unknown',
            width: img.width,
            height: img.height,
            sizeBytes: file.size,
            mimeType: file.type,
            exif: 'No EXIF metadata found'
          },
          null,
          2
        );
      }
    };

    img.src = url;
    return false;
  };

  const copyMetadata = async () => {
    if (!metadataJson.value) return;
    const success = await storage.copyToClipboard(metadataJson.value);
    if (success) message.success('Metadata JSON copied to clipboard!');
  };

  const handleDownload = () => {
    if (!metadataJson.value) return;
    const blob = new Blob([metadataJson.value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image-metadata.json';
    a.click();
    URL.revokeObjectURL(url);
    message.success('Metadata JSON downloaded!');
  };

  const handleReset = () => {
    imageData.value = null;
    metadataJson.value = '';
  };

  return {
    faq,
    compatibility,
    handleSample,
    imageData,
    metadataJson,
    handleFileUpload,
    copyMetadata,
    handleDownload,
    handleReset
  };
}
