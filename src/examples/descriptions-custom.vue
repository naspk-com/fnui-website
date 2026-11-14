<script setup lang="ts">
const items = [
  { label: '任务状态', value: '已完成' },
  { label: '同步范围', value: '照片、视频' },
]
</script>

<template>
  <div style="max-width: 480px">
    <FnDescriptions :items="items">
      <template #value="{ item, index }">
        <FnTag v-if="index === 0" tone="success">{{ item.value }}</FnTag>
        <span v-else>{{ item.value }}</span>
      </template>
    </FnDescriptions>
  </div>
</template>
