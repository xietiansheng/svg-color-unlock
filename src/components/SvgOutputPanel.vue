<template>
  <div class="card output-card">
    <div class="card-head">
      <div>
        <p class="label">输出区</p>
        <h3>可复制 / 可下载</h3>
      </div>
      <span class="chip success" v-if="content">已生成</span>
    </div>

    <p class="error" v-if="error">{{ error }}</p>

    <textarea
      class="textarea output"
      readonly
      :value="content"
      placeholder="清理后的 SVG 会出现在这里"
    ></textarea>

    <div class="actions">
      <div class="tips">输出遵循 currentColor，可直接嵌入图标库或 UI 组件。</div>
      <div class="action-buttons">
        <button class="ghost-btn" type="button" @click="onCopy" :disabled="disabled">复制</button>
        <button class="primary-btn" type="button" @click="$emit('download')" :disabled="disabled">
          下载 SVG
        </button>
      </div>
    </div>

    <p class="status" v-if="status">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  content: string;
  disabled?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'copy'): void;
  (e: 'download'): void;
}>();

const status = ref('');

const onCopy = async () => {
  if (props.disabled || !props.content) return;
  try {
    await emit('copy');
    status.value = '已复制到剪贴板';
    setTimeout(() => (status.value = ''), 2000);
  } catch (err) {
    status.value = '复制失败，请重试';
  }
};
</script>
