<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div style="max-width: 420px">
    <FnSkeleton :loading="loading" theme="text">
      <p style="margin: 0">文件说明已加载完成。</p>
    </FnSkeleton>
    <FnButton size="small" style="margin-top: 12px" @click="loading = !loading">{{ loading ? '显示内容' : '重新加载' }}</FnButton>
  </div>
</template>
