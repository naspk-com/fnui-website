<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
const marks = [
  { value: 0, label: '低' },
  { value: 50, label: '中' },
  { value: 100, label: '高' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnSlider v-model="value" label="压缩质量" :marks="marks" show-value />
  </div>
</template>
