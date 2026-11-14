<script setup lang="ts">
import { ref } from 'vue'

const value = ref('0.0001')
</script>

<template>
  <div style="max-width: 280px">
    <FnInputNumberExact v-model="value" label="精度步进" step="0.0001" />
    <p style="color: var(--fn-text-secondary); font-size: 13px">当前值：{{ value }}</p>
  </div>
</template>
