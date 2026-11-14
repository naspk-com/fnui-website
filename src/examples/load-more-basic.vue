<script setup lang="ts">
import { ref } from 'vue'

const rounds = ref(1)
const loading = ref(false)
const hasMore = ref(true)
function load() {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    rounds.value += 1
    loading.value = false
    if (rounds.value >= 3) hasMore.value = false
  }, 600)
}
</script>

<template>
  <div style="max-width: 360px">
    <p style="margin: 0 0 8px">已加载 {{ rounds * 20 }} 个文件。</p>
    <FnLoadMore :loading="loading" :has-more="hasMore" @load="load" />
  </div>
</template>
