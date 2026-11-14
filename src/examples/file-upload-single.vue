<script setup lang="ts">
import { ref } from 'vue'

const items = ref([{ id: 1, name: '备份说明.txt', status: 'success' as const, progress: 100 }])
const message = ref('')
function onSelect(files: File[]) {
  message.value = '已选择 ' + (files[0]?.name ?? '') + '（示例未执行上传）'
}
</script>

<template>
  <div style="max-width: 440px">
    <FnFileUpload :items="items" @select="onSelect" @remove="items = []" />
    <p role="status">{{ message }}</p>
  </div>
</template>
