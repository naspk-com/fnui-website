<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnButton @click="visible = true">全屏查看详情</FnButton>
    <FnDialog v-model:visible="visible" title="备份详情" presentation="fullscreen" cancel-text="关闭" confirm-text="开始备份" @confirm="visible = false">
      <p style="margin: 0 0 12px">源目录：/vol1/Photos</p>
      <p style="margin: 0 0 12px">目标目录：/vol2/Backup</p>
      <p style="margin: 0">计划：每天 02:00 执行增量备份，保留最近 10 个版本。</p>
    </FnDialog>
  </div>
</template>
