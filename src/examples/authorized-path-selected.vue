<script setup lang="ts">
import { ref } from 'vue'

const path = ref<string | null>('/vol1/Photos/2026')
</script>

<template>
  <div style="max-width: 460px">
    <FnAuthorizedPathField v-model="path" label="备份源目录" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已授权路径会以文字形式展示，可随时清除。</p>
  </div>
</template>
