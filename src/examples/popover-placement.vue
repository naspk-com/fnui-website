<script setup lang="ts">
import { ref } from 'vue'

const top = ref(false)
const right = ref(false)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 24px">
    <FnPopover v-model:visible="top" title="上方气泡" placement="top">
      <template #trigger><FnButton variant="outline">上方</FnButton></template>
      <p style="margin: 0">气泡显示在触发元素上方。</p>
    </FnPopover>
    <FnPopover v-model:visible="right" title="右侧气泡" placement="right">
      <template #trigger><FnButton variant="outline">右侧</FnButton></template>
      <p style="margin: 0">气泡显示在触发元素右侧。</p>
    </FnPopover>
  </div>
</template>
