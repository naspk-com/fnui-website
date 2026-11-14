<template>
  <div style="display: flex; flex-wrap: wrap; gap: 40px">
    <FnStatistic label="已用空间" value="1.6" unit="TB" />
    <FnStatistic label="文件数量" :value="12840" unit="个" />
    <FnStatistic label="在线设备" :value="3" unit="台" />
  </div>
</template>
