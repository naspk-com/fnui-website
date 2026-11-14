<script setup lang="ts">
import { ref } from 'vue'

const value = ref(30)
</script>

<template>
  <div style="max-width: 420px">
    <FnSlider v-model="value" label="限速" disabled show-value />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">限速策略由管理员统一配置，暂不可调整。</p>
  </div>
</template>
