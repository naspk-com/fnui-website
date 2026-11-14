<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <div style="max-width: 460px">
    <FnAlert v-model:visible="visible" title="同步已完成" tone="success" closable>共处理 326 个文件，没有冲突。</FnAlert>
    <FnButton v-if="!visible" size="small" style="margin-top: 12px" @click="visible = true">重新显示提示</FnButton>
  </div>
</template>
