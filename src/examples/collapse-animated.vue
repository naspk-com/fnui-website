<script setup lang="ts">
import { ref } from 'vue'

const open = ref<string[]>([])
const items = [
  { value: 'first', label: '什么是增量备份？' },
  { value: 'second', label: '如何恢复历史版本？' },
]
</script>

<template>
  <div style="max-width: 460px">
    <FnCollapse v-model="open" :items="items" animated lazy>
      <template #content="{ item }">
        <p style="margin: 0; color: var(--fn-text-secondary)">
          {{ item.value === 'first' ? '只备份发生变化的部分，节省空间与时间。' : '在版本记录中选择目标时间点即可恢复。' }}
        </p>
      </template>
    </FnCollapse>
  </div>
</template>
