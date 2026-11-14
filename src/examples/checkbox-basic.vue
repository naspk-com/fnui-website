<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(false)
</script>
<template>
  <FnCheckbox v-model="checked" label="记住本次选择" />
</template>
