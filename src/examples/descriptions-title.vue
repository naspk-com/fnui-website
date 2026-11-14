<script setup lang="ts">
const items = [
  { label: '任务名称', value: '家庭相册备份' },
  { label: '源目录', value: '/vol1/Photos' },
  { label: '目标目录', value: '/vol2/Backup' },
]
</script>

<template>
  <div style="max-width: 480px">
    <FnDescriptions title="备份任务" :items="items" />
  </div>
</template>
