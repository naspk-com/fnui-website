<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
</script>
<template>
  <FnInputNumber v-model="value" label="保留版本数" :min="1" :max="20" />
</template>
