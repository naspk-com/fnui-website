<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
</script>
<template>
  <div style="max-width: 420px">
    <FnTextarea v-model="text" placeholder="添加说明" :input-attrs="{ 'aria-label': '说明', rows: 3 }" />
    <p>已输入 {{ text.length }} 个字符</p>
  </div>
</template>
