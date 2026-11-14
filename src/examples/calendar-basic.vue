<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('2026-11-14')
const month = ref('2026-11')
</script>
<template>
  <div style="max-width: 460px">
    <FnCalendar v-model="selected" v-model:month="month" label="选择日期" />
  </div>
</template>
