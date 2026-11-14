<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div style="max-width: 420px">
    <FnSkeleton :loading="loading" theme="avatar">
      <div style="display: flex; align-items: center; gap: 12px">
        <FnAvatar alt="林岚" :size="40">林</FnAvatar>
        <span>林岚 · 家庭成员</span>
      </div>
    </FnSkeleton>
    <FnButton size="small" style="margin-top: 12px" @click="loading = !loading">{{ loading ? '显示内容' : '重新加载' }}</FnButton>
  </div>
</template>
