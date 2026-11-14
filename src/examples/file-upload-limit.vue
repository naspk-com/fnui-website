<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, name: '照片.zip', status: 'success' as const, progress: 100 },
  { id: 2, name: '视频.mp4', status: 'error' as const },
])
const message = ref('')
function onReject(event: { file: File; reason: string }) {
  message.value = '已拒绝 ' + event.file.name + '，原因：' + event.reason
}
</script>

<template>
  <div style="max-width: 440px">
    <FnFileUpload :items="items" multiple accept=".zip,.pdf" :max-files="2" :max-bytes="10485760" @reject="onReject" @remove="items = items.filter(item => item.id !== $event)" />
    <p role="status">{{ message || '最多上传 2 个文件，单个不超过 10 MB。' }}</p>
  </div>
</template>
