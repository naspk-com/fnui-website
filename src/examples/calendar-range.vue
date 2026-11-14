<script setup lang="ts">
import { ref } from 'vue'

const month = ref('2026-11')
const range = ref<[string | null, string | null]>(['2026-11-03', '2026-11-09'])
</script>

<template>
  <div style="max-width: 460px">
    <FnCalendar v-model:month="month" v-model:range-value="range" range label="备份周期" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">{{ range[0] }} 至 {{ range[1] }}</p>
  </div>
</template>
