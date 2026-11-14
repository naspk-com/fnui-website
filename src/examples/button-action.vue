<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <FnButton tone="primary" @click="count++">开始备份</FnButton>
    <span>已点击 {{ count }} 次</span>
  </div>
</template>
