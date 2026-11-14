<template>
  <div style="max-width: 420px">
    <FnTimeline
      :items="[
        { title: '备份完成', description: '家庭相册已同步至目标目录。', datetime: '今天 10:28' },
        { title: '创建快照', description: '为共享目录创建了新的快照。', datetime: '昨天 22:10' },
        { title: '更新设置', description: '将保留份数调整为 10 份。', datetime: '11 月 12 日' },
      ]"
    />
  </div>
</template>
