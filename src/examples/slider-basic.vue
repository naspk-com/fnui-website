<script setup lang="ts">
import { ref } from 'vue'
const value = ref(60)
</script>
<template>
  <div style="max-width: 420px">
    <FnSlider v-model="value" label="上传速度" show-value />
  </div>
</template>
