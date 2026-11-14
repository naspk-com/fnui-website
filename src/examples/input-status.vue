<template>
  <div style="max-width: 360px; display: flex; flex-direction: column; gap: 12px">
    <FnInput model-value="photos" status="success" />
    <FnInput model-value="photos-2026" status="warning" />
    <FnInput model-value="photos/2026/??" status="error" />
  </div>
</template>
