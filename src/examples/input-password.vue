<script setup lang="ts">
import { ref } from 'vue'

const value = ref('fnos-2026')
const visible = ref(false)
</script>

<template>
  <div style="max-width: 360px">
    <FnInput v-model="value" :type="visible ? 'text' : 'password'" placeholder="请输入访问密码" />
    <FnButton size="small" variant="text" style="margin-top: 8px" @click="visible = !visible">{{ visible ? '隐藏密码' : '显示密码' }}</FnButton>
  </div>
</template>
