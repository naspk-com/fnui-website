<template>
  <div style="max-width: 420px">
    <FnCard title="任务详情">
      <p style="margin: 0; color: var(--fn-text-secondary)">每天 02:00 增量备份家庭相册到存储空间 2。</p>
      <template #footer>
        <div style="display: flex; gap: 8px">
          <FnButton size="small" tone="primary">立即执行</FnButton>
          <FnButton size="small" variant="outline">编辑</FnButton>
          <FnButton size="small" variant="text" tone="danger">删除</FnButton>
        </div>
      </template>
    </FnCard>
  </div>
</template>
