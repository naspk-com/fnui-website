<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('')
const options = [
  { value: 'image', label: '图片' },
  { value: 'video', label: '视频' },
  { value: 'document', label: '文档' },
  { value: 'audio', label: '音频' },
  { value: 'archive', label: '压缩包' },
  { value: 'other', label: '其他文件' },
]
</script>
<template>
  <div style="max-width: 420px">
    <FnSelect v-model="selected" label="文件类型" :options="options" searchable clearable />
    <p>已选择：{{ selected || '无' }}</p>
  </div>
</template>
