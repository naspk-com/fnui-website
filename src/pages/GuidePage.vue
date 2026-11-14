<template>
  <main class="tw:w-full tw:min-w-0 tw:px-[24px] tw:pt-[32px] tw:pb-[96px] tw:lg:px-[32px]">
    <nav aria-label="面包屑" class="tw:flex tw:items-center tw:gap-[8px] tw:text-[13px] tw:text-fn-text-muted">
      <a href="#/" class="tw:hover:text-fn-text">首页</a>
      <span aria-hidden="true">/</span>
      <span>指南</span>
      <span aria-hidden="true">/</span>
      <span class="tw:text-fn-text-secondary">快速开始</span>
    </nav>
    <header class="tw:border-b tw:border-solid tw:border-fn-border tw:pt-[18px] tw:pb-[24px]">
      <h1 class="tw:m-0 tw:text-[34px] tw:leading-[1.2] tw:font-semibold tw:tracking-[-0.03em]">快速开始</h1>
      <p class="tw:mt-[12px] tw:mb-0 tw:max-w-[620px] tw:text-[15px] tw:leading-[1.8] tw:text-fn-text-secondary">从安装到第一个页面，了解如何在 fnOS 应用中使用 fnUI。</p>
    </header>

    <section id="install" class="tw:scroll-mt-[88px] tw:pt-[32px]">
      <h2 class="tw:mt-0 tw:mb-[12px] tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">安装</h2>
      <p class="tw:mt-0 tw:mb-[12px] tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">安装 fnUI、主题包以及你需要的平台依赖。</p>
      <p class="tw:mt-0 tw:mb-[16px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-fill tw:px-[16px] tw:py-[12px] tw:text-[13px] tw:leading-[1.8] tw:text-fn-text-muted">组件包目前尚未发布至 npm；在本仓库中开发时，请使用工作区依赖。</p>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>npm install @naspk/fnui @naspk/fnui-theme vue tdesign-vue-next</code></pre>
    </section>

    <section id="platform" class="tw:scroll-mt-[88px] tw:pt-[32px]">
      <h2 class="tw:mt-0 tw:mb-[12px] tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">选择平台</h2>
      <p class="tw:mt-0 tw:mb-[16px] tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">每个页面选择一个平台，并引入对应的 TDesign 和 fnUI 样式。不要在同一个 Document 中混用桌面和移动端样式。</p>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>import 'tdesign-vue-next/dist/tdesign.css'
import '@naspk/fnui-theme/desktop.css'
import { FnProvider, FnButton } from '@naspk/fnui/desktop'</code></pre>
      <p class="tw:mt-[16px] tw:mb-0 tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">移动端需要安装 <code class="tw:rounded-[4px] tw:bg-fn-fill tw:px-[5px] tw:py-[1px] tw:text-[12px]">tdesign-mobile-vue</code>，使用 <code class="tw:rounded-[4px] tw:bg-fn-fill tw:px-[5px] tw:py-[1px] tw:text-[12px]">@naspk/fnui/mobile</code>，并引入 <code class="tw:rounded-[4px] tw:bg-fn-fill tw:px-[5px] tw:py-[1px] tw:text-[12px]">tdesign-mobile-vue/dist/tdesign.css</code> 和 <code class="tw:rounded-[4px] tw:bg-fn-fill tw:px-[5px] tw:py-[1px] tw:text-[12px]">@naspk/fnui-theme/mobile.css</code>。</p>
    </section>

    <section id="provider" class="tw:scroll-mt-[88px] tw:pt-[32px]">
      <h2 class="tw:mt-0 tw:mb-[12px] tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">配置 Provider</h2>
      <p class="tw:mt-0 tw:mb-[16px] tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">在应用根部提供平台和主题。</p>
      <pre class="tw:m-0 tw:overflow-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>&lt;FnProvider platform="desktop" theme="light" preset="naspk-blue"&gt;
  &lt;App /&gt;
&lt;/FnProvider&gt;</code></pre>
    </section>

    <nav aria-label="下一步" class="tw:mt-[48px] tw:grid tw:gap-[12px] tw:border-t tw:border-solid tw:border-fn-border tw:pt-[24px] tw:sm:grid-cols-2">
      <a href="#/components" class="tw:flex tw:flex-col tw:gap-[4px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:px-[16px] tw:py-[14px] tw:hover:border-fn-primary">
        <span class="tw:text-[12px] tw:text-fn-text-muted">下一步</span>
        <span class="tw:text-[14px] tw:font-medium">浏览组件总览</span>
        <span class="tw:text-[13px] tw:text-fn-text-secondary">按用途查找组件与可运行示例。</span>
      </a>
      <a href="#/templates" class="tw:flex tw:flex-col tw:gap-[4px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:px-[16px] tw:py-[14px] tw:hover:border-fn-primary">
        <span class="tw:text-[12px] tw:text-fn-text-muted">参考实现</span>
        <span class="tw:text-[14px] tw:font-medium">查看应用模板</span>
        <span class="tw:text-[13px] tw:text-fn-text-secondary">从文件管理模板开始搭建页面。</span>
      </a>
    </nav>
  </main>
</template>
