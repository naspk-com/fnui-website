<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-11-16')
function isWeekend(value: string) {
  const day = new Date(value + 'T00:00:00').getDay()
  return day === 0 || day === 6
}
</script>

<template>
  <div style="max-width: 360px">
    <FnDatePicker v-model="date" label="仅在工作日备份" :disabled-value="isWeekend" disabled-value-text="周末不执行备份" />
  </div>
</template>
