<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true">显示受控提示</FnButton>
    <FnToast v-model:visible="visible" message="这是一条由组件状态控制的提示" tone="success" :duration="0" closable />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">duration 为 0 时不会自动关闭，可使用关闭按钮隐藏。</p>
  </div>
</template>
