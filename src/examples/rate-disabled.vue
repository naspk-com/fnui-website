<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <FnRate :model-value="4" label="已评分（只读）" readonly />
    <FnRate :model-value="2" label="已评分（禁用）" disabled />
  </div>
</template>
