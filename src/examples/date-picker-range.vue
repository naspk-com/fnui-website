<script setup lang="ts">
import { ref } from 'vue'

const range = ref<[string | null, string | null]>(['2026-11-01', '2026-11-15'])
</script>

<template>
  <div style="max-width: 360px">
    <FnDatePicker v-model:range-value="range" range label="备份日期范围" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">{{ range[0] }} 至 {{ range[1] }}</p>
  </div>
</template>
