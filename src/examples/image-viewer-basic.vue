<script setup lang="ts">
import { ref } from 'vue'

function art(from: string, to: string) {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><circle cx="160" cy="110" r="52" fill="#fff" opacity=".8"/><path d="M0 400 L220 210 L360 320 L480 230 L640 400Z" fill="#fff" opacity=".25"/></svg>`)}`
}
const visible = ref(false)
const index = ref(0)
const images = [
  { src: art('#7ec8ff', '#0066ff'), alt: '家里阳台的日出' },
  { src: art('#ffd18a', '#e06c00'), alt: '傍晚的厨房' },
  { src: art('#a7e9c3', '#009e61'), alt: '阳台上的绿植' },
]
</script>

<template>
  <div>
    <FnButton @click="visible = true">预览家庭相册</FnButton>
    <span style="margin-left: 12px; color: var(--fn-text-secondary)">{{ images[index]?.alt }}</span>
    <FnImageViewer v-model:visible="visible" v-model:index="index" :images="images" title="家庭相册" show-thumbnails />
  </div>
</template>
