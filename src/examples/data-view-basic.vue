<script setup lang="ts">
import { ref } from 'vue'

const selection = ref<(string | number)[]>([])
const sort = ref<{ key: string; direction: 'asc' | 'desc' } | null>(null)
const rows = [
  { id: 1, name: '家庭相册', kind: '文件夹', size: '—', updated: '今天 10:28' },
  { id: 2, name: '工作文档', kind: '文件夹', size: '—', updated: '昨天 18:02' },
  { id: 3, name: '归档备份.zip', kind: '压缩包', size: '2.4 GB', updated: '11 月 12 日' },
  { id: 4, name: '项目计划.pdf', kind: '文档', size: '1.2 MB', updated: '11 月 10 日' },
]
const columns = [
  { key: 'name', label: '名称', sortable: true },
  { key: 'kind', label: '类型', width: 110 },
  { key: 'size', label: '大小', width: 100 },
  { key: 'updated', label: '更新时间', width: 150, sortable: true },
]
</script>

<template>
  <FnDataView :rows="rows" row-key="id" :columns="columns" selectable v-model:selection="selection" v-model:sort="sort" />
</template>
