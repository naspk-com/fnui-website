<script setup lang="ts">
import { ref } from 'vue'

const selected = ref(true)
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center">
    <FnTag v-model:checked="selected" selectable tone="primary">仅显示图片</FnTag>
    <FnTag selectable disabled>仅显示视频</FnTag>
    <span style="font-size: 13px; color: var(--fn-text-secondary)">{{ selected ? '已筛选图片' : '未筛选' }}</span>
  </div>
</template>
