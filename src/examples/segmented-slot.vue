<script setup lang="ts">
import { ref } from 'vue'

const view = ref('list')
const items = [
  { value: 'list', label: '列表', icon: 'view-list' },
  { value: 'grid', label: '网格', icon: 'grid-view' },
]
</script>

<template>
  <div style="padding: 8px 0">
    <FnSegmented v-model="view" label="展示方式" :items="items">
      <template #item="{ item }">
        <span style="display: inline-flex; align-items: center; gap: 6px">
          <FnIcon :name="item.icon" :size="16" />
          {{ item.label }}
        </span>
      </template>
    </FnSegmented>
  </div>
</template>
