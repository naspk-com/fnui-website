<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <FnTooltip v-model:visible="visible" title="提示" trigger="hover">
      <template #trigger>
        <FnButton variant="outline">备份策略</FnButton>
      </template>
      <p style="margin: 0; max-width: 220px">每天凌晨执行增量备份，成功后发送通知。</p>
    </FnTooltip>
    <span style="color: var(--fn-text-secondary)">悬停查看说明</span>
  </div>
</template>
