<script setup lang="ts">
const avatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%233b82f6'/%3E%3Ccircle cx='32' cy='26' r='12' fill='%23fff' opacity='.9'/%3E%3C/svg%3E"
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <FnAvatar :src="avatar" alt="用户头像" :size="48" />
    <span style="font-size: 13px; color: var(--fn-text-secondary)">使用图片作为头像内容。</span>
  </div>
</template>
