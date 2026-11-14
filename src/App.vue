<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { FnButton, FnIcon, FnProvider } from '@naspk/fnui/desktop'
import HomePage from './pages/HomePage.vue'
import DocsPage from './pages/DocsPage.vue'
import TemplatesPage from './pages/TemplatesPage.vue'
import SearchModal from './components/SearchModal.vue'

const path = ref(location.hash.slice(1).split('?')[0] || '/')
const theme = ref<'light' | 'dark'>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
const preset = ref<'naspk-blue' | 'naspk-soft-blue' | 'naspk-bright-blue'>('naspk-blue')
const menuOpen = ref(false)
const searchOpen = ref(false)
const isHome = computed(() => path.value === '/')
const isTemplates = computed(() => path.value === '/templates' || path.value.startsWith('/templates/'))

function syncRoute() {
  path.value = location.hash.slice(1).split('?')[0] || '/'
  window.scrollTo({ top: 0, behavior: 'instant' })
}
function openSearch() {
  searchOpen.value = true
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    openSearch()
    return
  }
  if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey ||
      /INPUT|TEXTAREA|SELECT/.test((event.target as HTMLElement)?.tagName ?? '')) return
  event.preventDefault()
  openSearch()
}
onMounted(() => {
  window.addEventListener('hashchange', syncRoute)
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncRoute)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <FnProvider platform="desktop" :theme="theme" :preset="preset">
    <div class="tw:min-h-screen tw:bg-[var(--site-background)] tw:text-fn-text" :style="{ colorScheme: theme, '--site-background': theme === 'dark' ? 'var(--fn-page)' : 'var(--fn-container)' }">
      <header v-if="!isTemplates" class="tw:sticky tw:top-0 tw:z-40 tw:border-b tw:border-solid tw:border-fn-border tw:bg-[var(--site-background)]">
        <div class="tw:mx-auto tw:flex tw:h-[64px] tw:max-w-[1440px] tw:items-center tw:gap-[28px] tw:px-[20px] tw:sm:px-[32px]">
          <a href="#/" class="tw:flex tw:items-center tw:gap-[9px] tw:text-[21px] tw:font-semibold tw:tracking-[-0.04em]" aria-label="fnUI 首页">
            <span class="tw:grid tw:h-[24px] tw:w-[24px] tw:place-items-center tw:rounded-[7px] tw:bg-fn-primary tw:text-[14px] tw:font-bold tw:tracking-[-0.06em] tw:text-white" aria-hidden="true">f</span>
            <span>fnUI</span>
          </a>
          <nav aria-label="主导航" class="tw:mx-auto tw:hidden tw:items-center tw:gap-[28px] tw:text-[14px] tw:font-medium tw:text-fn-text-secondary tw:min-[761px]:flex">
            <a href="#/guide" :class="path === '/guide' ? 'tw:text-fn-primary' : 'tw:hover:text-fn-text'">指南</a>
            <a href="#/components" :class="path.startsWith('/components') ? 'tw:text-fn-primary' : 'tw:hover:text-fn-text'">组件</a>
            <a href="#/templates" :class="isTemplates ? 'tw:text-fn-primary' : 'tw:hover:text-fn-text'">应用模板</a>
          </nav>
          <div class="tw:ml-auto tw:flex tw:items-center tw:gap-[8px] tw:min-[761px]:ml-0">
            <button type="button" aria-label="搜索组件" class="tw:flex tw:h-[34px] tw:items-center tw:gap-[8px] tw:rounded-[7px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:px-[10px] tw:text-[13px] tw:text-fn-text-muted tw:hover:border-fn-primary tw:hover:text-fn-text" @click="openSearch">
              <FnIcon name="search" :size="16" />
              <span class="tw:hidden tw:pr-[16px] tw:min-[761px]:inline">搜索组件</span>
              <kbd class="tw:hidden tw:rounded-[4px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-fill tw:px-[5px] tw:py-[1px] tw:text-[11px] tw:min-[761px]:inline">⌘K</kbd>
            </button>
            <FnButton variant="text" size="small" :aria-label="theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'" @click="theme = theme === 'dark' ? 'light' : 'dark'"><FnIcon :name="theme === 'dark' ? 'sunny' : 'moon'" :size="18" /></FnButton>
            <a href="#/guide" class="tw:hidden tw:rounded-[6px] tw:bg-fn-primary-light tw:px-[12px] tw:py-[7px] tw:text-[13px] tw:font-medium tw:text-fn-primary tw:sm:inline">开始使用</a>
            <span class="tw:min-[761px]:hidden"><FnButton variant="text" size="small" :aria-expanded="menuOpen" :aria-label="menuOpen ? '关闭导航' : '打开导航'" @click="menuOpen = !menuOpen"><FnIcon :name="menuOpen ? 'close' : 'view-list'" :size="20" /></FnButton></span>
          </div>
        </div>
        <nav v-if="(isHome || isTemplates) && menuOpen" aria-label="移动端导航" class="tw:flex tw:flex-col tw:gap-[4px] tw:border-t tw:border-solid tw:border-fn-border tw:px-[20px] tw:py-[12px] tw:min-[761px]:hidden">
          <a href="#/guide" class="tw:rounded-[6px] tw:px-[10px] tw:py-[10px] tw:text-[14px]">指南</a>
          <a href="#/components" class="tw:rounded-[6px] tw:px-[10px] tw:py-[10px] tw:text-[14px]">组件</a>
          <a href="#/templates" class="tw:rounded-[6px] tw:px-[10px] tw:py-[10px] tw:text-[14px]">应用模板</a>
        </nav>
      </header>
      <HomePage v-if="isHome" :theme="theme" :preset="preset" @update:preset="preset = $event" />
      <TemplatesPage v-else-if="isTemplates" :theme="theme" :preset="preset" />
      <DocsPage v-else :path="path" :theme="theme" :preset="preset" :menu-open="menuOpen" @close-menu="menuOpen = false" />
      <SearchModal v-model:open="searchOpen" />
    </div>
  </FnProvider>
</template>
