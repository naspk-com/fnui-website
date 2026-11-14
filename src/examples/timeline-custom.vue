<script setup lang="ts">
const items = [
  { title: '备份任务启动', description: '开始同步 /vol1/Photos', datetime: '今天 02:00' },
  { title: '同步完成', description: '共处理 326 个文件', datetime: '今天 02:12' },
  { title: '清理旧版本', description: '保留最近 10 个版本', datetime: '今天 02:13' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnTimeline :items="items">
      <template #item="{ item }">
        <strong style="font-size: 14px">{{ item.title }}</strong>
        <div style="font-size: 13px; color: var(--fn-text-secondary)">{{ item.description }}</div>
      </template>
    </FnTimeline>
  </div>
</template>
