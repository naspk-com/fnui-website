<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div style="max-width: 420px">
    <FnSkeleton :loading="loading" theme="paragraph">
      <p style="margin: 0">文件列表已加载完成，共 128 个项目。</p>
    </FnSkeleton>
    <FnButton size="small" style="margin-top: 16px" @click="loading = !loading">{{ loading ? '显示内容' : '重新加载' }}</FnButton>
  </div>
</template>
