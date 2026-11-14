<script setup lang="ts">
import { ref } from 'vue'

const time = ref('09:30:00')
</script>

<template>
  <div style="max-width: 320px">
    <FnTimePicker v-model="time" label="执行时间" seconds />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择：{{ time }}</p>
  </div>
</template>
