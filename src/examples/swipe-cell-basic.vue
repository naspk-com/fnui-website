<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const message = ref('向右滑动单元格可以显示操作。')
const actions = [
  { value: 'share', label: '共享' },
  { value: 'delete', label: '删除' },
]
</script>

<template>
  <div style="width: 100%">
    <FnSwipeCell v-model:open="open" label="文件操作" :actions="actions" @action="message = `已选择：${$event}`">
      <div style="padding: 16px">家庭相册</div>
    </FnSwipeCell>
    <p role="status">{{ message }}</p>
  </div>
</template>
