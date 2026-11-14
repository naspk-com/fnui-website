<script setup lang="ts">
import { useFnToast } from '@naspk/fnui/core'

const toast = useFnToast()
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <FnButton @click="toast.show({ message: '顶部提示', position: 'top' })">顶部</FnButton>
    <FnButton @click="toast.show({ message: '居中提示', position: 'center' })">居中</FnButton>
    <FnButton @click="toast.show({ message: '底部提示', position: 'bottom' })">底部</FnButton>
  </div>
</template>
