<script setup lang="ts">
const icons = [
  { name: 'folder', label: '文件夹' },
  { name: 'file', label: '文件' },
  { name: 'image', label: '图片' },
  { name: 'video', label: '视频' },
  { name: 'music', label: '音乐' },
  { name: 'cloud', label: '云盘' },
  { name: 'share-1', label: '共享' },
  { name: 'star', label: '收藏' },
  { name: 'time', label: '最近' },
  { name: 'setting', label: '设置' },
  { name: 'user', label: '用户' },
  { name: 'delete', label: '回收站' },
]
</script>

<template>
  <div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px 12px; max-width: 520px">
    <div v-for="icon in icons" :key="icon.name" style="display: flex; flex-direction: column; align-items: center; gap: 6px">
      <FnIcon :name="icon.name" :size="24" />
      <span style="font-size: 12px; color: var(--fn-text-secondary)">{{ icon.label }}</span>
    </div>
  </div>
</template>
