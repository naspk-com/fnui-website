<template>
  <div style="display: flex; align-items: center; gap: 32px">
    <FnProgress variant="circle" :percentage="68" label="上传进度" />
    <FnProgress variant="circle" :percentage="100" label="已完成" status="success" />
  </div>
</template>
