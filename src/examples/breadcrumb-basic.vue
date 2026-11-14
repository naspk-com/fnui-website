<script setup lang="ts">
import { ref } from 'vue'

const current = ref('photos')
const items = [
  { value: 'home', label: '我的文件' },
  { value: 'photos', label: '家庭相册' },
  { value: '2026', label: '2026' },
]
</script>

<template>
  <div style="max-width: 460px">
    <FnBreadcrumb :items="items" label="文件路径" @navigate="current = String($event)" />
    <p>当前目录：{{ current }}</p>
  </div>
</template>
