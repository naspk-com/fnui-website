<script setup lang="ts">
const items = [
  { value: 'select', label: '选择目录' },
  { value: 'verify', label: '校验权限', status: 'error' as const },
  { value: 'finish', label: '开始备份' },
]
</script>

<template>
  <div style="max-width: 520px">
    <FnSteps :items="items" :current="1" />
  </div>
</template>
