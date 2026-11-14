<script setup lang="ts">
import { ref } from 'vue'

const selected = ref(['photos'])
</script>

<template>
  <FnCheckboxGroup v-model="selected" disabled style="display: flex; flex-direction: column; gap: 10px">
    <FnCheckbox value="photos" label="照片" />
    <FnCheckbox value="videos" label="视频" />
    <FnCheckbox value="docs" label="文档" />
  </FnCheckboxGroup>
</template>
