<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const items = [
  {
    value: 'share',
    label: '共享',
    children: [
      { value: 'member', label: '共享给成员' },
      { value: 'link', label: '复制共享链接' },
    ],
  },
  { value: 'download', label: '下载到本地' },
]
</script>

<template>
  <div>
    <FnButton @click="visible = true">更多操作</FnButton>
    <FnActionSheet v-model:visible="visible" title="文件操作" :items="items" @select="message = '已选择：' + $event" />
    <p role="status">{{ message }}</p>
  </div>
</template>
