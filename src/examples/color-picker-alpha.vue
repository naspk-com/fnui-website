<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#3b82f680')
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <FnColorPicker v-model="color" label="背景遮罩" mode="alpha" />
    <span style="font-size: 13px; color: var(--fn-text-secondary)">带透明度的颜色：{{ color }}</span>
  </div>
</template>
