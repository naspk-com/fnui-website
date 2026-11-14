<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, name: '家庭相册.zip', status: 'success' as const, progress: 100 },
  { id: 2, name: '项目资料.pdf', status: 'uploading' as const, progress: 64 },
  { id: 3, name: '说明文档.txt', status: 'error' as const },
])
const message = ref('')
function onSelect(files: File[]) {
  message.value = `已选择 ${files.length} 个文件（示例未执行上传）。`
}
</script>

<template>
  <div style="max-width: 520px">
    <FnFileUpload :items="items" multiple drop accept=".zip,.pdf,.txt" @select="onSelect" @remove="items = items.filter(item => item.id !== $event)" />
    <p role="status">{{ message }}</p>
  </div>
</template>
