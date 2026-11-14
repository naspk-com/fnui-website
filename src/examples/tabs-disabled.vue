<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '文件' },
  { value: 'shared', label: '共享' },
  { value: 'trash', label: '回收站', disabled: true },
]
</script>

<template>
  <FnTabs v-model="active" label="文件分类" :items="items">
    <template #panel="{ item }"><p style="margin: 0">{{ item.label }}的内容</p></template>
  </FnTabs>
</template>
