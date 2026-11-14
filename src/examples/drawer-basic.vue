<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <FnButton @click="visible = true">查看详情</FnButton>
  <FnDrawer v-model:visible="visible" title="共享设置">
    <p style="margin: 0; color: var(--fn-text-secondary)">调整成员权限，或复制共享链接发送给其他人。</p>
    <template #footer>
      <FnButton size="small" tone="primary" @click="visible = false">完成</FnButton>
    </template>
  </FnDrawer>
</template>
