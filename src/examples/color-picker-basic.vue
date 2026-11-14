<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#0066ff')
</script>

<template>
  <div style="max-width: 320px">
    <FnColorPicker v-model="color" label="主题颜色" :swatches="['#0066ff', '#2f6fed', '#00a155', '#e37318']" />
    <p>当前颜色：{{ color }}</p>
  </div>
</template>
