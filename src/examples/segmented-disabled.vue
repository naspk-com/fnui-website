<script setup lang="ts">
import { ref } from 'vue'

const view = ref('all')
const items = [
  { value: 'all', label: '全部' },
  { value: 'photos', label: '照片' },
  { value: 'videos', label: '视频', disabled: true },
]
</script>

<template>
  <div style="padding: 8px 0">
    <FnSegmented v-model="view" label="文件类型" :items="items" />
  </div>
</template>
