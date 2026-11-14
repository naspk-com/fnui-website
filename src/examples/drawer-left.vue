<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton @click="visible = true">打开左侧抽屉</FnButton>
    <FnDrawer v-model:visible="visible" title="文件详情" placement="left" size="320px">
      <p style="margin: 0">家庭相册 · 3.2 GB · 最近更新于今天 10:28</p>
    </FnDrawer>
  </div>
</template>
