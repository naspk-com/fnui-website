<template>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
    <FnButton shape="round">圆角按钮</FnButton>
    <FnButton shape="round" variant="outline">描边圆角</FnButton>
    <FnButton shape="circle" aria-label="新增文件"><FnIcon name="add" :size="18" /></FnButton>
  </div>
</template>
