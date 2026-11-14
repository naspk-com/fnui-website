<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { FnIcon } from '@naspk/fnui/desktop'
import { catalog } from '../data/catalog'
import { examplesFor } from '../data/examples'
import { componentGuide } from '../data/metadata'
import DocsSidebar from '../components/DocsSidebar.vue'
import ComponentDetail from '../components/ComponentDetail.vue'
import GuidePage from './GuidePage.vue'
import ComponentsPage from './ComponentsPage.vue'

const props = defineProps<{
  path: string
  menuOpen: boolean
  theme: 'light' | 'dark'
  preset: string
}>()
const emit = defineEmits<{ closeMenu: [] }>()
const entry = computed(() => catalog.find(item => props.path === `/components/${item.slug}`))
const isGuide = computed(() => props.path === '/guide')
const isIndex = computed(() => props.path === '/components')
const activeId = ref('')
const outline = computed(() => {
  if (isGuide.value) return [{ id: 'install', label: '安装' }, { id: 'platform', label: '选择平台' }, { id: 'provider', label: '配置 Provider' }]
  if (!entry.value) return []
  return [
    { id: 'usage', label: '用法' },
    ...examplesFor(entry.value.slug).map(item => ({ id: `usage-${item.id}`, label: item.title })),
    { id: 'api', label: 'API' },
    ...(componentGuide(entry.value) ? [{ id: 'guide', label: '使用指南' }] : []),
  ]
})
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function syncActive() {
  let current = outline.value[0]?.id ?? ''
  for (const item of outline.value) {
    const element = document.getElementById(item.id)
    if (element && element.getBoundingClientRect().top <= 120) current = item.id
  }
  activeId.value = current
}
watch([() => props.path, outline], () => nextTick(syncActive))
onMounted(() => {
  window.addEventListener('scroll', syncActive, { passive: true })
  nextTick(syncActive)
})
onBeforeUnmount(() => window.removeEventListener('scroll', syncActive))
</script>

<template>
  <div class="tw:mx-auto tw:grid tw:min-h-[calc(100vh-64px)] tw:max-w-[1440px] tw:items-start tw:min-[761px]:grid-cols-[248px_minmax(0,1fr)] tw:min-[1200px]:grid-cols-[248px_minmax(0,1fr)_208px]">
    <button v-if="menuOpen" type="button" aria-label="关闭导航" class="tw:fixed tw:inset-0 tw:top-[64px] tw:z-20 tw:border-0 tw:bg-black/40 tw:min-[761px]:hidden" @click="emit('closeMenu')"></button>
    <DocsSidebar :path="path" :open="menuOpen" @close="emit('closeMenu')" />
    <GuidePage v-if="isGuide" />
    <ComponentsPage v-else-if="isIndex" />
    <ComponentDetail v-else-if="entry" :key="entry.slug" :entry="entry" :theme="theme" :preset="preset" />
    <main v-else class="tw:px-[24px] tw:py-[96px] tw:text-center tw:text-fn-text-secondary">
      <FnIcon name="file-search" :size="40" />
      <h1 class="tw:text-[24px] tw:text-fn-text">没有找到这个页面</h1>
      <p class="tw:text-[14px]">从组件目录中选择一个页面继续浏览。</p>
      <a href="#/components" class="tw:text-[14px] tw:text-fn-primary">浏览组件</a>
    </main>
    <aside v-if="outline.length" aria-label="本页内容" class="tw:sticky tw:top-[64px] tw:max-h-[calc(100vh-64px)] tw:hidden tw:overflow-y-auto tw:py-[48px] tw:pr-[16px] tw:min-[1200px]:block">
      <div class="tw:mb-[14px] tw:text-[12px] tw:font-semibold tw:text-fn-text">本页内容</div>
      <nav class="tw:flex tw:flex-col tw:items-start tw:gap-[2px] tw:border-l tw:border-solid tw:border-fn-border">
        <button
          v-for="item in outline"
          :key="item.id"
          type="button"
          :aria-current="activeId === item.id ? 'location' : undefined"
          :class="['tw:-ml-px tw:w-full tw:border-l tw:border-solid tw:bg-transparent tw:py-[7px] tw:pl-[15px] tw:pr-[4px] tw:text-left tw:text-[13px] tw:leading-[1.5] tw:transition-colors', activeId === item.id ? 'tw:border-fn-primary tw:font-medium tw:text-fn-primary' : 'tw:border-transparent tw:text-fn-text-muted tw:hover:text-fn-text']"
          @click="scrollTo(item.id)"
        >{{ item.label }}</button>
      </nav>
      <div class="tw:mt-[24px] tw:border-t tw:border-solid tw:border-fn-border tw:pt-[16px]">
        <a href="#/components" class="tw:flex tw:items-center tw:gap-[6px] tw:text-[12px] tw:text-fn-text-muted tw:hover:text-fn-primary"><FnIcon name="view-list" :size="14" /> 全部组件</a>
      </div>
    </aside>
  </div>
</template>
