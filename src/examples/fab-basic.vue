<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div style="position: relative; width: 100%; min-height: 160px">
    <p>点击右下角按钮创建文件夹。</p>
    <p role="status">已创建 {{ count }} 次</p>
    <div style="position: absolute; right: 16px; bottom: 16px">
      <FnFab label="新建文件夹" @click="count++">+</FnFab>
    </div>
  </div>
</template>
