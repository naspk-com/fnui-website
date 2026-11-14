<template>
  <div style="max-width: 520px">
    <FnAnchor label="页面锚点" :items="[{ href: '#/components/anchor', label: '概述' }, { href: '#/components/anchor', label: 'API' }, { href: '#/components/anchor', label: '示例' }]" />
    <p style="color: var(--fn-text-secondary)">点击锚点可跳转到页面中的对应分区。</p>
  </div>
</template>
