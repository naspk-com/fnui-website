<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <FnPopover v-model:visible="visible" title="目录说明" placement="bottom">
      <template #trigger>
        <FnButton variant="outline">查看说明</FnButton>
      </template>
      <p style="margin: 0; max-width: 240px">共享目录中的文件对受邀成员可见，链接默认 7 天后失效。</p>
    </FnPopover>
    <span style="color: var(--fn-text-secondary)">{{ visible ? '已展开' : '点击展开' }}</span>
  </div>
</template>
