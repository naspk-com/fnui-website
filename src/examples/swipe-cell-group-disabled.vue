<script setup lang="ts">
import { ref } from 'vue'

const openKey = ref('')
const rows = [
  { id: 'a', name: '系统目录', disabled: true },
  { id: 'b', name: '家庭相册', disabled: false },
]
const actions = [{ value: 'delete', label: '删除' }]
</script>

<template>
  <FnSwipeCellGroup style="width: 100%">
    <FnSwipeCell
      v-for="row in rows"
      :key="row.id"
      :open="openKey === row.id"
      label="文件操作"
      :actions="actions"
      :disabled="row.disabled"
      @update:open="openKey = $event ? row.id : ''"
    >
      <div style="padding: 16px">{{ row.name }}</div>
    </FnSwipeCell>
  </FnSwipeCellGroup>
</template>
