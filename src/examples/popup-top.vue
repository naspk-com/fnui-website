<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton @click="visible = true">从顶部弹出</FnButton>
    <FnPopup v-model:visible="visible" title="系统通知" placement="top" size="220px">
      <p style="margin: 0">备份任务已完成，共处理 326 个文件。</p>
    </FnPopup>
  </div>
</template>
