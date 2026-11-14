<script setup lang="ts">
import { ref } from 'vue'

const index = ref(0)
const slides = [
  { title: '家庭相册', description: '按年份整理的照片与视频。' },
  { title: '工作文档', description: '与团队共享的项目资料。' },
  { title: '备份归档', description: '自动保留最近 10 个版本。' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnSwiper v-model="index" :count="slides.length" label="推荐文件夹" loop show-indicators>
      <template #default="{ index: current }">
        <div style="padding: 24px; border: 1px solid var(--fn-border); border-radius: 10px; background: var(--fn-fill)">
          <strong style="display: block; margin-bottom: 8px">{{ slides[current].title }}</strong>
          <span style="color: var(--fn-text-secondary)">{{ slides[current].description }}</span>
        </div>
      </template>
    </FnSwiper>
  </div>
</template>
