<script setup lang="ts">
import { ref } from 'vue'
const score = ref(4)
</script>
<template>
  <FnRate v-model="score" label="内容评分" allow-half />
</template>
