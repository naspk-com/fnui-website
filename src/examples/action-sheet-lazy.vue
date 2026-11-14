<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const items = [
  { value: 'share', label: '共享给成员' },
  { value: 'more', label: '加载更多操作', lazy: true },
]
async function loadChildren() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { value: 'rename', label: '重命名' },
    { value: 'move', label: '移动' },
  ]
}
</script>

<template>
  <div>
    <FnButton @click="visible = true">更多操作</FnButton>
    <FnActionSheet v-model:visible="visible" title="文件操作" :items="items" :load-children="loadChildren" @select="message = '已选择：' + $event" />
    <p role="status">{{ message }}</p>
  </div>
</template>
