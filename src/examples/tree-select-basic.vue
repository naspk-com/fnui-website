<script setup lang="ts">
import { ref } from 'vue'

const node = ref<string | null>(null)
const options = [
  { value: 'vol1', label: '存储空间 1', children: [
    { value: 'photos', label: '照片' },
    { value: 'docs', label: '文档' },
  ] },
  { value: 'vol2', label: '存储空间 2', children: [
    { value: 'media', label: '影视' },
  ] },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnTreeSelect v-model="node" :options="options" label="选择目录" searchable clearable />
    <p>已选择：{{ node ?? '未选择' }}</p>
  </div>
</template>
