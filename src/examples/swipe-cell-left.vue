<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const message = ref('')
const actions = [{ value: 'favorite', label: '收藏' }]
const leftActions = [{ value: 'read', label: '标记已读' }]
</script>

<template>
  <div style="width: 100%">
    <FnSwipeCell v-model:open="open" label="文件操作" :actions="actions" :left-actions="leftActions" @action="message = '已选择：' + $event">
      <div style="padding: 16px">家庭相册</div>
    </FnSwipeCell>
    <p role="status">{{ message || '左右滑动可显示两侧操作。' }}</p>
  </div>
</template>
