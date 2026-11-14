<script setup lang="ts">
import { ref } from 'vue'

const name = ref('家庭相册')
</script>

<template>
  <div style="max-width: 420px">
    <FnInput v-model="name" clearable placeholder="输入文件夹名称" :input-attrs="{ 'aria-label': '文件夹名称' }" />
    <p>当前名称：{{ name || '未输入' }}</p>
  </div>
</template>
