<script setup lang="ts">
import { ref } from 'vue'
import { FnButton, FnIcon } from '@naspk/fnui/desktop'
import ShowcaseWall from '../components/ShowcaseWall.vue'

const props = defineProps<{
  theme: 'light' | 'dark'
  preset: 'naspk-blue' | 'naspk-soft-blue' | 'naspk-bright-blue'
}>()
const emit = defineEmits<{ 'update:preset': [value: typeof props.preset] }>()
const codeTab = ref<'main' | 'app'>('main')
const codeTabs = [{ id: 'main', label: 'main.ts' }, { id: 'app', label: 'App.vue' }] as const
const presets = [
  { value: 'naspk-blue', label: '经典蓝', color: '#0066ff' },
  { value: 'naspk-soft-blue', label: '柔和蓝', color: '#2f6fed' },
  { value: 'naspk-bright-blue', label: '明亮蓝', color: '#0c6aff' },
] as const
function navigate(path: string) { location.hash = path }
</script>

<template>
  <main>
    <section class="tw:relative tw:isolate tw:overflow-hidden tw:border-b tw:border-solid tw:border-fn-border">
      <div aria-hidden="true" class="tw:pointer-events-none tw:absolute tw:inset-0 tw:-z-10 tw:opacity-[0.18] tw:[background-image:radial-gradient(var(--fn-text-muted)_1px,transparent_1px)] tw:[background-size:28px_28px] tw:[mask-image:linear-gradient(transparent,black_30%,black_70%,transparent)]"></div>
      <div aria-hidden="true" class="tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:-z-10 tw:h-[160px] tw:opacity-70 tw:[background:linear-gradient(to_top,var(--fn-primary-light),transparent)]"></div>
      <div class="tw:mx-auto tw:grid tw:max-w-[1440px] tw:items-center tw:gap-[48px] tw:px-[24px] tw:py-[56px] tw:md:grid-cols-2 tw:md:px-[32px] tw:lg:py-[72px]">
        <div class="tw:max-w-[560px]">
          <a href="#/guide" class="tw:inline-flex tw:items-center tw:gap-[8px] tw:rounded-full tw:bg-fn-primary-light tw:px-[12px] tw:py-[6px] tw:text-[12px] tw:font-medium tw:text-fn-primary">为 fnOS 应用构建 <FnIcon name="arrow-right" :size="14" /></a>
          <h1 class="tw:mt-[22px] tw:mb-0 tw:text-[40px] tw:leading-[1.2] tw:font-semibold tw:tracking-[-0.04em] tw:sm:text-[48px] tw:xl:text-[60px]">构建更好的<br><span class="tw:text-fn-primary">NAS 应用</span></h1>
          <p class="tw:mt-[20px] tw:max-w-[500px] tw:text-[16px] tw:leading-[1.8] tw:text-fn-text-secondary">一套为 fnOS 设计的 Vue 组件。覆盖桌面与移动端，从基础控件到应用模板，让你的想法更快落地。</p>
          <div class="tw:mt-[32px] tw:flex tw:flex-wrap tw:gap-[12px]">
            <FnButton tone="primary" @click="navigate('/guide')">开始使用 <FnIcon name="arrow-right" :size="16" /></FnButton>
            <FnButton variant="outline" @click="navigate('/components')">浏览组件</FnButton>
          </div>
          <p class="tw:mt-[32px] tw:mb-0 tw:text-[12px] tw:text-fn-text-muted">基于 Vue 3，支持桌面与移动端</p>
        </div>
        <div class="tw:min-w-0 tw:rounded-[12px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-fill tw:p-[10px]">
          <div class="tw:flex tw:gap-[4px] tw:pb-[8px]">
            <button v-for="item in codeTabs" :key="item.id" type="button" :aria-pressed="codeTab === item.id" :class="['tw:rounded-[6px] tw:border-0 tw:px-[12px] tw:py-[8px] tw:text-[12px]', codeTab === item.id ? 'tw:bg-fn-container tw:text-fn-text' : 'tw:bg-transparent tw:text-fn-text-muted']" @click="codeTab = item.id">{{ item.label }}</button>
          </div>
          <pre v-if="codeTab === 'main'" class="tw:m-0 tw:min-h-[230px] tw:overflow-auto tw:rounded-[8px] tw:bg-[var(--site-background)] tw:p-[24px] tw:text-[12px] tw:leading-[1.9] tw:text-fn-text-secondary"><code><span class="tw:text-fn-primary">import</span> { createApp } <span class="tw:text-fn-primary">from</span> <span class="tw:text-fn-success">'vue'</span>
<span class="tw:text-fn-primary">import</span> <span class="tw:text-fn-success">'tdesign-vue-next/dist/tdesign.css'</span>
<span class="tw:text-fn-primary">import</span> <span class="tw:text-fn-success">'@naspk/fnui-theme/desktop.css'</span>
<span class="tw:text-fn-primary">import</span> App <span class="tw:text-fn-primary">from</span> <span class="tw:text-fn-success">'./App.vue'</span>

createApp(App).mount(<span class="tw:text-fn-success">'#app'</span>)</code></pre>
          <pre v-else class="tw:m-0 tw:min-h-[230px] tw:overflow-auto tw:rounded-[8px] tw:bg-[var(--site-background)] tw:p-[24px] tw:text-[12px] tw:leading-[1.9] tw:text-fn-text-secondary"><code><span class="tw:text-fn-primary">&lt;script setup&gt;</span>
<span class="tw:text-fn-primary">import</span> { FnProvider, FnButton } <span class="tw:text-fn-primary">from</span> <span class="tw:text-fn-success">'@naspk/fnui/desktop'</span>
<span class="tw:text-fn-primary">&lt;/script&gt;</span>

<span class="tw:text-fn-primary">&lt;template&gt;</span>
  <span class="tw:text-fn-primary">&lt;FnProvider</span> platform=<span class="tw:text-fn-success">"desktop"</span> theme=<span class="tw:text-fn-success">"{{ theme }}"</span> preset=<span class="tw:text-fn-success">"{{ preset }}"</span><span class="tw:text-fn-primary">&gt;</span>
    <span class="tw:text-fn-primary">&lt;FnButton</span> tone=<span class="tw:text-fn-success">"primary"</span><span class="tw:text-fn-primary">&gt;</span>开始使用<span class="tw:text-fn-primary">&lt;/FnButton&gt;</span>
  <span class="tw:text-fn-primary">&lt;/FnProvider&gt;</span>
<span class="tw:text-fn-primary">&lt;/template&gt;</span></code></pre>
          <div class="tw:flex tw:items-center tw:justify-between tw:pt-[10px] tw:text-[12px] tw:text-fn-text-muted">
            <div class="tw:flex tw:gap-[4px]" role="group" aria-label="主题预设">
              <button v-for="item in presets" :key="item.value" type="button" :aria-label="item.label" :aria-pressed="preset === item.value" :class="['tw:grid tw:h-[28px] tw:w-[28px] tw:place-items-center tw:rounded-[6px] tw:border-0', preset === item.value ? 'tw:bg-fn-fill' : 'tw:bg-transparent']" @click="emit('update:preset', item.value)"><span class="tw:h-[16px] tw:w-[16px] tw:rounded-full" :style="{ background: item.color }"></span></button>
            </div>
            <span>选择主题预设</span>
          </div>
        </div>
      </div>
    </section>

    <section class="tw:mx-auto tw:max-w-[1440px] tw:px-[20px] tw:pt-[32px] tw:pb-[80px] tw:sm:px-[32px]" aria-label="组件展示">
      <div class="tw:flex tw:items-center tw:gap-[20px]">
        <h2 class="tw:m-0 tw:text-[18px] tw:font-semibold">组件展示</h2>
        <div class="tw:hidden tw:h-px tw:flex-1 tw:bg-fn-border tw:sm:block"></div>
        <span class="tw:hidden tw:text-[12px] tw:text-fn-text-muted tw:sm:block">探索常用组件与交互</span>
      </div>
      <div class="tw:mt-[24px] tw:rounded-[12px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-fill">
        <ShowcaseWall />
      </div>
    </section>
    <footer class="tw:mx-auto tw:flex tw:max-w-[1440px] tw:flex-wrap tw:justify-between tw:gap-[12px] tw:border-t tw:border-solid tw:border-fn-border tw:px-[24px] tw:py-[26px] tw:text-[12px] tw:text-fn-text-muted"><span class="tw:font-semibold tw:text-fn-text">fnUI</span><span>为 NAS 应用构建</span></footer>
  </main>
</template>
