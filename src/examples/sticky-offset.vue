<template>
  <div style="height: 220px; overflow: auto; border: 1px solid var(--fn-border); border-radius: 10px; background: var(--fn-fill)">
    <FnSticky :offset="16">
      <div style="margin: 0 16px; padding: 10px 12px; border-radius: 8px; background: var(--fn-container); box-shadow: 0 4px 12px rgb(0 0 0 / 8%); font-weight: 600">分组标题</div>
    </FnSticky>
    <div style="padding: 16px; color: var(--fn-text-secondary)">
      <p v-for="index in 8" :key="index" style="margin: 0 0 12px">内容 {{ index }}：滚动时标题保持距顶部 16px。</p>
    </div>
  </div>
</template>
