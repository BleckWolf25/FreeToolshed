<!--
/**
 * @file JwtDecoder.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary JWT (JSON Web Token) Decoder tool component
 *
 * @description
 * Decodes JWT header, payload, and signature client-side, checking token expiration and validity.
 *
 * @since 01/08/2026
 * @updated 02/08/2026
 */
-->
<template>
  <ToolCard
    id="jwt-decoder"
    title="JWT Token Decoder"
    description="Decode JSON Web Tokens (Header, Payload, Signature) with expiration status and signature validation."
    tier="Tier 2"
    :can-reset="true"
    @reset="handleReset"
    :has-sample="true"
    :faq="faq"
    :compatibility="compatibility"
    @sample="handleSample"
  >
    <template #icon>
      <LockOutlined />
    </template>

    <div class="jwt-tool-layout">
      <!-- JWT INPUT -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Encoded JWT Token Input</span>
          <a-button size="small" type="default" @click="loadSample">Load Sample JWT</a-button>
        </div>
        <a-textarea
          v-model:value="jwtInput"
          placeholder="Paste encoded JWT token here (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)..."
          :rows="4"
          class="code-editor"
          @input="decodeJwtToken"
        />
      </div>

      <!-- STATUS & EXPIRATION CALLOUT -->
      <div v-if="decodedState" class="status-cards">
        <a-alert
          v-if="decodedState.isValid"
          :type="decodedState.isExpired ? 'warning' : 'success'"
          show-icon
        >
          <template #message>
            <span v-if="decodedState.isExpired"
              >Token is <strong>EXPIRED</strong> (exp: {{ decodedState.expDate }})</span
            >
            <span v-else
              >Token is <strong>ACTIVE & VALID</strong> (expires:
              {{ decodedState.expDate || 'never' }})</span
            >
          </template>
        </a-alert>
        <a-alert v-else :message="decodedState.error" type="error" show-icon />
      </div>

      <!-- DECODED SECTIONS GRID -->
      <div v-if="decodedState && decodedState.isValid" class="sections-grid">
        <!-- HEADER PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">HEADER (Algorithm & Token Type)</span>
            <a-button
              type="link"
              size="small"
              @click="copySection(decodedState.headerJson || '', 'Header')"
              >Copy</a-button
            >
          </div>
          <pre class="json-code text-mono">{{ decodedState.headerJson }}</pre>
        </div>

        <!-- PAYLOAD PANEL -->
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">PAYLOAD (Claims & Data)</span>
            <a-button
              type="link"
              size="small"
              @click="copySection(decodedState.payloadJson || '', 'Payload')"
              >Copy</a-button
            >
          </div>
          <pre class="json-code text-mono">{{ decodedState.payloadJson }}</pre>
        </div>
      </div>
    </div>
  </ToolCard>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { useJwtDecoder } from '../../composables/encoders/useJwtDecoder';
import { LockOutlined } from '@ant-design/icons-vue';
import ToolCard from '../../components/ToolCard.vue';

// ---------- COMPOSABLE USAGE
const {
  faq,
  compatibility,
  handleSample,
  jwtInput,
  decodedState,
  decodeJwtToken,
  loadSample,
  copySection,
  handleReset
} = useJwtDecoder();
</script>

<style scoped>
.jwt-tool-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel {
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 13px;
}

.code-editor {
  border: none !important;
  resize: vertical;
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

.sections-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .sections-grid {
    grid-template-columns: 1fr;
  }
}

.json-code {
  padding: 16px;
  background: var(--code-bg);
  color: var(--code-text);
  margin: 0;
  border-radius: 0;
  overflow-x: auto;
  font-size: 13px;
}
</style>
