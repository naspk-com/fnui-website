<script setup lang="ts">
import { ref } from 'vue'

const month = ref('2026-11')
const view = ref('year')
</script>

<template>
  <div style="max-width: 460px">
    <FnCalendar v-model:month="month" v-model:view="view" label="按月份浏览" />
  </div>
</template>
