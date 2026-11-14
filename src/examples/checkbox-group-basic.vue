<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<(string | number | boolean)[]>(['photos'])
</script>

<template>
  <div style="max-width: 380px">
    <FnCheckboxGroup v-model="selected">
      <FnCheckbox value="photos">家庭相册</FnCheckbox>
      <FnCheckbox value="videos">视频备份</FnCheckbox>
      <FnCheckbox value="docs">工作文档</FnCheckbox>
      <FnCheckbox value="archive" disabled>归档数据（只读）</FnCheckbox>
    </FnCheckboxGroup>
    <p>已选择 {{ selected.length }} 项内容。</p>
  </div>
</template>
