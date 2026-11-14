<template>
  <main class="tw:w-full tw:min-w-0 tw:px-[24px] tw:pt-[32px] tw:pb-[96px] tw:lg:px-[32px]">
    <nav aria-label="面包屑" class="tw:flex tw:items-center tw:gap-[8px] tw:text-[13px] tw:text-fn-text-muted">
      <a href="/" class="tw:hover:text-fn-text">首页</a>
      <span aria-hidden="true">/</span>
      <span>指南</span>
      <span aria-hidden="true">/</span>
      <span class="tw:text-fn-text-secondary">快速开始</span>
    </nav>
    <header class="tw:border-b tw:border-solid tw:border-fn-border tw:pt-[18px] tw:pb-[24px]">
      <h1 class="tw:m-0 tw:text-[34px] tw:leading-[1.2] tw:font-semibold tw:tracking-[-0.03em]">快速开始</h1>
      <p class="tw:mt-[12px] tw:mb-0 tw:max-w-[620px] tw:text-[15px] tw:leading-[1.8] tw:text-fn-text-secondary">在 Vue 3 项目中安装 fnUI，选择桌面端或移动端，并创建第一个页面。</p>
      <p class="tw:mt-[16px] tw:mb-0 tw:rounded-[8px] tw:bg-fn-fill tw:px-[16px] tw:py-[12px] tw:text-[13px] tw:leading-[1.8] tw:text-fn-text-secondary">fnUI 目前处于开发阶段，不建议用于生产环境。欢迎在 <a href="https://github.com/naspk-com/fnUI" target="_blank" rel="noopener noreferrer" class="tw:text-fn-primary">GitHub</a> 反馈问题或参与共创。</p>
    </header>

    <section id="install" class="tw:scroll-mt-[88px] tw:pt-[32px]">
      <h2 class="tw:mt-0 tw:mb-[12px] tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">安装</h2>
      <p class="tw:mt-0 tw:mb-[16px] tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">组件库和主题包均已发布到 npm。以下命令适用于已有的 Vue 3 项目；根据目标平台选择对应的 TDesign 依赖。</p>
      <h3 class="tw:mt-0 tw:mb-[8px] tw:text-[14px] tw:font-semibold">桌面端</h3>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>npm install @naspk/fnui @naspk/fnui-theme vue tdesign-vue-next@1.20.11</code></pre>
      <h3 class="tw:mt-[20px] tw:mb-[8px] tw:text-[14px] tw:font-semibold">移动端</h3>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>npm install @naspk/fnui @naspk/fnui-theme vue tdesign-mobile-vue@1.17.1</code></pre>
      <p class="tw:mt-[12px] tw:mb-0 tw:text-[13px] tw:leading-[1.8] tw:text-fn-text-muted">当前版本要求 Vue 3.5 及以上；TDesign 版本与组件包的 peer dependency 保持一致。已有 Vue 项目无需重复安装 Vue。</p>
    </section>

    <section id="platform" class="tw:scroll-mt-[88px] tw:pt-[32px]">
      <h2 class="tw:mt-0 tw:mb-[12px] tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">选择平台</h2>
      <p class="tw:mt-0 tw:mb-[16px] tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">每个页面选择一个平台。在应用入口先引入对应的 TDesign 样式，再引入 fnUI 主题样式；不要在同一个 Document 中混用桌面端和移动端样式。</p>
      <h3 class="tw:mt-0 tw:mb-[8px] tw:text-[14px] tw:font-semibold">桌面端入口，例如 main.ts</h3>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>import { createApp } from 'vue'
import 'tdesign-vue-next/dist/tdesign.css'
import '@naspk/fnui-theme/desktop.css'
import App from './App.vue'

createApp(App).mount('#app')</code></pre>
      <h3 class="tw:mt-[20px] tw:mb-[8px] tw:text-[14px] tw:font-semibold">移动端入口，例如 main.ts</h3>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>import { createApp } from 'vue'
import 'tdesign-mobile-vue/dist/tdesign.css'
import '@naspk/fnui-theme/mobile.css'
import App from './App.vue'

createApp(App).mount('#app')</code></pre>
    </section>

    <section id="provider" class="tw:scroll-mt-[88px] tw:pt-[32px]">
      <h2 class="tw:mt-0 tw:mb-[12px] tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">配置 Provider</h2>
      <p class="tw:mt-0 tw:mb-[16px] tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">在应用根组件中使用对应平台的 Provider 包裹界面。下面是完整的桌面端 App.vue；移动端将导入路径改为 <code class="tw:rounded-[4px] tw:bg-fn-fill tw:px-[5px] tw:py-[1px] tw:text-[12px]">@naspk/fnui/mobile</code> 即可。</p>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>&lt;script setup&gt;
import { FnProvider, FnButton } from '@naspk/fnui/desktop'
&lt;/script&gt;

&lt;template&gt;
  &lt;FnProvider theme="light" preset="naspk-blue" locale="zh-CN"&gt;
    &lt;FnButton tone="primary"&gt;开始使用&lt;/FnButton&gt;
  &lt;/FnProvider&gt;
&lt;/template&gt;</code></pre>
      <p class="tw:mt-[12px] tw:mb-0 tw:text-[13px] tw:leading-[1.8] tw:text-fn-text-muted">将 <code>theme</code> 设为 <code>dark</code> 可使用深色主题。首页的其他主题色仅供站点预览，并非已发布的 Provider 预设。</p>
    </section>

    <nav aria-label="下一步" class="tw:mt-[48px] tw:grid tw:gap-[12px] tw:border-t tw:border-solid tw:border-fn-border tw:pt-[24px] tw:sm:grid-cols-2">
      <a href="/components" class="tw:flex tw:flex-col tw:gap-[4px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:px-[16px] tw:py-[14px] tw:hover:border-fn-primary">
        <span class="tw:text-[12px] tw:text-fn-text-muted">下一步</span>
        <span class="tw:text-[14px] tw:font-medium">浏览组件总览</span>
        <span class="tw:text-[13px] tw:text-fn-text-secondary">按用途查找组件与可运行示例。</span>
      </a>
      <a href="/templates" class="tw:flex tw:flex-col tw:gap-[4px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:px-[16px] tw:py-[14px] tw:hover:border-fn-primary">
        <span class="tw:text-[12px] tw:text-fn-text-muted">参考实现</span>
        <span class="tw:text-[14px] tw:font-medium">查看应用模板</span>
        <span class="tw:text-[13px] tw:text-fn-text-secondary">从文件管理模板开始搭建页面。</span>
      </a>
    </nav>
  </main>
</template>
