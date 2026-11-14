<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const result = ref('')
const actions = [
  { label: '忽略', value: 'ignore' },
  { label: '查看详情', value: 'detail', tone: 'primary' as const },
]
function onAction(action: { label: string }) {
  result.value = '已选择：' + action.label
}
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true">显示受控通知</FnButton>
    <FnNotification
      v-model:visible="visible"
      title="发现重复文件"
      message="有 12 个文件可能重复，可前往详情页处理。"
      tone="info"
      placement="top-right"
      :duration="0"
      :actions="actions"
      @action="onAction"
    />
    <p role="status">{{ result }}</p>
  </div>
</template>
