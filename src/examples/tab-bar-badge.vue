<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
const textItems = [
  { value: 'home', label: '首页', badge: { count: 16 }, ariaLabel: '首页，有 16 条消息' },
  { value: 'app', label: '软件', badge: { dot: true }, ariaLabel: '软件，有新的消息' },
  { value: 'chat', label: '聊天', badge: 'New', ariaLabel: '聊天，New' },
  { value: 'user', label: '我的', badge: '···', ariaLabel: '我的，有很多消息' },
]
const iconItems = [
  { value: 'home', icon: 'home', badge: { count: 16 }, ariaLabel: '首页，有 16 条消息' },
  { value: 'app', icon: 'app', badge: { dot: true }, ariaLabel: '软件，有新的消息' },
  { value: 'chat', icon: 'chat', badge: 'New', ariaLabel: '聊天，New' },
  { value: 'user', icon: 'user', badge: '···', ariaLabel: '我的，有很多消息' },
]
const mixedItems = [
  { value: 'home', label: '首页', icon: 'home', badge: { count: 16 }, ariaLabel: '首页，有 16 条消息' },
  { value: 'app', label: '软件', icon: 'app', badge: { dot: true }, ariaLabel: '软件，有新的消息' },
  { value: 'chat', label: '聊天', icon: 'chat', badge: 'New', ariaLabel: '聊天，New' },
  { value: 'user', label: '我的', icon: 'user', badge: '···', ariaLabel: '我的，有很多消息' },
]
</script>

<template>
  <div style="display: grid; gap: 16px; background: var(--fn-page); padding: 12px 0">
    <FnTabBar v-model="active" :fixed="false" :split="false" label="文本标签栏" :items="textItems" />
    <FnTabBar v-model="active" :fixed="false" :split="false" label="图标标签栏" :items="iconItems" />
    <FnTabBar v-model="active" :fixed="false" :split="false" label="图文标签栏" :items="mixedItems" />
  </div>
</template>
