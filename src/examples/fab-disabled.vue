<template>
  <div style="position: relative; width: 100%; min-height: 160px">
    <p>空间不足时暂时禁用上传入口。</p>
    <div style="position: absolute; right: 16px; bottom: 16px">
      <FnFab label="上传文件" disabled><FnIcon name="add" :size="22" /></FnFab>
    </div>
  </div>
</template>
