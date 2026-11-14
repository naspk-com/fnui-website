<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string | number | null>('work')
const items = [
  { value: 'docs', label: '文档', children: [{ value: 'work', label: '工作' }, { value: 'personal', label: '个人' }] },
  { value: 'photos', label: '照片', children: [{ value: 'travel', label: '旅行' }, { value: 'family', label: '家庭' }] },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnTree v-model="selected" label="选择目录" :items="items" searchable search-placeholder="搜索目录" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">当前目录：{{ selected ?? '未选择' }}</p>
  </div>
</template>
