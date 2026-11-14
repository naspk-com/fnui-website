<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const items = [
  { value: 'select', label: '选择目录' },
  { value: 'options', label: '设置选项' },
  { value: 'confirm', label: '确认执行' },
]
</script>

<template>
  <div style="max-width: 320px">
    <FnSteps v-model:current="current" :items="items" orientation="vertical" clickable />
  </div>
</template>
