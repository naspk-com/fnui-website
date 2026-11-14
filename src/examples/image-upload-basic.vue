<script setup lang="ts">
import { ref } from 'vue'

function art(from: string, to: string) {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="200" height="200" fill="url(#g)"/></svg>`)}`
}
const items = ref([
  { id: 1, name: '日出.jpg', url: art('#7ec8ff', '#0066ff'), status: 'success' as const },
  { id: 2, name: '绿植.jpg', url: art('#a7e9c3', '#009e61'), status: 'success' as const },
])
</script>

<template>
  <div style="max-width: 460px">
    <FnImageUpload :items="items" multiple @remove="items = items.filter(item => item.id !== $event)" />
  </div>
</template>
