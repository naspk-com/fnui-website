<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <FnTooltip v-model:visible="visible" title="延迟提示" trigger="hover" :open-delay="400" :close-delay="300">
      <template #trigger><FnButton variant="outline">悬停查看</FnButton></template>
      <p style="margin: 0">提示会在悬停 400 毫秒后出现。</p>
    </FnTooltip>
    <span style="color: var(--fn-text-secondary)">{{ visible ? '显示中' : '待悬停' }}</span>
  </div>
</template>
