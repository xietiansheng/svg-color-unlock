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
      <a
        class="github-btn"
        href="https://github.com/xietiansheng/svg-color-unlock"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.55 7.55 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
          />
        </svg>
        <span>GitHub</span>
      </a>
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
