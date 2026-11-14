<script setup lang="ts">
import { computed } from 'vue'
import { FnButton, FnIcon } from '@naspk/fnui/desktop'
import { catalog, groupNames } from '../data/catalog'

defineProps<{ path: string; open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const groups = computed(() => groupNames.map(name => ({ name, items: catalog.filter(item => item.group === name) })).filter(group => group.items.length))
</script>

<template>
  <aside :class="['tw:fixed tw:top-[64px] tw:bottom-0 tw:left-0 tw:z-30 tw:flex tw:w-[280px] tw:flex-col tw:border-r tw:border-solid tw:border-fn-border tw:bg-[var(--site-background)] tw:min-[761px]:visible tw:min-[761px]:sticky tw:min-[761px]:h-[calc(100vh-64px)] tw:min-[761px]:w-auto tw:min-[761px]:translate-x-0', open ? 'tw:visible tw:translate-x-0' : 'tw:invisible tw:-translate-x-full']" aria-label="文档导航">
    <div class="tw:flex tw:items-center tw:justify-between tw:px-[20px] tw:pt-[20px] tw:min-[761px]:hidden">
      <strong class="tw:text-[14px]">文档导航</strong><FnButton size="small" variant="text" aria-label="关闭导航" @click="emit('close')"><FnIcon name="close" :size="18" /></FnButton>
    </div>
    <nav aria-label="文档目录" class="tw:min-h-0 tw:flex-1 tw:overflow-y-auto tw:px-[16px] tw:pt-[20px] tw:pb-[40px]">
      <div>
        <div class="tw:px-[10px] tw:pb-[8px] tw:text-[12px] tw:font-semibold tw:text-fn-text-muted">开始使用</div>
        <a href="#/guide" :aria-current="path === '/guide' ? 'page' : undefined" :class="['tw:flex tw:min-h-[36px] tw:items-center tw:rounded-[6px] tw:px-[10px] tw:text-[13px] tw:hover:bg-fn-fill', path === '/guide' ? 'tw:bg-fn-primary-light tw:font-medium tw:text-fn-primary' : 'tw:text-fn-text-secondary']" @click="emit('close')">快速开始</a>
        <a href="#/components" :aria-current="path === '/components' ? 'page' : undefined" :class="['tw:flex tw:min-h-[36px] tw:items-center tw:justify-between tw:gap-[8px] tw:rounded-[6px] tw:px-[10px] tw:text-[13px] tw:hover:bg-fn-fill', path === '/components' ? 'tw:bg-fn-primary-light tw:font-medium tw:text-fn-primary' : 'tw:text-fn-text-secondary']" @click="emit('close')">组件总览 <span class="tw:text-[11px] tw:text-fn-text-muted">{{ catalog.length }}</span></a>
      </div>
      <div v-for="group in groups" :key="group.name" class="tw:mt-[22px]">
        <div class="tw:flex tw:items-center tw:justify-between tw:px-[10px] tw:pb-[8px]">
          <span class="tw:text-[12px] tw:font-semibold tw:text-fn-text-muted">{{ group.name }}</span>
          <span class="tw:text-[11px] tw:text-fn-text-muted">{{ group.items.length }}</span>
        </div>
        <a v-for="item in group.items" :key="item.slug" :href="`#/components/${item.slug}`" :aria-current="path === `/components/${item.slug}` ? 'page' : undefined" :class="['tw:flex tw:min-h-[34px] tw:items-center tw:justify-between tw:gap-[8px] tw:rounded-[6px] tw:px-[10px] tw:text-[13px] tw:hover:bg-fn-fill', path === `/components/${item.slug}` ? 'tw:bg-fn-primary-light tw:font-medium tw:text-fn-primary' : 'tw:text-fn-text-secondary']" @click="emit('close')">
          <span class="tw:truncate">{{ item.title }}</span>
          <span class="tw:shrink-0 tw:text-[11px] tw:font-normal tw:text-fn-text-muted">{{ item.name.slice(2) }}</span>
        </a>
      </div>
    </nav>
  </aside>
</template>
