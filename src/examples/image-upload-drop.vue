<script setup lang="ts">
import { ref } from 'vue'

const items = ref<{ id: number; name: string; status: string }[]>([])
const message = ref('')
function onSelect(files: File[]) {
  message.value = '已选择 ' + files.length + ' 张图片（示例未执行上传）'
}
</script>

<template>
  <div style="max-width: 460px">
    <FnImageUpload :items="items" multiple drop @select="onSelect" @remove="items = items.filter(item => item.id !== $event)" />
    <p role="status">{{ message }}</p>
  </div>
</template>
