<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const index = ref(0)
const images = [
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%2394a3b8'/%3E%3C/svg%3E", alt: '灰色封面' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%231d4ed8'/%3E%3C/svg%3E", alt: '蓝色封面' },
]
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true">滑动浏览图片</FnButton>
    <FnImageViewer v-model:visible="visible" v-model:index="index" :images="images" title="滑动预览" swipeable preload-adjacent />
  </div>
</template>
