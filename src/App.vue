<template>
  <div class="page">
    <header class="hero">
      <div>
        <p class="eyebrow">SVG Color Unlock</p>
        <h1>让设计稿快速继承 currentColor</h1>
        <p class="lede">
          粘贴或上传 SVG，一键清理 fill / stroke / opacity 与内联
          style，立即获得可继承字体颜色的版本。
        </p>
      </div>
    </header>

    <section class="grid">
      <SvgInputPanel
        v-model="rawSvg"
        :busy="false"
        @clean="handleClean"
        @fileLoaded="handleFileLoaded"
      />
      <SvgPreview
        :original="rawSvg"
        :cleaned="cleanedSvg"
        :zoom="zoom"
        @zoomIn="zoomIn"
        @zoomOut="zoomOut"
        @resetZoom="resetZoom"
      />
    </section>

    <SvgOutputPanel
      :content="cleanedSvg"
      :disabled="!cleanedSvg"
      :error="error"
      @copy="handleCopy"
      @download="handleDownload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SvgInputPanel from "./components/SvgInputPanel.vue";
import SvgPreview from "./components/SvgPreview.vue";
import SvgOutputPanel from "./components/SvgOutputPanel.vue";
import { cleanSvg } from "./utils/cleanSvg";
import { downloadText } from "./utils/download";

const rawSvg = ref("");
const cleanedSvg = ref("");
const error = ref("");
const zoom = ref(2);

const clampZoom = (value: number) => Math.min(3, Math.max(0.5, value));

const zoomIn = () => {
  zoom.value = clampZoom(Number((zoom.value + 0.5).toFixed(2)));
};

const zoomOut = () => {
  zoom.value = clampZoom(Number((zoom.value - 0.5).toFixed(2)));
};

const resetZoom = () => {
  zoom.value = 2;
};

const handleClean = () => {
  if (!rawSvg.value.trim()) {
    error.value = "请先输入或上传 SVG 内容。";
    cleanedSvg.value = "";
    return;
  }

  try {
    cleanedSvg.value = cleanSvg(rawSvg.value.trim());
    error.value = "";
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "无法解析 SVG，请检查内容。";
    error.value = message;
    cleanedSvg.value = "";
  }
};

const handleFileLoaded = (content: string) => {
  rawSvg.value = content;
  error.value = "";
  cleanedSvg.value = "";
  zoom.value = 1;
};

const handleCopy = async () => {
  if (!cleanedSvg.value) return;
  await navigator.clipboard.writeText(cleanedSvg.value);
};

const handleDownload = () => {
  if (!cleanedSvg.value) return;
  downloadText(cleanedSvg.value, "color-unlocked.svg");
};
</script>
