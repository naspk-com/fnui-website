<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true">打开宽抽屉</FnButton>
    <FnDrawer v-model:visible="visible" title="备份设置" size="640px">
      <p style="margin: 0 0 12px">抽屉宽度可以通过 size 调整，适合承载更复杂的表单。</p>
      <FnInput model-value="/vol1/Photos" placeholder="源目录" />
      <template #footer>
        <FnButton tone="primary" size="small" @click="visible = false">保存</FnButton>
      </template>
    </FnDrawer>
  </div>
</template>
