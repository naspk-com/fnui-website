<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div style="max-width: 420px">
    <FnLoading :loading="loading" text="正在同步文件">
      <div style="min-height: 88px; padding: 12px; border: 1px solid var(--fn-border); border-radius: 8px">家庭相册已同步 128 个项目。</div>
    </FnLoading>
    <FnButton size="small" style="margin-top: 16px" @click="loading = !loading">{{ loading ? '完成同步' : '重新同步' }}</FnButton>
  </div>
</template>
