<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true">打开底部对话框</FnButton>
    <FnDialog v-model:visible="visible" title="选择同步方式" presentation="sheet" @confirm="visible = false">
      底部对话框适合移动端，操作按钮固定在面板底部。
    </FnDialog>
  </div>
</template>
