<script setup lang="ts">
const photo = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="520" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ec8ff"/><stop offset="1" stop-color="#0066ff"/></linearGradient></defs><rect width="520" height="300" fill="url(#g)"/><circle cx="120" cy="80" r="38" fill="#fff" opacity=".85"/><path d="M0 300 L180 150 L300 240 L400 170 L520 300Z" fill="#fff" opacity=".28"/></svg>')}`
</script>

<template>
  <div style="display: flex; align-items: center; gap: 20px">
    <FnImage :src="photo" alt="山间日出" :width="260" :height="150" preview style="border-radius: 8px; object-fit: cover" />
    <p style="max-width: 220px; margin: 0; color: var(--fn-text-secondary)">点击图片可放大预览。</p>
  </div>
</template>
