<script setup lang="ts">
import { ref } from 'vue'

const active = ref('photos')
const items = [
  { value: 'photos', label: '照片' },
  { value: 'videos', label: '视频' },
  { value: 'archive', label: '归档（只读）', disabled: true },
]
</script>

<template>
  <div style="max-width: 220px">
    <FnSideBar v-model="active" label="媒体分类" :items="items" />
  </div>
</template>
