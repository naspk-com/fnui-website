<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
</script>

<template>
  <div>
    <FnPopconfirm v-model:visible="visible" title="删除共享链接" confirm-text="删除" cancel-text="取消" @confirm="message = '链接已删除'" @cancel="message = '已取消'">
      <template #trigger>
        <FnButton tone="danger" variant="outline">删除链接</FnButton>
      </template>
      <p style="margin: 0; max-width: 220px">删除后，已分享的链接会立即失效。</p>
    </FnPopconfirm>
    <p role="status">{{ message }}</p>
  </div>
</template>
