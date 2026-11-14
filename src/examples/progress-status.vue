<template>
  <div style="max-width: 420px; display: flex; flex-direction: column; gap: 16px">
    <FnProgress :percentage="28" label="进行中" />
    <FnProgress :percentage="62" label="警告" status="warning" />
    <FnProgress :percentage="100" label="已完成" status="success" />
    <FnProgress :percentage="45" label="失败" status="error" />
  </div>
</template>
