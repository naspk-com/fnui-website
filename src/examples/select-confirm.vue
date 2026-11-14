<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<(string | number)[]>(['photos'])
const options = [
  { value: 'photos', label: '照片' },
  { value: 'videos', label: '视频' },
  { value: 'docs', label: '文档' },
  { value: 'music', label: '音乐' },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnSelect v-model="selected" label="同步类型" multiple commit-mode="confirm" :options="options" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择 {{ selected.length }} 项</p>
  </div>
</template>
