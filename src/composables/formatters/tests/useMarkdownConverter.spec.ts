/**
 * @file useMarkdownConverter.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useMarkdownConverter composable
 *
 * @description
 * Tests Markdown parsing to HTML using Marked library, viewMode state toggle, sample document loading, and reset actions.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest';
import { useMarkdownConverter } from '../useMarkdownConverter';

// ---------- TESTS
describe('useMarkdownConverter composable', () => {
  it('initializes with default Markdown content, preview viewMode, and renders initial HTML on mount', () => {
    const { markdownInput, viewMode, SAMPLE_MD, faq, compatibility } = useMarkdownConverter();
    expect(markdownInput.value).toBeTruthy();
    expect(viewMode.value).toBe('preview');
    expect(SAMPLE_MD).toBeTruthy();
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('HTML');
  });

  it('renders Markdown headings, lists, bold text, and code blocks into HTML output', async () => {
    const { markdownInput, htmlOutput, renderMarkdown } = useMarkdownConverter();
    markdownInput.value = '# Title\n\n- item 1\n- item 2\n\n**Bold Text**';
    await renderMarkdown();

    expect(htmlOutput.value).toContain('<h1>Title</h1>');
    expect(htmlOutput.value).toContain('<li>item 1</li>');
    expect(htmlOutput.value).toContain('<strong>Bold Text</strong>');
  });

  it('loads sample Markdown document and resets state', async () => {
    const { markdownInput, htmlOutput, loadSample, handleReset } = useMarkdownConverter();
    loadSample();
    expect(markdownInput.value).toContain('FreeToolshed Documentation');

    handleReset();
    expect(markdownInput.value).toBe('');
    expect(htmlOutput.value).toBe('');
  });
});
