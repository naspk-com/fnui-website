<script setup lang="ts">
import { ref } from 'vue'

const checked = ref<(string | number)[]>(['work'])
const items = [
  { value: 'docs', label: '文档', children: [{ value: 'work', label: '工作' }, { value: 'personal', label: '个人' }] },
  { value: 'photos', label: '照片' },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnTree v-model:checked-values="checked" label="同步目录" :items="items" multiple />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择 {{ checked.length }} 项</p>
  </div>
</template>
