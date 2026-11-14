<script setup lang="ts">
import { ref } from 'vue'

const selection = ref<(string | number)[]>([])
const items = [
  { id: 1, name: '家庭相册', kind: 'directory' as const },
  { id: 2, name: '工作文档', kind: 'directory' as const },
  { id: 3, name: '项目计划.pdf', kind: 'file' as const },
  { id: 4, name: '归档备份.zip', kind: 'file' as const, disabled: true },
]
const crumbs = [
  { id: 0, label: '我的文件' },
  { id: 1, label: '2026' },
]
const lastOpened = ref('')
</script>

<template>
  <FnFileBrowser v-model:selection="selection" :items="items" :breadcrumbs="crumbs" mode="list" @open="lastOpened = $event.name" />
  <p role="status">{{ lastOpened ? `已打开：${lastOpened}` : '选择文件或打开目录。' }}</p>
</template>
