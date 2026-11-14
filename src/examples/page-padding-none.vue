<template>
  <FnPage padding="none" :max-width="520" style="height: 230px; border: 1px solid var(--fn-border); border-radius: 10px; overflow: hidden">
    <div style="padding: 16px 20px; background: var(--fn-fill); border-bottom: 1px solid var(--fn-border)">
      <h3 style="margin: 0; font-size: 16px">自定义内边距</h3>
      <span style="font-size: 12px; color: var(--fn-text-secondary)">使用 padding="none" 接管页面留白</span>
    </div>
    <div style="padding: 20px">
      <p style="margin: 0; color: var(--fn-text-secondary)">内容区域可以按需设置内边距，适合需要背景铺满的页面。</p>
    </div>
  </FnPage>
</template>
