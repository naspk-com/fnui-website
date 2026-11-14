<script setup lang="ts">
import { ref } from 'vue'

const title = ref('家庭相册备份')
</script>

<template>
  <div style="max-width: 360px">
    <FnTypography v-model="title" as="h3" editable edit-label="编辑标题" save-label="保存" cancel-label="取消" />
    <p style="color: var(--fn-text-secondary); font-size: 13px">当前标题：{{ title }}</p>
  </div>
</template>
