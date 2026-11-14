<script setup lang="ts">
import { ref } from 'vue'

const value = ref('local')
</script>

<template>
  <FnRadioGroup v-model="value" readonly style="display: flex; flex-direction: column; gap: 10px">
    <FnRadio value="local" label="本地备份" />
    <FnRadio value="remote" label="远程备份" />
  </FnRadioGroup>
</template>
