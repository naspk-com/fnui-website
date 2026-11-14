<script setup lang="ts">
import { ref } from 'vue'

const active = ref('overview')
const items = [
  { value: 'overview', label: '概览' },
  { value: 'activity', label: '活动' },
]
</script>

<template>
  <div style="max-width: 460px">
    <FnTabs v-model="active" label="任务详情" :items="items">
      <template #panel="{ item }">
        <div style="padding: 16px; border-radius: 10px; background: var(--fn-fill)">
          <strong style="display: block; margin-bottom: 6px">{{ item.label }}</strong>
          <span style="font-size: 13px; color: var(--fn-text-secondary)">
            {{ item.value === 'overview' ? '每天凌晨 2:00 执行增量备份。' : '最近一次同步在 10 分钟前完成。' }}
          </span>
        </div>
      </template>
    </FnTabs>
  </div>
</template>
