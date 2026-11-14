<script setup lang="ts">
import { ref } from 'vue'

const all = [
  { value: 'backup', label: '备份归档' },
  { value: 'family', label: '家庭相册' },
  { value: 'project', label: '项目资料' },
  { value: 'media', label: '影音资源' },
]
const options = ref(all)
const selected = ref<string | number | null>(null)
function onSearch(query: string) {
  options.value = query ? all.filter(option => option.label.includes(query)) : all
}
</script>

<template>
  <div style="max-width: 360px">
    <FnSelect v-model="selected" label="远程目录" placeholder="输入关键字远程搜索" remote searchable :options="options" @search="onSearch" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">已选择：{{ selected ?? '无' }}</p>
  </div>
</template>
