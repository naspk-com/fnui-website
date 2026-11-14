<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const loading = ref(false)
function confirm() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    visible.value = false
  }, 1200)
}
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true">删除共享链接</FnButton>
    <FnDialog v-model:visible="visible" title="删除共享链接" :confirm-loading="loading" confirm-text="确认删除" @confirm="confirm">
      删除后，已分享的链接会立即失效，且无法恢复。
    </FnDialog>
  </div>
</template>
