<script setup lang="ts">
import { ref } from 'vue'

const selection = ref<(string | number)[]>([])
const rows = [
  { id: 1, name: '工作文档', type: '文件夹', updated: '今天 10:28' },
  { id: 2, name: '家庭相册', type: '文件夹', updated: '昨天 22:10' },
  { id: 3, name: '归档备份.zip', type: '压缩包', updated: '11 月 12 日' },
]
const columns = [
  { key: 'name', label: '名称' },
  { key: 'type', label: '类型', width: 100 },
  { key: 'updated', label: '更新时间', width: 140 },
]
</script>

<template>
  <FnTable v-model:selection="selection" row-key="id" :rows="rows" :columns="columns" selectable>
    <template #cell="{ column, value }">
      <FnTag v-if="column.key === 'type'">{{ value }}</FnTag>
      <span v-else>{{ value }}</span>
    </template>
  </FnTable>
</template>
