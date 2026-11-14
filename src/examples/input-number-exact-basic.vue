<script setup lang="ts">
import { ref } from 'vue'

const amount = ref('1.25')
</script>

<template>
  <div style="max-width: 320px">
    <FnInputNumberExact v-model="amount" label="精确数值" min="0" max="100" step="0.25" />
    <p>当前值：{{ amount ?? '未填写' }}</p>
    <p style="color: var(--fn-text-secondary)">使用字符串保存小数，避免浮点误差。</p>
  </div>
</template>
