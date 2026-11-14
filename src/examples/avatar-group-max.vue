<script setup lang="ts">
const items = [
  { value: 'a', alt: '林岚', text: '林' },
  { value: 'b', alt: '陈默', text: '陈' },
  { value: 'c', alt: '周舟', text: '周' },
  { value: 'd', alt: '吴迪', text: '吴' },
  { value: 'e', alt: '马骁', text: '马' },
]
</script>

<template>
  <FnAvatarGroup label="项目成员" :items="items" :max="3" remaining-label="更多成员" />
</template>
