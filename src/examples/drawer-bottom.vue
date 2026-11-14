<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton @click="visible = true">打开底部抽屉</FnButton>
    <FnDrawer v-model:visible="visible" title="排序方式" placement="bottom" size="240px">
      <p style="margin: 0">按名称、更新时间或文件大小排序。</p>
    </FnDrawer>
  </div>
</template>
