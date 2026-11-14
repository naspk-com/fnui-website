<script setup lang="ts">
import { ref } from 'vue'

const value = ref(65)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 24px; height: 200px">
    <FnSlider v-model="value" label="音量" orientation="vertical" show-value />
    <span style="font-size: 13px; color: var(--fn-text-secondary)">当前音量：{{ value }}%</span>
  </div>
</template>
