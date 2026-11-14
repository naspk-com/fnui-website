<script setup lang="ts">
import { ref } from 'vue'

const path = ref<string | null>(null)
const options = [
  { value: 'vol1', label: '存储空间 1', children: [
    { value: 'photos', label: '照片' },
    { value: 'videos', label: '视频' },
  ] },
  { value: 'vol2', label: '存储空间 2', children: [
    { value: 'backup', label: '备份' },
  ] },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnCascader v-model="path" :options="options" label="选择目录" clearable />
    <p>已选择：{{ path ?? '未选择' }}</p>
  </div>
</template>
