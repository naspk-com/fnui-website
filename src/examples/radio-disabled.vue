<script setup lang="ts">
import { ref } from 'vue'

const value = ref('daily')
</script>

<template>
  <FnRadioGroup v-model="value" style="display: flex; flex-direction: column; gap: 10px">
    <FnRadio value="daily" label="每天" />
    <FnRadio value="weekly" label="每周（不可用）" disabled />
    <FnRadio value="monthly" label="每月" />
  </FnRadioGroup>
</template>
