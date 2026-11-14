<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-11-14')
</script>

<template>
  <div style="max-width: 360px">
    <FnDatePicker
      v-model="date"
      label="选择日期"
      min="2026-11-01"
      max="2026-11-30"
      :shortcuts="[{ label: '今天', value: '2026-11-14' }, { label: '月底', value: '2026-11-30' }]"
    />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">仅可选择 11 月内的日期。</p>
  </div>
</template>
