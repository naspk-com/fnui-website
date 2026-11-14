<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '文件' },
  { value: 'shared', label: '共享' },
  { value: 'favorites', label: '收藏' },
  { value: 'trash', label: '回收站' },
]
</script>

<template>
  <div style="max-width: 520px">
    <FnNavigation v-model="active" mode="sidebar" label="应用导航" :items="items" />
    <p>当前页面：{{ items.find(item => item.value === active)?.label }}</p>
  </div>
</template>
