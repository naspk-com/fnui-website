<template>
  <FnPage scroll="content" :max-width="520" style="height: 240px; border: 1px solid var(--fn-border); border-radius: 10px">
    <template #heading>
      <h3 style="margin: 0; font-size: 16px">活动记录</h3>
    </template>
    <template #actions>
      <FnButton size="small">导出</FnButton>
    </template>
    <p v-for="index in 8" :key="index" style="margin: 0 0 12px; color: var(--fn-text-secondary)">
      第 {{ index }} 条记录：同步任务已完成，共处理 {{ index * 12 }} 个文件。
    </p>
  </FnPage>
</template>
