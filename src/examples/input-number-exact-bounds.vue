<script setup lang="ts">
import { ref } from 'vue'

const value = ref('12.5')
</script>

<template>
  <div style="max-width: 280px">
    <FnInputNumberExact v-model="value" label="配额" min="0" max="100" step="0.5" />
    <p style="color: var(--fn-text-secondary); font-size: 13px">范围 0 - 100，当前 {{ value }}。</p>
  </div>
</template>
