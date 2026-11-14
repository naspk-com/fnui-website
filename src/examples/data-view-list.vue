<script setup lang="ts">
const rows = [
  { id: 1, name: '家庭相册', type: '文件夹' },
  { id: 2, name: '项目资料.pdf', type: '文档' },
  { id: 3, name: '演示视频.mp4', type: '视频' },
]
const columns = [
  { key: 'name', label: '名称' },
  { key: 'type', label: '类型' },
]
</script>

<template>
  <FnDataView row-key="id" mode="list" :rows="rows" :columns="columns" />
</template>
