<template>
  <div style="display: flex; align-items: center; gap: 24px">
    <FnQRCode value="https://nas.local/share/album-2026" label="家庭相册共享链接" :size="140" />
    <p style="max-width: 220px; margin: 0; color: var(--fn-text-secondary)">扫描二维码可在手机上打开共享相册。</p>
  </div>
</template>
