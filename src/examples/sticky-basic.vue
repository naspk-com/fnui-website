<template>
  <div style="height: 240px; overflow: auto; border: 1px solid var(--fn-border); border-radius: 10px; background: var(--fn-fill)">
    <FnSticky :offset="0">
      <div style="padding: 12px 16px; background: var(--fn-container); border-bottom: 1px solid var(--fn-border); font-weight: 600">备份任务</div>
    </FnSticky>
    <div style="padding: 16px; color: var(--fn-text-secondary)">
      <p v-for="index in 8" :key="index" style="margin: 0 0 12px">任务记录 {{ index }}：增量备份已完成。</p>
    </div>
  </div>
</template>
