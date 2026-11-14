<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '文件' },
  { value: 'photos', label: '照片' },
  { value: 'shared', label: '共享' },
  { value: 'favorites', label: '收藏' },
  { value: 'settings', label: '设置' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnNavigation v-model="active" label="底部导航" mode="bottom" :max-visible="4" :items="items" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">当前入口：{{ active }}</p>
  </div>
</template>
