<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton @click="visible = true">从左侧弹出</FnButton>
    <FnPopup v-model:visible="visible" title="筛选" placement="left" size="280px">
      <p style="margin: 0">可以在这里放置筛选条件。</p>
    </FnPopup>
  </div>
</template>
