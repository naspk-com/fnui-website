<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string | number | null>(null)
const options = [
  { value: 'photos', label: '照片' },
  { value: 'videos', label: '视频' },
]
</script>

<template>
  <div style="max-width: 360px">
    <FnSelect v-model="selected" label="标签" placeholder="搜索或输入新标签" searchable allow-create :options="options" clearable />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择：{{ selected ?? '无' }}</p>
  </div>
</template>
