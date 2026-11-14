<script setup lang="ts">
import { ref } from 'vue'

const moved = ref('')
const items = [
  { value: 'docs', label: '文档', children: [{ value: 'work', label: '工作' }, { value: 'personal', label: '个人' }] },
  { value: 'photos', label: '照片' },
]
function onMove(event: { source: string | number; target: string | number; position: string }) {
  moved.value = '将 ' + event.source + ' 移动到 ' + event.target + ' 的 ' + event.position + ' 位置'
}
</script>

<template>
  <div style="max-width: 360px">
    <FnTree label="拖拽目录" :items="items" draggable @move="onMove" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">{{ moved || '拖动节点可调整目录顺序。' }}</p>
  </div>
</template>
