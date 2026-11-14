<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const step = ref(0)
const steps = [
  { title: '选择目录', description: '在左侧选择需要备份的目录。' },
  { title: '设置计划', description: '配置执行时间与保留份数。' },
]
</script>

<template>
  <div>
    <FnButton tone="primary" @click="visible = true; step = 0">开始引导</FnButton>
    <FnGuide v-model="step" v-model:visible="visible" overlay label="功能引导" :steps="steps" />
  </div>
</template>
