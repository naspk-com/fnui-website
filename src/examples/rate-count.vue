<script setup lang="ts">
import { ref } from 'vue'

const value = ref(7.5)
</script>

<template>
  <div>
    <FnRate v-model="value" :count="10" label="推荐指数" allow-half />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">支持 10 星与半星，当前 {{ value }} 星。</p>
  </div>
</template>
