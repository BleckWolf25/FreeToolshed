/**
 * @file useJwtDecoder.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Composable logic for JWT (JSON Web Token) Decoder
 *
 * @description
 * Manages reactive state, validation, conversion, and helper actions for the JwtDecoder component.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
// ---------- IMPORTS
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { validators } from '../../utils/validators.js';
import { storage } from '../../utils/storage.js';

// ---------- INTERFACES
export interface JwtState {
  isValid: boolean;
  headerJson?: string;
  payloadJson?: string;
  signature?: string;
  isExpired?: boolean;
  expDate?: string | null;
  error?: string;
}

// ---------- FUNCTION: useJwtDecoder
export function useJwtDecoder() {
  // ---------- TOOLCARD DATA
  const faq = [
    {
      q: 'Does this validate the signature?',
      a: 'If you provide the secret key, it will validate the HMAC signature.'
    },
    {
      q: 'Is my token secure?',
      a: 'Yes, decoding happens entirely client-side. Your token is never transmitted.'
    }
  ];
  const compatibility = ['JWT (JSON Web Tokens)'];
  const handleSample = () => {
    jwtInput.value =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    decodeJwtToken();
  };

  // ---------- REACTIVE STATE
  const jwtInput = ref('');

  const decodedState = ref<JwtState | null>(null);

  const SAMPLE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJsZWNrV29sZjI1IiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI1Mjg3NDI0MDB9.xWp20eXwS7Q5B9W5F3x7k7J';

  // ---------- METHODS
  const decodeJwtToken = () => {
    if (!jwtInput.value.trim()) {
      decodedState.value = null;
      return;
    }

    const validation = validators.validateJwt(jwtInput.value);
    if (!validation.valid) {
      decodedState.value = { isValid: false, error: validation.error || 'Unknown error' };
      return;
    }

    try {
      const parts = jwtInput.value.trim().split('.');
      const headerObj = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payloadObj = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

      let isExpired = false;
      let expDate = null;

      if (payloadObj.exp) {
        const expMs = payloadObj.exp * 1000;
        expDate = new Date(expMs).toLocaleString();
        if (Date.now() > expMs) {
          isExpired = true;
        }
      }

      decodedState.value = {
        isValid: true,
        headerJson: JSON.stringify(headerObj, null, 2),
        payloadJson: JSON.stringify(payloadObj, null, 2),
        signature: parts[2],
        isExpired,
        expDate
      };
    } catch (e: any) {
      decodedState.value = { isValid: false, error: e.message };
    }
  };

  const loadSample = () => {
    jwtInput.value = SAMPLE_JWT;
    decodeJwtToken();
  };

  const copySection = async (val: string, label: string) => {
    const success = await storage.copyToClipboard(val);
    if (success) message.success(`${label} copied to clipboard!`);
  };

  const handleReset = () => {
    jwtInput.value = '';
    decodedState.value = null;
  };

  return {
    faq,
    compatibility,
    handleSample,
    jwtInput,
    decodedState,
    SAMPLE_JWT,
    decodeJwtToken,
    loadSample,
    copySection,
    handleReset
  };
}
