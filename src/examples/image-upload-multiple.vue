<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, name: '封面.jpg', status: 'success' as const },
])
</script>

<template>
  <div style="max-width: 460px">
    <FnImageUpload :items="items" multiple accept="image/png,image/jpeg" @remove="items = items.filter(item => item.id !== $event)" />
  </div>
</template>
