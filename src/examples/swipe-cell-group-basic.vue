<script setup lang="ts">
import { ref } from 'vue'

const firstOpen = ref(false)
const secondOpen = ref(false)
const actions = [
  { value: 'share', label: '共享' },
  { value: 'delete', label: '删除' },
]
const message = ref('滑动单元格可以显示操作。')
</script>

<template>
  <div style="width: 100%">
    <FnSwipeCellGroup>
      <FnSwipeCell v-model:open="firstOpen" label="家庭相册" :actions="actions" @action="message = `家庭相册：${$event}`">
        <div style="padding: 16px">家庭相册</div>
      </FnSwipeCell>
      <FnSwipeCell v-model:open="secondOpen" label="工作文档" :actions="actions" @action="message = `工作文档：${$event}`">
        <div style="padding: 16px">工作文档</div>
      </FnSwipeCell>
    </FnSwipeCellGroup>
    <p role="status">{{ message }}</p>
  </div>
</template>
