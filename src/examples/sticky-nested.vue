<template>
  <div style="height: 240px; overflow: auto; border: 1px solid var(--fn-border); border-radius: 10px; background: var(--fn-fill)">
    <FnSticky :offset="0">
      <div style="padding: 10px 16px; background: var(--fn-container); border-bottom: 1px solid var(--fn-border); font-weight: 600">2026 年</div>
    </FnSticky>
    <FnSticky :offset="41">
      <div style="padding: 8px 16px; background: var(--fn-fill); border-bottom: 1px solid var(--fn-border); font-size: 13px">十一月</div>
    </FnSticky>
    <div style="padding: 16px; color: var(--fn-text-secondary)">
      <p v-for="index in 10" :key="index" style="margin: 0 0 12px">照片 {{ index }} · 旅行记录</p>
    </div>
  </div>
</template>
