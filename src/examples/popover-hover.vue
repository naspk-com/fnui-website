<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <FnPopover v-model:visible="visible" title="容量说明" trigger="hover">
      <template #trigger>
        <FnTag tone="primary">剩余空间</FnTag>
      </template>
      <p style="margin: 0; max-width: 220px">存储空间共享给全部家庭成员，剩余空间会随上传实时变化。</p>
    </FnPopover>
    <span style="color: var(--fn-text-secondary)">{{ visible ? '已展开' : '悬停查看' }}</span>
  </div>
</template>
