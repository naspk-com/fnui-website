<template>
  <div style="max-width: 440px; display: flex; flex-direction: column; gap: 20px">
    <FnComment author="林岚" datetime="今天 10:28" content="已把共享目录整理成按年份分类，旧文件移到了归档目录。">
      <template #avatar><FnAvatar alt="林岚" :size="36">林</FnAvatar></template>
      <template #actions><a href="#/components/comment" style="color: var(--fn-primary); font-size: 13px">回复</a></template>
    </FnComment>
    <FnComment author="陈默" datetime="昨天 22:10" content="收到，我稍后补充一下备份策略。">
      <template #avatar><FnAvatar alt="陈默" :size="36">陈</FnAvatar></template>
    </FnComment>
  </div>
</template>
