<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <FnLoading :loading="loading" size="32px" text="正在加载目录" />
    <FnLoading :loading="loading" size="48px" text="正在整理文件" />
    <FnButton size="small" @click="loading = !loading">{{ loading ? '停止' : '重新加载' }}</FnButton>
  </div>
</template>
