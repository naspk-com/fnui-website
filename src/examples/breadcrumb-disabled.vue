<script setup lang="ts">
const items = [
  { value: 'home', label: '我的文件' },
  { value: 'locked', label: '已锁定目录', disabled: true },
  { value: '2026', label: '2026' },
]
</script>

<template>
  <FnBreadcrumb :items="items" label="文件路径" />
</template>
