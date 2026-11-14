<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#3b82f6')
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <FnColorPicker v-model="color" label="主题颜色" :swatches="['#3b82f6', '#10b981', '#f59e0b', '#ef4444']" />
    <span style="font-size: 13px; color: var(--fn-text-secondary)">当前颜色：{{ color }}</span>
  </div>
</template>
