<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '文件' },
  { value: 'photos', label: '照片' },
  { value: 'videos', label: '视频' },
  { value: 'shared', label: '共享' },
  { value: 'favorites', label: '收藏' },
  { value: 'trash', label: '回收站' },
]
</script>

<template>
  <div style="max-width: 260px">
    <FnNavigation v-model="active" label="空间导航" mode="sidebar" :items="items" />
  </div>
</template>
