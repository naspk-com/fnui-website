<script setup lang="ts">
import { ref } from 'vue'

const rows = [
  { id: 1, name: '家庭相册', type: '文件夹' },
  { id: 2, name: '工作文档', type: '文件夹' },
  { id: 3, name: '旅行照片.zip', type: '压缩包' },
  { id: 4, name: '项目资料.pdf', type: '文档' },
  { id: 5, name: '演示视频.mp4', type: '视频' },
  { id: 6, name: '背景音乐.mp3', type: '音频' },
]
const columns = [
  { key: 'name', label: '名称' },
  { key: 'type', label: '类型', width: 100 },
]
const page = ref(1)
const pageSize = ref(2)
</script>

<template>
  <FnTable
    row-key="id"
    :rows="rows"
    :columns="columns"
    :pagination="{ page, pageSize, pageSizeOptions: [2, 4, 6] }"
    @update:page="page = $event"
    @update:page-size="pageSize = $event"
  />
</template>
