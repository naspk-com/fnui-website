<script setup lang="ts">
import { ref } from 'vue'

const checked = ref<(string | number)[]>(['photos'])
const options = [
  { value: 'vol1', label: '存储空间 1', children: [{ value: 'photos', label: '照片' }, { value: 'docs', label: '文档' }] },
  { value: 'vol2', label: '存储空间 2', children: [{ value: 'media', label: '影音' }] },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnTreeSelect v-model:checked-values="checked" label="授权目录" :options="options" multiple />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已授权 {{ checked.length }} 个目录</p>
  </div>
</template>
