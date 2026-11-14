<script setup lang="ts">
import { computed, ref } from 'vue'
import { FnButton, FnIcon } from '@naspk/fnui/desktop'
import ShowcaseWall from '../components/ShowcaseWall.vue'
import { accents, type Accent } from '../data/accents'
import { navigate } from '../router'

const props = defineProps<{
  theme: 'light' | 'dark'
  preset: 'naspk-blue'
  accent: Accent
}>()
const emit = defineEmits<{ 'update:accent': [value: Accent] }>()
const codeTab = ref<'main' | 'app'>('main')
const codeTabs = [{ id: 'main', label: 'main.ts' }, { id: 'app', label: 'App.vue' }] as const
const selectedAccent = computed(() => accents.find(item => item.value === props.accent) ?? accents[0])
</script>

<template>
  <main>
    <section class="tw:relative tw:isolate tw:overflow-hidden tw:border-b tw:border-solid tw:border-fn-border">
      <div aria-hidden="true" class="tw:pointer-events-none tw:absolute tw:inset-0 tw:-z-10 tw:opacity-[0.18] tw:[background-image:radial-gradient(var(--fn-text-muted)_1px,transparent_1px)] tw:[background-size:28px_28px] tw:[mask-image:linear-gradient(transparent,black_30%,black_70%,transparent)]"></div>
      <div aria-hidden="true" class="tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:-z-10 tw:h-[160px] tw:opacity-70 tw:[background:linear-gradient(to_top,var(--fn-primary-light),transparent)]"></div>
      <div class="tw:mx-auto tw:grid tw:max-w-[1440px] tw:items-center tw:gap-[48px] tw:px-[24px] tw:py-[56px] tw:md:grid-cols-2 tw:md:px-[32px] tw:lg:py-[72px]">
        <div class="tw:max-w-[560px]">
          <a href="/guide" class="tw:inline-flex tw:items-center tw:gap-[8px] tw:rounded-full tw:bg-fn-primary-light tw:px-[12px] tw:py-[6px] tw:text-[12px] tw:font-medium tw:text-fn-primary">为 fnOS 应用构建 <FnIcon name="arrow-right" :size="14" /></a>
          <h1 class="tw:mt-[22px] tw:mb-0 tw:text-[40px] tw:leading-[1.2] tw:font-semibold tw:tracking-[-0.04em] tw:sm:text-[48px] tw:xl:text-[60px]">构建更好的<br><span class="tw:text-fn-primary">NAS 应用</span></h1>
          <p class="tw:mt-[20px] tw:max-w-[500px] tw:text-[16px] tw:leading-[1.8] tw:text-fn-text-secondary">一套为 fnOS 设计的 Vue 组件。覆盖桌面与移动端，从基础控件到应用模板，让你的想法更快落地。</p>
          <div class="tw:mt-[32px] tw:flex tw:flex-wrap tw:gap-[12px]">
            <FnButton tone="primary" @click="navigate('/guide')">开始使用 <FnIcon name="arrow-right" :size="16" /></FnButton>
            <FnButton variant="light" @click="navigate('/components')">浏览组件</FnButton>
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
          <div class="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-[8px] tw:pt-[10px] tw:text-[12px] tw:text-fn-text-muted">
            <div class="tw:flex tw:flex-wrap tw:gap-[2px]" role="group" aria-label="站点主题色预览">
              <button v-for="item in accents" :key="item.value" type="button" :aria-label="item.label" :title="item.label" :aria-pressed="accent === item.value" :class="['tw:grid tw:h-[32px] tw:w-[32px] tw:place-items-center tw:rounded-[7px] tw:border-0', accent === item.value ? 'tw:bg-fn-container' : 'tw:bg-transparent']" @click="emit('update:accent', item.value)">
                <span class="tw:grid tw:h-[20px] tw:w-[20px] tw:place-items-center tw:rounded-full" :style="{ background: item.color }"><FnIcon v-if="accent === item.value" name="check" :size="14" class="tw:text-white" /></span>
              </button>
            </div>
            <span>主题色预览：{{ selectedAccent.label }}</span>
          </div>
          <p class="tw:mt-[4px] tw:mb-0 tw:px-[4px] tw:pb-[2px] tw:text-[11px] tw:text-fn-text-muted">颜色仅用于站点体验，不代表已发布的预设。</p>
        </div>
      </div>
    </section>

    <section class="tw:mx-auto tw:max-w-[1440px] tw:px-[20px] tw:pt-[32px] tw:pb-[80px] tw:sm:px-[32px]" aria-label="组件展示">
      <div class="tw:flex tw:items-center tw:gap-[20px]">
        <h2 class="tw:m-0 tw:text-[18px] tw:font-semibold">NAS 场景展示</h2>
        <div class="tw:hidden tw:h-px tw:flex-1 tw:bg-fn-border tw:sm:block"></div>
        <span class="tw:hidden tw:text-[12px] tw:text-fn-text-muted tw:sm:block">文件、存储、备份与共享</span>
      </div>
      <p class="tw:mt-[8px] tw:mb-0 tw:text-[13px] tw:leading-[1.6] tw:text-fn-text-muted">以下为模拟数据，试试组件组合与交互，不会修改真实 NAS 配置。</p>
      <div class="tw:mt-[24px] tw:rounded-[12px] tw:bg-fn-fill">
        <ShowcaseWall />
      </div>
    </section>
  </main>

  <footer class="tw:border-t tw:border-solid tw:border-fn-border tw:bg-fn-fill">
    <div class="tw:mx-auto tw:max-w-[1440px] tw:px-[24px] tw:pt-[48px] tw:pb-[24px] tw:sm:px-[32px] tw:sm:pt-[56px]">
      <div class="tw:grid tw:gap-[36px] tw:md:grid-cols-[minmax(0,1fr)_auto_auto] tw:md:gap-[80px]">
        <div class="tw:max-w-[420px]">
          <a href="/" aria-label="fnUI 首页" class="tw:inline-flex tw:items-center tw:gap-[9px] tw:text-[20px] tw:font-semibold tw:tracking-[-0.04em] tw:text-fn-text">
            <span aria-hidden="true" class="tw:grid tw:h-[24px] tw:w-[24px] tw:place-items-center tw:rounded-[7px] tw:bg-fn-primary tw:text-[14px] tw:font-bold tw:tracking-[-0.06em] tw:text-white">f</span>
            fnUI
          </a>
          <p class="tw:mt-[14px] tw:mb-0 tw:text-[14px] tw:leading-[1.7] tw:text-fn-text-secondary">为 fnOS 构建的 Vue 组件与主题。</p>
          <p class="tw:mt-[20px] tw:mb-0 tw:text-[13px] tw:leading-[1.8] tw:text-fn-text-secondary">
            <span class="tw:font-medium tw:text-fn-text">开发版本</span><br>
            当前不建议用于生产环境。欢迎反馈、参与讨论和贡献代码，一起完善 fnUI。
          </p>
        </div>

        <div class="tw:grid tw:grid-cols-2 tw:gap-[32px] tw:md:contents">
          <nav aria-label="npm 软件包" class="tw:flex tw:flex-col tw:items-start tw:gap-[12px] tw:text-[13px]">
            <h2 class="tw:mt-0 tw:mb-[4px] tw:text-[13px] tw:font-semibold tw:text-fn-text">npm 软件包</h2>
            <a href="https://www.npmjs.com/package/@naspk/fnui" target="_blank" rel="noopener noreferrer" class="tw:text-fn-text-secondary tw:hover:text-fn-primary">@naspk/fnui</a>
            <a href="https://www.npmjs.com/package/@naspk/fnui-theme" target="_blank" rel="noopener noreferrer" class="tw:text-fn-text-secondary tw:hover:text-fn-primary">@naspk/fnui-theme</a>
          </nav>
          <nav aria-label="GitHub 源码" class="tw:flex tw:flex-col tw:items-start tw:gap-[12px] tw:text-[13px]">
            <h2 class="tw:mt-0 tw:mb-[4px] tw:text-[13px] tw:font-semibold tw:text-fn-text">GitHub 源码</h2>
            <a href="https://github.com/naspk-com/fnUI" target="_blank" rel="noopener noreferrer" class="tw:text-fn-text-secondary tw:hover:text-fn-primary">fnUI</a>
            <a href="https://github.com/naspk-com/fnui-theme" target="_blank" rel="noopener noreferrer" class="tw:text-fn-text-secondary tw:hover:text-fn-primary">fnUI Theme</a>
          </nav>
        </div>
      </div>
      <div class="tw:mt-[48px] tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-[12px] tw:border-t tw:border-solid tw:border-fn-border tw:pt-[20px] tw:text-[12px] tw:text-fn-text-muted">
        <a href="https://fnui.design" class="tw:hover:text-fn-primary">fnui.design</a>
        <span>与社区一起，为 NAS 应用构建更好的体验。</span>
      </div>
    </div>
  </footer>
</template>
