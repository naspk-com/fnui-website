<script setup lang="ts">
import { ref } from 'vue'

const open = ref<string[]>(['basic'])
const items = [
  { value: 'basic', label: '基础设置' },
  { value: 'advanced', label: '高级设置（不可用）', disabled: true },
]
</script>

<template>
  <div style="max-width: 460px">
    <FnCollapse v-model="open" :items="items">
      <template #content="{ item }">
        <p style="margin: 0; color: var(--fn-text-secondary)">{{ item.label }}的内容。</p>
      </template>
    </FnCollapse>
  </div>
</template>
