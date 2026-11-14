<script setup lang="ts">
import { ref } from 'vue'
const scope = ref('private')
</script>
<template>
  <FnRadioGroup v-model="scope" name="scope">
    <FnRadio value="private" label="仅自己" />
    <FnRadio value="family" label="家庭成员" />
  </FnRadioGroup>
</template>
