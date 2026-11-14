<script setup lang="ts">
import { ref } from 'vue'

const step = ref(0)
const steps = [
  { title: '选择备份目录', description: '从已授权的目录中选择需要备份的内容。' },
  { title: '设置执行时间', description: '默认每天凌晨执行，可调整频率与保留份数。' },
  { title: '确认并完成', description: '检查配置后保存任务，首次备份会立即开始。' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnGuide v-model="step" label="备份任务引导" :steps="steps" />
  </div>
</template>
