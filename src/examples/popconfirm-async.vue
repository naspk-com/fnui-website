<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const loading = ref(false)
const message = ref('')
function confirm() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    visible.value = false
    message.value = '共享链接已删除。'
  }, 900)
}
</script>

<template>
  <div>
    <FnPopconfirm v-model:visible="visible" title="删除共享链接" confirm-text="删除" :confirm-loading="loading" @confirm="confirm">
      <template #trigger><FnButton tone="danger" variant="outline">删除链接</FnButton></template>
      <p style="margin: 0; max-width: 220px">删除操作需要等待服务端确认。</p>
    </FnPopconfirm>
    <p role="status">{{ message }}</p>
  </div>
</template>
