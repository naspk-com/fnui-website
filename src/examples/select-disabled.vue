<template>
  <div style="max-width: 360px">
    <FnSelect :model-value="'image'" label="文件类型" disabled :options="[{ value: 'image', label: '图片' }, { value: 'video', label: '视频' }]" />
  </div>
</template>
