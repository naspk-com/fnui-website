<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '我的文件' },
  { value: 'shared', label: '共享空间' },
  { value: 'team', label: '团队空间（未开通）', disabled: true },
]
</script>

<template>
  <div style="max-width: 260px">
    <FnMenu v-model="active" label="空间导航" :items="items" />
  </div>
</template>
