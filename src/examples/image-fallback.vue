<script setup lang="ts">
const fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='140'%3E%3Crect width='240' height='140' fill='%23e5e7eb'/%3E%3Ctext x='120' y='74' font-size='14' text-anchor='middle' fill='%236b7280'%3E图片不可用%3C/text%3E%3C/svg%3E"
</script>

<template>
  <FnImage src="/missing-cover.png" :fallback-src="fallback" alt="照片封面" :width="240" :height="140" />
</template>
