<script setup lang="ts">
const items = [
  { title: '备份任务启动', description: '开始同步 /vol1/Photos', datetime: '今天 02:00' },
  { title: '同步失败', description: '远程存储连接超时', datetime: '今天 02:04' },
  { title: '重试成功', description: '共处理 326 个文件', datetime: '今天 02:12' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnTimeline :items="items">
      <template #item="{ item, index }">
        <div style="display: flex; align-items: center; gap: 8px">
          <strong style="font-size: 14px">{{ item.title }}</strong>
          <FnTag :tone="index === 1 ? 'danger' : 'success'">{{ index === 1 ? '失败' : '完成' }}</FnTag>
        </div>
        <div style="font-size: 13px; color: var(--fn-text-secondary)">{{ item.description }}</div>
      </template>
    </FnTimeline>
  </div>
</template>
