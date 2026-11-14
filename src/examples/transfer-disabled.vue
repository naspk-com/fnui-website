<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string[]>(['docs'])
const items = [
  { value: 'photos', label: '照片' },
  { value: 'docs', label: '文档' },
]
</script>

<template>
  <div style="width: 100%; max-width: 640px">
    <FnTransfer v-model="selected" :items="items" source-label="可选目录" target-label="已授权" disabled />
  </div>
</template>
