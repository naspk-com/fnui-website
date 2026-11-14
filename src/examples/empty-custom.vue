<template>
  <div style="max-width: 420px">
    <FnEmpty title="文件夹是空的" description="把文件拖到这里，或从其他目录移动文件。">
      <template #image>
        <FnIcon name="folder" :size="48" />
      </template>
    </FnEmpty>
  </div>
</template>
