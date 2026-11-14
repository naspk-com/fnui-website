<script setup lang="ts">
import { ref } from 'vue'

const value = ref('daily')
</script>

<template>
  <FnRadioGroup v-model="value" readonly style="display: flex; flex-direction: column; gap: 10px">
    <FnRadio value="daily" label="每天" />
    <FnRadio value="weekly" label="每周" />
  </FnRadioGroup>
</template>
