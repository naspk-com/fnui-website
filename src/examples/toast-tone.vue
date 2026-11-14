<script setup lang="ts">
import { useFnToast } from '@naspk/fnui/core'

const toast = useFnToast()
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <FnButton variant="outline" @click="toast.info('正在同步文件', { closable: true })">信息</FnButton>
    <FnButton variant="outline" @click="toast.success('同步已完成', { closable: true })">成功</FnButton>
    <FnButton variant="outline" @click="toast.warning('剩余空间不足', { closable: true })">警告</FnButton>
    <FnButton variant="outline" @click="toast.error('同步失败，请重试', { closable: true })">错误</FnButton>
  </div>
</template>
