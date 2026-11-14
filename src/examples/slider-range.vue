<script setup lang="ts">
import { ref } from 'vue'

const value = ref<[number, number]>([20, 70])
</script>

<template>
  <div style="max-width: 420px">
    <FnSlider v-model:range-value="value" range label="上传带宽" show-value />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">带宽范围：{{ value[0] }}% - {{ value[1] }}%</p>
  </div>
</template>
