<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FnSwitch :model-value="true" label="已开启（禁用）" disabled />
    <FnSwitch :model-value="false" label="已关闭（禁用）" disabled />
  </div>
</template>
