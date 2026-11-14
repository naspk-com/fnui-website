<script setup lang="ts">
import { ref } from 'vue'

const checked = ref<string[]>([])
const items = [
  { value: 'docs', label: '文档', children: [{ value: 'work', label: '工作' }, { value: 'personal', label: '个人' }] },
  { value: 'photos', label: '照片' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnTree v-model:checked-values="checked" label="同步目录" :items="items" multiple cascade />
    <p>已选择：{{ checked.join('、') || '无' }}</p>
  </div>
</template>
