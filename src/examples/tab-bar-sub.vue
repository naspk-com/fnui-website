<script setup lang="ts">
import { ref } from 'vue'

const active = ref('user')
const items = [
  { value: 'home', label: '首页' },
  { value: 'app', label: '应用' },
  {
    value: 'user',
    label: '我的',
    subTabBar: [
      { value: 'info', label: '基本信息' },
      { value: 'home-page', label: '个人主页' },
      { value: 'setting', label: '设置' },
    ],
  },
]
</script>

<template>
  <div style="background: var(--fn-page); padding: 16px 0">
    <FnTabBar v-model="active" theme="tag" :split="false" label="主要页面" :items="items" />
  </div>
</template>
