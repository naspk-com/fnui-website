<script setup lang="ts">
import { ref } from 'vue'

const path = ref<string | null>('/vol1/Photos')
const log = ref('')
function choose() {
  path.value = '/vol2/Backup/Photos'
  log.value = '已选择新的授权目录。'
}
</script>

<template>
  <div style="max-width: 460px">
    <FnAuthorizedPathField v-model="path" label="授权目录" @choose="choose" @change="log = '已清除授权目录'" />
    <p role="status">{{ log }}</p>
  </div>
</template>
