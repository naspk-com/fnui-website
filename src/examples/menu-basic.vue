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
  <div style="max-width: 240px">
    <FnMenu v-model="active" label="文件导航" :items="items" />
    <p>当前分区：{{ active }}</p>
  </div>
</template>
