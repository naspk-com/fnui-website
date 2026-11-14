<script setup lang="ts">
import { computed, ref } from 'vue'

type Row = { id: number; name: string; size: number; updated: string }
const rows: Row[] = [
  { id: 1, name: '家庭相册', size: 3.2, updated: '11 月 12 日' },
  { id: 2, name: '工作文档', size: 0.8, updated: '11 月 14 日' },
  { id: 3, name: '影音资源', size: 12.6, updated: '11 月 10 日' },
]
const columns = [
  { key: 'name', label: '名称' },
  { key: 'size', label: '大小 (GB)', width: 120, sortable: true },
  { key: 'updated', label: '更新时间', width: 140, sortable: true },
]
const sort = ref<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'size', direction: 'asc' })
const sortedRows = computed(() => {
  const current = sort.value
  if (!current) return rows
  const key = current.key as keyof Row
  const direction = current.direction === 'asc' ? 1 : -1
  return [...rows].sort((left, right) => {
    const a = left[key]
    const b = right[key]
    if (typeof a === 'number' && typeof b === 'number') return (a - b) * direction
    return String(a).localeCompare(String(b)) * direction
  })
})
</script>

<template>
  <FnTable v-model:sort="sort" row-key="id" :rows="sortedRows" :columns="columns" />
</template>
