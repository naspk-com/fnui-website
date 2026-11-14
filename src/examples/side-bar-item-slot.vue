<script setup lang="ts">
import { ref } from 'vue'

const active = ref('day')
const items = [
  { value: 'day', label: '按天', count: 12 },
  { value: 'month', label: '按月', count: 4 },
  { value: 'year', label: '按年', count: 2 },
]
</script>

<template>
  <div style="max-width: 220px">
    <FnSideBar v-model="active" label="时间分组" :items="items">
      <template #item="{ item }">
        <span style="display: flex; align-items: center; justify-content: space-between; width: 100%">
          {{ item.label }}
          <span style="font-size: 12px; color: var(--fn-text-secondary)">{{ item.count }}</span>
        </span>
      </template>
    </FnSideBar>
  </div>
</template>
