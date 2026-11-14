<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
const items = [
  { value: 'home', icon: 'home', ariaLabel: '首页' },
  { value: 'app', icon: 'app', ariaLabel: '应用' },
  { value: 'chat', icon: 'chat', ariaLabel: '聊天' },
  { value: 'user', icon: 'user', ariaLabel: '我的' },
]
</script>

<template>
  <div style="background: var(--fn-page); padding: 16px 0">
    <FnTabBar v-model="active" theme="tag" :split="false" label="主要页面" :items="items" />
  </div>
</template>
