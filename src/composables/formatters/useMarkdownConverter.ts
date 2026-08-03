/**
 * @file useMarkdownConverter.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Markdown to HTML Converter & Previewer
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the MarkdownConverter component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted, getCurrentInstance } from 'vue';
import { message } from 'ant-design-vue';
import { marked } from 'marked';
import { storage } from '../../utils/storage.js';

// ---------- FUNCTION: useMarkdownConverter
export function useMarkdownConverter() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'What flavor of Markdown is supported?',
      a: 'It supports standard Markdown and GitHub Flavored Markdown (tables, task lists, strikethrough) via the Marked library.'
    }
  ];
  const compatibility = ['GitHub Flavored Markdown (GFM)', 'HTML'];
  const handleSample = () => {
    markdownInput.value = '# Hello\n\n- List item 1\n- List item 2\n\n**Bold** and *Italic*';
    renderMarkdown();
  };

  // ---------- REACTIVE STATE
  const markdownInput = ref(
    '# FreeToolshed Markdown Preview\n\nWelcome to **FreeToolshed**! Client-side utilities with zero backend.\n\n- [x] Fast & lightweight\n- [x] 100% Client-side\n- [x] Ant Design Vue Theme\n\n```js\nconsole.log("Hello, World!");\n```'
  );
  const htmlOutput = ref('');
  const viewMode = ref('preview');

  const SAMPLE_MD = `# FreeToolshed Documentation

                    ## Overview
                    FreeToolshed is a suite of **client-side developer tools**.

                    ### Key Features
                    1. **Zero backend dependencies**
                    2. **Offline ready**
                    3. **Ant Design Vue UI**

                    > Built for developers with privacy and speed in mind.
                    `;

  // ---------- METHODS
  const renderMarkdown = async () => {
    try {
      const parsed = marked.parse(markdownInput.value || '');
      htmlOutput.value = typeof parsed === 'string' ? parsed : await parsed;
    } catch (e: any) {
      htmlOutput.value = `<p style="color:red">Error parsing Markdown: ${e.message}</p>`;
    }
  };

  const loadSample = () => {
    markdownInput.value = SAMPLE_MD;
    renderMarkdown();
  };

  const handleCopy = async () => {
    if (!htmlOutput.value) return;
    const success = await storage.copyToClipboard(htmlOutput.value);
    if (success) message.success('HTML code copied to clipboard!');
  };

  const handleDownload = () => {
    if (!htmlOutput.value) return;
    const fullHtml = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Exported Markdown</title>\n</head>\n<body>\n${htmlOutput.value}\n</body>\n</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
    message.success('HTML file downloaded!');
  };

  const handleReset = () => {
    markdownInput.value = '';
    htmlOutput.value = '';
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      renderMarkdown();
    });
  } else {
    renderMarkdown();
  }

  return {
    faq,
    compatibility,
    handleSample,
    markdownInput,
    htmlOutput,
    viewMode,
    SAMPLE_MD,
    renderMarkdown,
    loadSample,
    handleCopy,
    handleDownload,
    handleReset
  };
}
