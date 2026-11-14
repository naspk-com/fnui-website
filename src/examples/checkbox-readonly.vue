<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FnCheckbox :model-value="true" label="只读选中" readonly />
    <FnCheckbox :model-value="false" label="只读未选" readonly />
  </div>
</template>
