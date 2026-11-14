<script setup lang="ts">
import { computed, ref } from 'vue'

const options = [
  { value: 'photos', label: '照片' },
  { value: 'videos', label: '视频' },
  { value: 'docs', label: '文档' },
]
const selected = ref<string[]>(['photos'])
const allChecked = computed(() => selected.value.length === options.length)
const indeterminate = computed(() => selected.value.length > 0 && !allChecked.value)
function toggleAll(checked: boolean) {
  selected.value = checked ? options.map(option => option.value) : []
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FnCheckbox :model-value="allChecked" :indeterminate="indeterminate" label="全选" @change="toggleAll" />
    <FnCheckboxGroup v-model="selected" style="display: flex; flex-direction: column; gap: 10px; padding-left: 24px">
      <FnCheckbox v-for="option in options" :key="option.value" :value="option.value" :label="option.label" />
    </FnCheckboxGroup>
  </div>
</template>
