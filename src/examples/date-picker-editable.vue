<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-11-14')
</script>

<template>
  <div style="max-width: 360px">
    <FnDatePicker v-model="date" label="备份日期" editable placeholder="YYYY-MM-DD" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择：{{ date || '未选择' }}</p>
  </div>
</template>
