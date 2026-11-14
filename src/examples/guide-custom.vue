<script setup lang="ts">
import { ref } from 'vue'

const step = ref(0)
const steps = [
  { title: '连接存储', description: '确认远程存储可用。' },
  { title: '选择内容', description: '勾选需要同步的内容。' },
  { title: '完成设置', description: '保存任务并开始首次备份。' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnGuide v-model="step" label="设置引导" :steps="steps">
      <template #step="{ step: current }">
        <strong style="display: block; margin-bottom: 6px">{{ current.title }}</strong>
        <span style="font-size: 13px; color: var(--fn-text-secondary)">{{ current.description }}</span>
      </template>
    </FnGuide>
  </div>
</template>
