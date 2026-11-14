<script setup lang="ts">
import { ref } from 'vue'

const active = ref('all')
const items = [
  { value: 'all', label: '全部' },
  { value: 'photos', label: '照片' },
  { value: 'videos', label: '视频' },
  { value: 'docs', label: '文档' },
  { value: 'audio', label: '音频' },
]
</script>

<template>
  <FnTabs v-model="active" label="文件类型" :items="items">
    <template #panel="{ item }"><p style="margin: 0">正在查看「{{ item.label }}」分类。</p></template>
  </FnTabs>
</template>
