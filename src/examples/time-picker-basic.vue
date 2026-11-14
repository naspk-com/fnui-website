<script setup lang="ts">
import { ref } from 'vue'

const time = ref('09:30')
</script>

<template>
  <div style="max-width: 320px">
    <FnTimePicker v-model="time" label="备份时间" />
    <p>每天 {{ time || '未设置' }} 执行增量备份。</p>
  </div>
</template>
