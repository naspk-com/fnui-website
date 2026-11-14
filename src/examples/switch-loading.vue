<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FnSwitch v-model="enabled" label="自动同步" loading />
    <span style="font-size: 13px; color: var(--fn-text-secondary)">同步设置正在保存，暂时无法切换。</span>
  </div>
</template>
