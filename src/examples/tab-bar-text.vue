<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
const items = [
  { value: 'home', label: '首页' },
  { value: 'app', label: '应用' },
  { value: 'chat', label: '聊天' },
  { value: 'user', label: '我的' },
]
</script>

<template>
  <div style="background: var(--fn-page); padding: 16px 0">
    <FnTabBar v-model="active" theme="tag" :split="false" label="底部导航" :items="items" />
  </div>
</template>
