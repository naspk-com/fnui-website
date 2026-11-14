<script setup lang="ts">
import { useFnNotification } from '@naspk/fnui/core'

const notification = useFnNotification()
</script>

<template>
  <FnButton
    tone="primary"
    @click="notification.success('备份完成', { message: '共处理 326 个文件，未发现冲突。' })"
  >
    发送通知
  </FnButton>
</template>
