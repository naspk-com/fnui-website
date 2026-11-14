<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
const visible = ref(false)
</script>

<template>
  <div>
    <FnTooltip v-model:visible="visible" title="不可用提示" :disabled="disabled">
      <template #trigger><FnButton variant="outline">禁用提示</FnButton></template>
      <p style="margin: 0">当 disabled 为 true 时不会打开。</p>
    </FnTooltip>
    <FnButton size="small" variant="text" @click="disabled = !disabled">{{ disabled ? '启用提示' : '禁用提示' }}</FnButton>
  </div>
</template>
