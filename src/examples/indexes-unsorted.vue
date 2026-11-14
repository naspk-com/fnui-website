<script setup lang="ts">
const groups = [
  { key: 'C', items: [{ value: 'c1', label: '照片' }] },
  { key: 'A', items: [{ value: 'a1', label: '安装包' }, { value: 'a2', label: '备份归档' }] },
  { key: 'B', items: [{ value: 'b1', label: '笔记' }] },
]
</script>

<template>
  <div style="width: 100%; max-width: 420px">
    <FnIndexes :groups="groups" label="文件索引" index-label="索引" :height="260" />
  </div>
</template>
