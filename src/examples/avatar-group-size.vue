<script setup lang="ts">
const items = [
  { value: 'a', alt: '林岚', text: '林' },
  { value: 'b', alt: '陈默', text: '陈' },
]
</script>

<template>
  <FnAvatarGroup label="协作者" :items="items" :size="48" />
</template>
