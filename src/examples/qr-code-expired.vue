<script setup lang="ts">
import { ref } from 'vue'

const status = ref<'active' | 'expired'>('expired')
</script>

<template>
  <FnQRCode value="https://nas.local/share/temp" label="临时共享链接" :status="status" @refresh="status = 'active'" />
</template>
