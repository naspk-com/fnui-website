<script setup lang="ts">
import { useFnToast } from '@naspk/fnui/core'

const toast = useFnToast()
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <FnButton tone="primary" @click="toast.success('文件已保存')">保存成功</FnButton>
    <FnButton tone="danger" variant="outline" @click="toast.error('共享链接已失效')">错误提示</FnButton>
  </div>
</template>
