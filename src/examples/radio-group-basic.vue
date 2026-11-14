<script setup lang="ts">
import { ref } from 'vue'

const frequency = ref('daily')
const items = [
  { value: 'hourly', label: '每小时' },
  { value: 'daily', label: '每天' },
  { value: 'weekly', label: '每周' },
]
</script>

<template>
  <div style="max-width: 380px">
    <FnRadioGroup v-model="frequency">
      <FnRadio v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</FnRadio>
    </FnRadioGroup>
    <p>备份频率：{{ items.find(item => item.value === frequency)?.label }}</p>
  </div>
</template>
