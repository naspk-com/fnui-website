<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string | number | null>('docs')
const options = [
  { value: 'vol1', label: '存储空间 1', children: [{ value: 'photos', label: '照片' }, { value: 'docs', label: '文档' }] },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnCascader v-model="selected" label="备份目录" :options="options" clearable clear-text="清除目录" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择：{{ selected ?? '无' }}</p>
  </div>
</template>
