<script setup lang="ts">
const items = [
  { id: 1, label: '家庭相册', description: '/vol1/Photos 只读授权' },
  { id: 2, label: '备份目录', description: '/vol2/Backup 读写授权' },
]
</script>

<template>
  <div style="max-width: 460px">
    <FnAuthorizationPanel :items="items" disabled />
  </div>
</template>
