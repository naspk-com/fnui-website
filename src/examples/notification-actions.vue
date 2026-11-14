<script setup lang="ts">
import { ref } from 'vue'
import { useFnNotification } from '@naspk/fnui/core'

const notification = useFnNotification()
const result = ref('')
function show() {
  notification.show({
    title: '需要更新备份策略',
    message: '检测到新的目录，是否立即加入备份？',
    tone: 'warning',
    actions: [
      { label: '稍后处理', value: 'later' },
      { label: '立即加入', value: 'sync', tone: 'primary' },
    ],
    onAction(action) {
      result.value = '已选择：' + action.label
    },
  })
}
</script>

<template>
  <div>
    <FnButton tone="warning" @click="show">显示带操作的通知</FnButton>
    <p role="status">{{ result }}</p>
  </div>
</template>
