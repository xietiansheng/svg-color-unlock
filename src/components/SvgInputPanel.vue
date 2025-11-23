<template>
  <div class="card">
    <div class="card-head">
      <div>
        <p class="label">输入区</p>
        <h3>粘贴或上传原始 SVG</h3>
      </div>
      <button class="ghost-btn" type="button" @click="triggerUpload">
        上传 SVG
      </button>
      <input ref="fileInput" type="file" accept=".svg" class="hidden-input" @change="onFileChange" />
    </div>

    <textarea
      :value="modelValue"
      class="textarea"
      placeholder='<svg viewBox="0 0 24 24" ...>...</svg>'
      @input="onInput"
    ></textarea>

    <div class="actions">
      <div class="tips">会自动移除 fill / stroke / style 等阻断继承的属性</div>
      <button class="primary-btn" type="button" @click="$emit('clean')" :disabled="busy">
        {{ busy ? '处理中...' : '清理 SVG' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  busy?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'clean'): void;
  (e: 'fileLoaded', value: string): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const triggerUpload = () => {
  fileInput.value?.click();
};

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const text = await file.text();
  emit('update:modelValue', text);
  emit('fileLoaded', text);
  target.value = '';
};
</script>
