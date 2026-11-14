<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <FnButton tone="primary" @click="visible = true">删除文件</FnButton>
  <FnDialog v-model:visible="visible" title="删除文件" @confirm="visible = false">删除后可以在回收站中找回。</FnDialog>
</template>
