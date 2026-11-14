<script setup lang="ts">
import { ref } from 'vue'

const time = ref('09:00')
const shortcuts = [
  { label: '上午 9 点', value: '09:00' },
  { label: '中午 12 点', value: '12:00' },
  { label: '晚上 22 点', value: '22:00' },
]
</script>

<template>
  <div style="max-width: 320px">
    <FnTimePicker v-model="time" label="提醒时间" :shortcuts="shortcuts" />
  </div>
</template>
