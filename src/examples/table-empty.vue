<script setup lang="ts">
const columns = [
  { key: 'name', label: '名称' },
  { key: 'type', label: '类型', width: 100 },
]
</script>

<template>
  <FnTable row-key="id" :rows="[]" :columns="columns" empty-text="还没有任何共享文件" />
</template>
