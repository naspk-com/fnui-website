<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FnCheckbox :model-value="true" label="已开启（禁用）" disabled />
    <FnCheckbox :model-value="false" label="未开启（禁用）" disabled />
  </div>
</template>
