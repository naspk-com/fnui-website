<script setup lang="ts">
import { ref } from 'vue'

const month = ref('2026-11')
const dates = ref<string[]>(['2026-11-05', '2026-11-12', '2026-11-20'])
</script>

<template>
  <div style="max-width: 460px">
    <FnCalendar v-model:month="month" v-model:selected-dates="dates" multiple label="选择多个日期" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择 {{ dates.length }} 天</p>
  </div>
</template>
