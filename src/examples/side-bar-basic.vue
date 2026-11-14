<script setup lang="ts">
import { ref } from 'vue'

const active = ref('drive')
const items = [
  { value: 'drive', label: '存储空间' },
  { value: 'shared', label: '他人共享' },
  { value: 'recent', label: '最近访问' },
  { value: 'trash', label: '回收站' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnSideBar v-model="active" label="侧边导航" :items="items" />
    <p>当前分区：{{ items.find(item => item.value === active)?.label }}</p>
  </div>
</template>
