<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)
const items = [
  { value: 'one', label: '第一步' },
  { value: 'two', label: '第二步' },
  { value: 'three', label: '第三步' },
]
</script>

<template>
  <div style="max-width: 520px">
    <FnSteps v-model:current="current" :items="items" clickable />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">当前步骤：{{ current + 1 }}</p>
  </div>
</template>
