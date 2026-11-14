<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const actions = [
  { value: 'share', label: '共享' },
  { value: 'delete', label: '删除' },
]
</script>

<template>
  <div style="width: 100%">
    <FnSwipeCell v-model:open="open" label="文件操作" :actions="actions" :action-width="96">
      <div style="padding: 16px">工作文档</div>
    </FnSwipeCell>
  </div>
</template>
