<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '我的文件' },
  { value: 'shared', label: '共享空间' },
  { value: 'favorites', label: '收藏' },
]
</script>

<template>
  <FnLayout shell="standalone" navigation-mode="sidebar" style="height: 280px">
    <template #navigation>
      <FnMenu v-model="active" label="空间导航" :items="items" />
    </template>
    <div style="padding: 20px">
      <h3 style="margin: 0 0 8px; font-size: 16px">{{ items.find(item => item.value === active)?.label }}</h3>
      <p style="margin: 0; color: var(--fn-text-secondary); font-size: 13px">固定侧边导航适合桌面端，内容区保持独立滚动。</p>
    </div>
  </FnLayout>
</template>
