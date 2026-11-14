<script setup lang="ts">
import { ref } from 'vue'

const active = ref('A')
const groups = [
  { key: 'A', items: [{ value: 'a1', label: '安装包' }, { value: 'a2', label: '备份归档' }] },
  { key: 'B', items: [{ value: 'b1', label: '笔记' }, { value: 'b2', label: '表格' }] },
  { key: 'C', items: [{ value: 'c1', label: '照片' }] },
]
</script>

<template>
  <div style="width: 100%; max-width: 420px">
    <FnIndexes :groups="groups" label="文件索引" index-label="索引" :height="260" track-active @active-change="active = String($event)" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">当前分组：{{ active }}</p>
  </div>
</template>
