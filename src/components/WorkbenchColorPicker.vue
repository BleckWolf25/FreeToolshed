<!--
/**
 * @file WorkbenchColorPicker.vue
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary In-app brutalist color picker with 2D Saturation/Value gradient canvas and Hue spectrum slider
 *
 * @description
 * 100% in-app visual custom color picker matching the "Blueprint & Rugged Workbench" theme.
 * Completely replaces OS-native color picker dialogs with an interactive 2D color spectrum,
 * hue slider, preset swatches, and manual HEX input.
 *
 * @since 03/08/2026
 * @updated 03/08/2026
 */
-->
<template>
  <div class="workbench-color-picker">
    <a-popover
      v-model:open="popoverOpen"
      trigger="click"
      placement="bottomLeft"
      overlayClassName="hard-edged-color-popover"
    >
      <template #content>
        <div class="picker-popover-content">
          <!-- HEADER -->
          <div class="picker-header">
            <span class="picker-title-stamp">[COLOR_PALETTE]</span>
            <kbd class="kbd-key" @click="popoverOpen = false">ESC</kbd>
          </div>

          <!-- 2D SATURATION / VALUE SPECTRUM CANVAS -->
          <div
            ref="spectrumRef"
            class="spectrum-canvas"
            :style="{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }"
            @mousedown="startSpectrumDrag"
          >
            <div class="spectrum-white-overlay"></div>
            <div class="spectrum-black-overlay"></div>
            <div
              class="spectrum-handle"
              :style="{ left: `${hsv.s}%`, top: `${100 - hsv.v}%` }"
            ></div>
          </div>

          <!-- HUE SPECTRUM SLIDER -->
          <div ref="hueSliderRef" class="hue-slider-bar" @mousedown="startHueDrag">
            <div class="hue-slider-handle" :style="{ left: `${(hsv.h / 360) * 100}%` }"></div>
          </div>

          <!-- PRESET SWATCHES -->
          <div class="swatches-section">
            <span class="section-label">PRESET WORKBENCH SWATCHES</span>
            <div class="swatch-grid">
              <div
                v-for="swatch in presetSwatches"
                :key="swatch"
                :class="[
                  'swatch-item',
                  { active: currentColor.toUpperCase() === swatch.toUpperCase() }
                ]"
                :style="{ backgroundColor: swatch }"
                :title="swatch"
                @click="selectSwatch(swatch)"
              >
                <CheckOutlined
                  v-if="currentColor.toUpperCase() === swatch.toUpperCase()"
                  class="swatch-check"
                />
              </div>
            </div>
          </div>

          <!-- MANUAL HEX INPUT -->
          <div class="manual-input-section">
            <span class="section-label">HEX VALUE</span>
            <div class="hex-input-row">
              <div class="color-preview-box" :style="{ backgroundColor: currentColor }"></div>
              <span class="hash-prefix">#</span>
              <input
                v-model="rawHexInput"
                type="text"
                maxlength="6"
                class="hex-text-input block-cursor"
                @input="handleHexTyping"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- COLOR TRIGGER BUTTON -->
      <button type="button" class="color-trigger-btn">
        <span class="trigger-swatch" :style="{ backgroundColor: currentColor }"></span>
        <span class="trigger-hex-text">{{ currentColor.toUpperCase() }}</span>
      </button>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
// ---------- IMPORTS
import { ref, watch, onUnmounted } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';

// ---------- PROPS & EMITS
const props = defineProps({
  value: {
    type: String,
    default: '#1890FF'
  },
  modelValue: {
    type: String,
    default: undefined
  }
});

const emit = defineEmits(['update:modelValue', 'update:value', 'change']);

// ---------- COLOR MATH HELPERS
function hsvToHex(h: number, s: number, v: number): string {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3)
    clean = clean
      .split('')
      .map((x) => x + x)
      .join('');
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) clean = '1890FF';

  const num = parseInt(clean, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

// ---------- REACTIVE STATE
const popoverOpen = ref(false);
const initialHex = props.modelValue ?? props.value ?? '#1890FF';
const currentColor = ref(initialHex.startsWith('#') ? initialHex : '#' + initialHex);
const rawHexInput = ref(currentColor.value.replace('#', ''));
const hsv = ref(hexToHsv(currentColor.value));

const spectrumRef = ref<HTMLDivElement | null>(null);
const hueSliderRef = ref<HTMLDivElement | null>(null);
let isDraggingSpectrum = false;
let isDraggingHue = false;

const presetSwatches = [
  '#1C1C1C', // Charcoal
  '#FFFFFF', // Stark White
  '#7A7A7A', // Toolbox Grey
  '#333333', // Blueprint Line
  '#1890FF', // Primary Blue
  '#52C41A', // Success Green
  '#FA8C16', // Warning Orange
  '#722ED1', // Purple
  '#EB2F96', // Pink
  '#F5222D', // Safety Red
  '#FAAD14', // Yellow
  '#13C2C2' // Cyan
];

// ---------- WATCHERS
watch(
  () => props.modelValue ?? props.value,
  (newVal) => {
    if (newVal && newVal !== currentColor.value) {
      const formatted = newVal.startsWith('#') ? newVal : '#' + newVal;
      currentColor.value = formatted;
      rawHexInput.value = formatted.replace('#', '');
      hsv.value = hexToHsv(formatted);
    }
  }
);

// ---------- EMIT UPDATES
const emitColorChange = (hex: string) => {
  currentColor.value = hex;
  rawHexInput.value = hex.replace('#', '');
  emit('update:modelValue', hex);
  emit('update:value', hex);
  emit('change', hex);
};

// ---------- 2D SPECTRUM DRAG HANDLERS
const updateSpectrumFromEvent = (e: MouseEvent) => {
  if (!spectrumRef.value) return;
  const rect = spectrumRef.value.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

  const s = Math.round((x / rect.width) * 100);
  const v = Math.round((1 - y / rect.height) * 100);

  hsv.value.s = s;
  hsv.value.v = v;
  const newHex = hsvToHex(hsv.value.h, hsv.value.s, hsv.value.v);
  emitColorChange(newHex);
};

const startSpectrumDrag = (e: MouseEvent) => {
  isDraggingSpectrum = true;
  updateSpectrumFromEvent(e);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', stopDrag);
};

// ---------- HUE SLIDER DRAG HANDLERS
const updateHueFromEvent = (e: MouseEvent) => {
  if (!hueSliderRef.value) return;
  const rect = hueSliderRef.value.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
  const h = Math.round((x / rect.width) * 360) % 360;

  hsv.value.h = h;
  const newHex = hsvToHex(hsv.value.h, hsv.value.s, hsv.value.v);
  emitColorChange(newHex);
};

const startHueDrag = (e: MouseEvent) => {
  isDraggingHue = true;
  updateHueFromEvent(e);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', stopDrag);
};

const onMouseMove = (e: MouseEvent) => {
  if (isDraggingSpectrum) updateSpectrumFromEvent(e);
  if (isDraggingHue) updateHueFromEvent(e);
};

const stopDrag = () => {
  isDraggingSpectrum = false;
  isDraggingHue = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', stopDrag);
};

onUnmounted(() => {
  stopDrag();
});

// ---------- MANUAL INPUTS & SWATCHES
const selectSwatch = (hex: string) => {
  hsv.value = hexToHsv(hex);
  emitColorChange(hex);
};

const handleHexTyping = () => {
  const clean = rawHexInput.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
  rawHexInput.value = clean;
  if (clean.length === 6 || clean.length === 3) {
    const formatted = '#' + clean;
    hsv.value = hexToHsv(formatted);
    emitColorChange(formatted);
  }
};
</script>

<style scoped>
.workbench-color-picker {
  display: inline-block;
  font-family: var(--font-family);
}

.color-trigger-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border-strong);
  padding: 4px 10px;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  height: 36px;
  transition: none;
  user-select: none;
}

.color-trigger-btn:hover {
  background: var(--invert-bg);
  color: var(--invert-text);
  border-color: var(--border-strong);
}

.trigger-swatch {
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-strong);
  flex-shrink: 0;
}

.trigger-hex-text {
  letter-spacing: 0.05em;
}

/* POPOVER STYLES */
:deep(.hard-edged-color-popover .ant-popover-inner) {
  border: 2px solid var(--border-strong) !important;
  box-shadow: 6px 6px 0px var(--border-strong) !important;
  padding: 0 !important;
  background: var(--card-bg) !important;
  border-radius: 0 !important;
}

.picker-popover-content {
  width: 248px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: var(--font-family);
  user-select: none;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 6px;
}

.picker-title-stamp {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.05em;
}

/* 2D SPECTRUM CANVAS */
.spectrum-canvas {
  position: relative;
  width: 100%;
  height: 140px;
  border: 1px solid var(--border-strong);
  cursor: crosshair;
}

.spectrum-white-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #fff, transparent);
}

.spectrum-black-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #000, transparent);
}

.spectrum-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #ffffff;
  outline: 1px solid #000000;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* HUE SLIDER BAR */
.hue-slider-bar {
  position: relative;
  width: 100%;
  height: 16px;
  border: 1px solid var(--border-strong);
  background: linear-gradient(
    to right,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
  cursor: pointer;
}

.hue-slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  border: 1px solid var(--border-strong);
  background: #ffffff;
  transform: translateX(-50%);
  pointer-events: none;
}

.section-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.08em;
  margin-bottom: 6px;
  display: block;
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}

.swatch-item {
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid var(--border-strong);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none;
}

.swatch-item:hover {
  transform: scale(1.1);
  z-index: 2;
}

.swatch-check {
  font-size: 12px;
  color: #ffffff;
  text-shadow: 0 0 2px #000000;
}

.manual-input-section {
  border-top: 1px solid var(--border-color);
  padding-top: 10px;
}

.hex-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-strong);
  padding: 4px 8px;
}

.color-preview-box {
  width: 22px;
  height: 22px;
  border: 1px solid var(--border-strong);
  flex-shrink: 0;
}

.hash-prefix {
  font-weight: 700;
  color: var(--text-secondary);
}

.hex-text-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
}
</style>
