/**
 * @file useDiffChecker.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Text Diff Comparison
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the DiffChecker component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref, onMounted } from 'vue';
import DiffMatchPatch from 'diff-match-patch';

// ---------- FUNCTION: useDiffChecker
export function useDiffChecker() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'How does the comparison work?',
      a: 'It uses the diff-match-patch algorithm to compute the exact differences at the character or word level.'
    }
  ];
  const compatibility = ['Plain Text', 'Source Code'];
  const handleSample = () => {
    text1.value = 'The quick brown fox jumps over the lazy dog.';
    text2.value = 'The fast brown fox leaps over the lazy dog.';
    computeDiff();
  };

  // ---------- REACTIVE STATE
  const text1 = ref(
    'function calculateTotal(items) {\n  let total = 0;\n  for (let item of items) {\n    total += item.price;\n  }\n  return total;\n}'
  );
  const text2 = ref(
    'function calculateTotal(items, discount = 0) {\n  let total = 0;\n  for (let item of items) {\n    total += item.price;\n  }\n  return total - discount;\n}'
  );

  const diffHtml = ref('');
  const diffStats = ref<{ additions: number; deletions: number } | null>(null);

  const dmp = new DiffMatchPatch();

  // ---------- METHODS
  const computeDiff = () => {
    if (!text1.value && !text2.value) {
      diffHtml.value = '';
      diffStats.value = null;
      return;
    }

    const diffs = dmp.diff_main(text1.value || '', text2.value || '');
    dmp.diff_cleanupSemantic(diffs);

    let additions = 0;
    let deletions = 0;
    let html = '';

    diffs.forEach((part: any) => {
      const [operation, text] = part;
      const escapedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');

      if (operation === 1) {
        // Insertion
        additions += text.length;
        html += `<span class="diff-add">${escapedText}</span>`;
      } else if (operation === -1) {
        // Deletion
        deletions += text.length;
        html += `<span class="diff-del">${escapedText}</span>`;
      } else {
        html += `<span class="diff-equal">${escapedText}</span>`;
      }
    });

    diffHtml.value = html;
    diffStats.value = { additions, deletions };
  };

  const loadSample = () => {
    text1.value = '// Version 1.0\nconst app = {\n  name: "FreeToolshed",\n  version: 1\n};';
    text2.value =
      '// Version 2.0\nconst app = {\n  name: "FreeToolshed Client Suite",\n  version: 2,\n  offline: true\n};';
    computeDiff();
  };

  const handleReset = () => {
    text1.value = '';
    text2.value = '';
    diffHtml.value = '';
    diffStats.value = null;
  };

  onMounted(() => {
    computeDiff();
  });

  return {
    faq,
    compatibility,
    handleSample,
    text1,
    text2,
    diffHtml,
    diffStats,
    dmp,
    computeDiff,
    loadSample,
    handleReset
  };
}
