<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
const items = [
  { value: 'home', label: '首页', icon: 'home' },
  { value: 'app', label: '应用', icon: 'app' },
  { value: 'chat', label: '聊天', icon: 'chat' },
  { value: 'user', label: '我的', icon: 'user' },
]
</script>

<template>
  <div style="background: var(--fn-page); padding: 16px 0">
    <FnTabBar
      v-model="active"
      theme="tag"
      :split="false"
      label="自定义样式"
      :items="items"
      style="--fn-tab-bar-bg-color: #eef1f7; --fn-tab-bar-color: #9aa4b2; --fn-tab-bar-active-color: #1f2d3d; --fn-tab-bar-active-bg: #dbe4ff; --fn-tab-bar-border-color: #dde3ef;"
    />
  </div>
</template>
