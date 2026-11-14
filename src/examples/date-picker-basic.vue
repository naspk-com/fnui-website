<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-11-14')
</script>

<template>
  <div style="max-width: 320px">
    <FnDatePicker v-model="date" label="备份日期" :shortcuts="[{ label: '今天', value: '2026-11-14' }]" />
    <p>已选择：{{ date || '未选择' }}</p>
  </div>
</template>
