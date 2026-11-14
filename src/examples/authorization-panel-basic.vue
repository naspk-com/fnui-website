<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, label: '家庭相册', description: '/vol1/Photos 只读授权' },
  { id: 2, label: '备份目录', description: '/vol2/Backup 读写授权' },
])
const message = ref('')
function revoke(id: string | number) {
  const target = items.value.find(item => item.id === id)
  items.value = items.value.filter(item => item.id !== id)
  message.value = `已移除 ${target?.label ?? '目录'} 的授权。`
}
</script>

<template>
  <div style="max-width: 460px">
    <FnAuthorizationPanel :items="items" @revoke="revoke" />
    <p role="status">{{ message }}</p>
  </div>
</template>
