<script setup lang="ts">
import { ref } from 'vue'

const open = ref<(string | number)[]>(['network'])
const items = [
  { value: 'network', label: '网络设置' },
  { value: 'backup', label: '备份策略' },
  { value: 'storage', label: '存储管理' },
]
</script>

<template>
  <div style="max-width: 420px">
    <FnCollapse v-model="open" :items="items">
      <template #content="{ item }">
        <p style="margin: 0; color: var(--fn-text-secondary)">
          {{ item.value === 'network' ? '配置网络接口与 DNS 服务。' : item.value === 'backup' ? '设置自动备份的时间与保留份数。' : '查看磁盘占用并清理回收站。' }}
        </p>
      </template>
    </FnCollapse>
  </div>
</template>
