<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '我的文件', icon: 'folder' },
  { value: 'shared', label: '共享空间', icon: 'share-1' },
  { value: 'trash', label: '回收站', icon: 'delete' },
]
</script>

<template>
  <div style="max-width: 260px">
    <FnMenu v-model="active" label="空间导航" :items="items">
      <template #item="{ item, active: selected }">
        <span style="display: inline-flex; align-items: center; gap: 8px">
          <FnIcon :name="item.icon" :size="18" />
          {{ item.label }}
          <strong v-if="selected" style="margin-left: 4px; font-size: 11px">当前</strong>
        </span>
      </template>
    </FnMenu>
  </div>
</template>
