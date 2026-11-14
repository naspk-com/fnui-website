<script setup lang="ts">
const items = [
  { id: 1, name: '家庭相册', kind: 'directory' as const },
  { id: 2, name: '工作文档', kind: 'directory' as const },
  { id: 3, name: '项目计划.pdf', kind: 'file' as const },
  { id: 4, name: '归档备份.zip', kind: 'file' as const },
]
</script>

<template>
  <FnFileBrowser :items="items" mode="grid" />
</template>
