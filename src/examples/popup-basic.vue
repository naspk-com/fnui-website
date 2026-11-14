<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton @click="visible = true">打开共享设置</FnButton>
    <FnPopup v-model:visible="visible" title="共享设置">
      <p style="margin: 0; color: var(--fn-text-secondary)">从底部弹出的轻量面板，适合移动端操作确认。</p>
      <template #footer>
        <FnButton size="small" tone="primary" @click="visible = false">完成</FnButton>
      </template>
    </FnPopup>
  </div>
</template>
