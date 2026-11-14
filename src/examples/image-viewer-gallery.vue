<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const index = ref(1)
const images = [
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%233b82f6'/%3E%3C/svg%3E", alt: '蓝色封面' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%23f59e0b'/%3E%3C/svg%3E", alt: '橙色封面' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%2310b981'/%3E%3C/svg%3E", alt: '绿色封面' },
]
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true">浏览相册</FnButton>
    <FnImageViewer v-model:visible="visible" v-model:index="index" :images="images" title="相册预览" show-thumbnails swipeable />
  </div>
</template>
