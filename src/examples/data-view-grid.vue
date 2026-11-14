<script setup lang="ts">
const rows = [
  { id: 1, name: '家庭相册', type: '文件夹' },
  { id: 2, name: '项目资料', type: '文件夹' },
  { id: 3, name: '旅行照片.zip', type: '压缩包' },
  { id: 4, name: '演示视频.mp4', type: '视频' },
]
const columns = [
  { key: 'name', label: '名称' },
  { key: 'type', label: '类型' },
]
</script>

<template>
  <FnDataView row-key="id" mode="grid" :rows="rows" :columns="columns" />
</template>
