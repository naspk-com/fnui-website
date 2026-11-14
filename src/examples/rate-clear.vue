<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <div>
    <FnRate v-model="value" label="文件整理评分" allow-clear />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">再次点击已选星级可清除评分，当前 {{ value }} 星。</p>
  </div>
</template>
