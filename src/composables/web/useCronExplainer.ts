/**
 * @file useCronExplainer.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for Cron Expression Parser & Explainer
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the CronExplainer component.
 * Uses cronstrue for human readable descriptions and cron-parser for next execution dates.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import { ref, watch, onMounted } from 'vue';
import cronstrue from 'cronstrue';
import cronParser from 'cron-parser';

// ---------- FUNCTION: useCronExplainer
export function useCronExplainer() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'What happens if my cron is invalid?',
      a: 'The tool will display a parsing error indicating which field is incorrectly formatted.'
    }
  ];
  const compatibility = ['Standard Cron (5 fields)', 'Extended Cron (6 fields)'];
  const handleSample = () => {
    cronExpression.value = '0 9 * * 1-5';
    parseCron();
  };

  // ---------- REACTIVE STATE
  const cronExpression = ref('*/15 * * * *');
  const humanExplanation = ref('');
  const cronError = ref('');
  const nextDates = ref<string[]>([]);

  const PRESETS = [
    { label: 'Every 5 Minutes', exp: '*/5 * * * *' },
    { label: 'Every Hour', exp: '0 * * * *' },
    { label: 'Daily at Midnight', exp: '0 0 * * *' },
    { label: 'Weekdays at 9 AM', exp: '0 9 * * 1-5' }
  ];

  // Helper to parse interval across different cron-parser module export targets
  const getCronInterval = (exp: string) => {
    const cp = cronParser as any;
    if (cp && cp.CronExpressionParser && typeof cp.CronExpressionParser.parse === 'function') {
      return cp.CronExpressionParser.parse(exp);
    }
    if (cp && typeof cp.parse === 'function') {
      return cp.parse(exp);
    }
    if (cp && typeof cp.parseExpression === 'function') {
      return cp.parseExpression(exp);
    }
    throw new Error('cron-parser engine could not be initialized');
  };

  // ---------- METHODS
  const parseCron = () => {
    cronError.value = '';
    humanExplanation.value = '';
    nextDates.value = [];

    const exp = cronExpression.value.trim();
    if (!exp) return;

    try {
      // Human readable text
      humanExplanation.value = cronstrue.toString(exp, {
        use24HourTimeFormat: true
      });

      // Next scheduled execution dates
      const interval = getCronInterval(exp);
      const dates: string[] = [];
      for (let i = 0; i < 5; i++) {
        dates.push(interval.next().toString());
      }
      nextDates.value = dates;
    } catch (e: any) {
      cronError.value = 'Invalid Cron Expression: ' + (e.message || e);
    }
  };

  const loadPreset = (exp: string) => {
    cronExpression.value = exp;
    parseCron();
  };

  const handleReset = () => {
    cronExpression.value = '';
    humanExplanation.value = '';
    nextDates.value = [];
    cronError.value = '';
  };

  watch(cronExpression, () => {
    parseCron();
  });

  onMounted(() => {
    parseCron();
  });

  return {
    faq,
    compatibility,
    handleSample,
    cronExpression,
    humanExplanation,
    cronError,
    nextDates,
    PRESETS,
    parseCron,
    loadPreset,
    handleReset
  };
}
