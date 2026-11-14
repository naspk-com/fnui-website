<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1.5)
</script>

<template>
  <div style="max-width: 280px">
    <FnInputNumber v-model="value" label="备份保留版本" :step="0.5" :precision="1" />
    <p style="color: var(--fn-text-secondary); font-size: 13px">当前值：{{ value }}</p>
  </div>
</template>
