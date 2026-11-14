<script setup lang="ts">
import { ref } from 'vue'

const last = ref('')
const groups = [
  { key: 'A', items: [{ value: 'a1', label: '安装包' }, { value: 'a2', label: '备份归档' }] },
  { key: 'B', items: [{ value: 'b1', label: '笔记' }, { value: 'b2', label: '表格' }] },
  { key: 'C', items: [{ value: 'c1', label: '照片' }, { value: 'c2', label: '视频' }] },
]
</script>

<template>
  <div style="width: 100%; max-width: 420px">
    <FnIndexes :groups="groups" label="文件索引" index-label="索引" :height="280" sort track-active @select="last = String($event)" />
    <p role="status">{{ last ? `已选择：${last}` : '按右侧索引快速定位。' }}</p>
  </div>
</template>
