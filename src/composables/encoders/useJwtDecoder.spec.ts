/**
 * @file useJwtDecoder.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Comprehensive unit tests for useJwtDecoder composable
 *
 * @description
 * Tests JWT token parsing, header and payload JSON extraction, expiration timestamp evaluation (`expDate`, `isExpired`),
 * invalid token structure error states, sample loading, and state reset.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */

import { describe, it, expect } from 'vitest';
import { useJwtDecoder } from './useJwtDecoder';

describe('useJwtDecoder composable', () => {
  it('initializes with empty token input and null decoded state', () => {
    const { jwtInput, decodedState, SAMPLE_JWT, faq, compatibility } = useJwtDecoder();
    expect(jwtInput.value).toBe('');
    expect(decodedState.value).toBeNull();
    expect(SAMPLE_JWT).toBeTruthy();
    expect(faq.length).toBeGreaterThan(0);
    expect(compatibility).toContain('JWT (JSON Web Tokens)');
  });

  it('decodes valid JWT token into header JSON, payload JSON, and signature', () => {
    const { jwtInput, decodedState, decodeJwtToken } = useJwtDecoder();
    jwtInput.value =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    decodeJwtToken();

    expect(decodedState.value?.isValid).toBe(true);
    expect(decodedState.value?.headerJson).toContain('HS256');
    expect(decodedState.value?.payloadJson).toContain('John Doe');
    expect(decodedState.value?.signature).toBe('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  });

  it('evaluates token expiration timestamp and sets expDate', () => {
    const { jwtInput, decodedState, decodeJwtToken } = useJwtDecoder();
    // Payload with exp: 2528742400 (year 2050)
    jwtInput.value =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI1Mjg3NDI0MDB9.sig';
    decodeJwtToken();

    expect(decodedState.value?.isValid).toBe(true);
    expect(decodedState.value?.isExpired).toBe(false);
    expect(decodedState.value?.expDate).not.toBeNull();
  });

  it('handles invalid JWT string format and sets isValid to false with error message', () => {
    const { jwtInput, decodedState, decodeJwtToken } = useJwtDecoder();
    jwtInput.value = 'invalid.jwt.token.string';
    decodeJwtToken();

    expect(decodedState.value?.isValid).toBe(false);
    expect(decodedState.value?.error).toBeTruthy();
  });

  it('loads sample JWT and resets state', () => {
    const { jwtInput, decodedState, loadSample, handleReset } = useJwtDecoder();
    loadSample();
    expect(jwtInput.value).toBeTruthy();
    expect(decodedState.value?.isValid).toBe(true);

    handleReset();
    expect(jwtInput.value).toBe('');
    expect(decodedState.value).toBeNull();
  });
});
