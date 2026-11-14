<template>
  <FnPage style="height: 250px; overflow: auto; border: 1px solid var(--fn-border); border-radius: 10px">
    <template #heading>
      <h3 style="margin: 0; font-size: 16px">备份任务</h3>
    </template>
    <template #actions>
      <FnButton size="small" tone="primary">新建任务</FnButton>
    </template>
    <p style="margin: 0; color: var(--fn-text-secondary)">为家庭相册配置每日增量备份，保留最近 10 个版本。</p>
    <p style="margin: 12px 0 0; color: var(--fn-text-secondary)">源目录：/vol1/Photos</p>
    <template #status>
      <span style="font-size: 12px; color: var(--fn-text-muted)">最近同步：今天 10:28</span>
    </template>
  </FnPage>
</template>
