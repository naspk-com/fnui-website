<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const items = [
  { value: 'share', label: '共享给成员' },
  { value: 'link', label: '复制共享链接' },
  { value: 'move', label: '移动到其他目录' },
  { value: 'delete', label: '删除', disabled: true },
]
function select(value: string | number) {
  message.value = `已选择：${items.find(item => item.value === value)?.label}`
  visible.value = false
}
</script>

<template>
  <div>
    <FnButton @click="visible = true">更多操作</FnButton>
    <FnActionSheet v-model:visible="visible" title="文件操作" :items="items" @select="select" />
    <p role="status">{{ message }}</p>
  </div>
</template>
