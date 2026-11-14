<script setup lang="ts">
import { ref } from 'vue'

const current = ref('2026')
const items = [
  { value: 'home', label: '我的文件' },
  { value: 'photos', label: '家庭相册' },
  { value: 'travel', label: '旅行' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
]
</script>

<template>
  <div style="max-width: 520px">
    <FnBreadcrumb :items="items" label="文件路径" :max-items="3" more-text="更多路径" @navigate="current = String($event)" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">当前目录：{{ current }}</p>
  </div>
</template>
