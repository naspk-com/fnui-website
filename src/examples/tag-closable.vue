<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
</script>
<template>
  <FnTag v-if="visible" closable @close="visible = false">可关闭</FnTag>
  <FnButton v-else size="small" @click="visible = true">重新显示</FnButton>
</template>
