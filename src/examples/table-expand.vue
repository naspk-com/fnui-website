<script setup lang="ts">
import { ref } from 'vue'

const rows = [
  {
    id: 1,
    name: '家庭相册',
    children: [
      { id: 11, name: '2025 年' },
      { id: 12, name: '2026 年' },
    ],
  },
  { id: 2, name: '工作文档' },
]
const columns = [
  { key: 'name', label: '名称' },
  { key: 'id', label: '标识', width: 100 },
]
const expandedKeys = ref<(string | number)[]>([1])
</script>

<template>
  <FnTable v-model:expanded-keys="expandedKeys" row-key="id" children-key="children" :rows="rows" :columns="columns" />
</template>
