<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <div>
    <FnSwitch v-model="enabled" label="自动备份" />
    <p>自动备份：{{ enabled ? '开启' : '关闭' }}</p>
  </div>
</template>
