<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const error = ref(true)
function retry() {
  error.value = false
  loading.value = true
  setTimeout(() => { loading.value = false }, 700)
}
</script>

<template>
  <div style="max-width: 360px">
    <FnLoadMore :loading="loading" :error="error" @load="retry" />
  </div>
</template>
