<template>
  <div style="max-width: 460px">
    <FnDescriptions
      title="备份任务"
      :items="[
        { label: '任务名称', value: '家庭相册每日备份' },
        { label: '源目录', value: '/vol1/Photos' },
        { label: '目标目录', value: '/vol2/Backup/Photos' },
        { label: '最近运行', value: '今天 10:28' },
      ]"
    />
  </div>
</template>
