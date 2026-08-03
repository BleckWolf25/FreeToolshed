/**
 * @file useCronExplainer.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useCronExplainer composable
 *
 * @description
 * Tests cron expression parsing into human-readable text, next 5 execution dates calculation,
 * preset loading, invalid cron error reporting, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useCronExplainer } from './useCronExplainer';

describe('useCronExplainer composable', () => {
  it('initializes with default state and parses initial cron expression', () => {
    const { cronExpression, humanExplanation, nextDates, cronError, PRESETS } = useCronExplainer();
    expect(cronExpression.value).toBe('*/15 * * * *');
    expect(PRESETS.length).toBe(4);
  });

  it('parses valid cron expression into human explanation and next 5 dates', () => {
    const { cronExpression, humanExplanation, nextDates, cronError, parseCron } =
      useCronExplainer();
    cronExpression.value = '0 9 * * 1-5';
    parseCron();

    expect(cronError.value).toBe('');
    expect(humanExplanation.value).toBeTruthy();
    expect(humanExplanation.value.toLowerCase()).toContain('09:00');
    expect(nextDates.value.length).toBe(5);
  });

  it('displays error message when parsing invalid cron expression', () => {
    const { cronExpression, humanExplanation, nextDates, cronError, parseCron } =
      useCronExplainer();
    cronExpression.value = 'invalid cron string';
    parseCron();

    expect(cronError.value).toContain('Invalid Cron Expression');
    expect(humanExplanation.value).toBe('');
    expect(nextDates.value.length).toBe(0);
  });

  it('loads preset schedules and parses them automatically', () => {
    const { cronExpression, humanExplanation, loadPreset } = useCronExplainer();
    loadPreset('0 0 * * *');

    expect(cronExpression.value).toBe('0 0 * * *');
    expect(humanExplanation.value).toBeTruthy();
  });

  it('loads sample cron expression and resets state', () => {
    const { cronExpression, humanExplanation, nextDates, handleSample, handleReset } =
      useCronExplainer();
    handleSample();
    expect(cronExpression.value).toBe('0 9 * * 1-5');

    handleReset();
    expect(cronExpression.value).toBe('');
    expect(humanExplanation.value).toBe('');
    expect(nextDates.value).toEqual([]);
  });
});
