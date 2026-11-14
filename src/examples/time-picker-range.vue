<script setup lang="ts">
import { ref } from 'vue'

const range = ref<[string | null, string | null]>(['09:00', '18:00'])
</script>

<template>
  <div style="max-width: 360px">
    <FnTimePicker v-model:range-value="range" range label="允许同步时段" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">{{ range[0] }} 至 {{ range[1] }}</p>
  </div>
</template>
