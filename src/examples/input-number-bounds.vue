<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <div style="max-width: 280px">
    <FnInputNumber v-model="value" label="保留份数" :min="1" :max="10" />
    <p style="color: var(--fn-text-secondary); font-size: 13px">取值范围 1 到 10，当前 {{ value }} 份。</p>
  </div>
</template>
