<template>
  <div class="card preview-card">
    <div class="card-head">
      <div>
        <p class="label">预览区</p>
        <h3>左右对比</h3>
      </div>
      <div class="zoom-controls">
        <span class="chip">即时查看原始 vs 清理后</span>
        <div class="zoom-buttons">
          <button class="ghost-btn zoom-btn" type="button" @click="$emit('zoomOut')">-</button>
          <span class="zoom-display">{{ (zoom * 100).toFixed(0) }}%</span>
          <button class="ghost-btn zoom-btn" type="button" @click="$emit('zoomIn')">+</button>
          <button class="ghost-btn zoom-reset" type="button" @click="$emit('resetZoom')">
            重置
          </button>
        </div>
      </div>
    </div>

    <div class="preview-grid">
      <div class="preview-column">
        <div class="column-head">原始 SVG</div>
        <div class="preview-box">
          <div v-if="original" class="svg-holder" :style="zoomStyle" v-html="original"></div>
          <div v-else class="placeholder">等待输入...</div>
        </div>
      </div>
      <div class="preview-column">
        <div class="column-head">清理后</div>
        <div class="preview-box">
          <div v-if="cleaned" class="svg-holder" :style="zoomStyle" v-html="cleaned"></div>
          <div v-else class="placeholder">点击“清理 SVG”查看结果</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  original: string;
  cleaned: string;
  zoom: number;
}>();

defineEmits<{
  (e: "zoomIn"): void;
  (e: "zoomOut"): void;
  (e: "resetZoom"): void;
}>();

const zoomStyle = computed(() => ({
  transform: `scale(${props.zoom})`,
}));
</script>
