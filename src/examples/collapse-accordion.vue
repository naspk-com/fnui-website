<script setup lang="ts">
import { ref } from 'vue'

const open = ref<string[]>(['permission'])
const items = [
  { value: 'permission', label: '权限设置' },
  { value: 'schedule', label: '执行计划' },
  { value: 'notify', label: '通知设置' },
]
</script>

<template>
  <div style="max-width: 460px">
    <FnCollapse v-model="open" :items="items" accordion>
      <template #content="{ item }">
        <p style="margin: 0; color: var(--fn-text-secondary)">{{ item.label }}的配置内容。</p>
      </template>
    </FnCollapse>
  </div>
</template>
