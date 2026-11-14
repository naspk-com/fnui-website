<script setup lang="ts">
import { computed } from 'vue'
import { FnIcon } from '@naspk/fnui/desktop'
import { catalog, groupDescriptions, groupNames } from '../data/catalog'
import { examplesFor } from '../data/examples'

const groups = computed(() => groupNames.map(name => ({
  name,
  description: groupDescriptions[name],
  items: catalog.filter(item => item.group === name),
})).filter(group => group.items.length))
const total = computed(() => catalog.length)
const documented = computed(() => catalog.filter(item => examplesFor(item.slug).length).length)
</script>

<template>
  <main class="tw:w-full tw:min-w-0 tw:px-[24px] tw:pt-[40px] tw:pb-[100px] tw:lg:px-[32px]">
    <nav aria-label="面包屑" class="tw:flex tw:items-center tw:gap-[8px] tw:text-[13px] tw:text-fn-text-muted">
      <a href="#/" class="tw:hover:text-fn-text">首页</a>
      <span aria-hidden="true">/</span>
      <span class="tw:text-fn-text-secondary">组件</span>
    </nav>
    <header class="tw:border-b tw:border-solid tw:border-fn-border tw:pt-[20px] tw:pb-[28px]">
      <h1 class="tw:m-0 tw:text-[34px] tw:leading-[1.2] tw:font-semibold tw:tracking-[-0.03em]">组件</h1>
      <p class="tw:mt-[14px] tw:mb-0 tw:max-w-[620px] tw:text-[15px] tw:leading-[1.8] tw:text-fn-text-secondary">
        为 fnOS 应用准备的 Vue 组件库，覆盖桌面与移动端。按用途浏览全部 {{ total }} 个组件，其中 {{ documented }} 个附带可运行示例。
      </p>
    </header>

    <section v-for="group in groups" :key="group.name" class="tw:pt-[36px]">
      <div class="tw:flex tw:items-baseline tw:justify-between tw:gap-[16px]">
        <h2 class="tw:m-0 tw:text-[20px] tw:font-semibold tw:tracking-[-0.01em]">{{ group.name }}</h2>
        <span class="tw:text-[12px] tw:text-fn-text-muted">{{ group.items.length }} 个组件</span>
      </div>
      <p class="tw:mt-[8px] tw:mb-0 tw:text-[14px] tw:leading-[1.7] tw:text-fn-text-secondary">{{ group.description }}</p>
      <div class="tw:mt-[18px] tw:grid tw:gap-[10px] tw:sm:grid-cols-2">
        <a
          v-for="item in group.items"
          :key="item.slug"
          :href="`#/components/${item.slug}`"
          class="tw:group tw:flex tw:items-start tw:justify-between tw:gap-[16px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:px-[16px] tw:py-[14px] tw:transition-colors tw:hover:border-fn-primary tw:hover:bg-fn-fill"
        >
          <span class="tw:min-w-0">
            <span class="tw:flex tw:items-center tw:gap-[8px]">
              <span class="tw:text-[14px] tw:font-medium">{{ item.title }}</span>
              <span class="tw:text-[12px] tw:text-fn-text-muted">{{ item.name }}</span>
              <span v-if="examplesFor(item.slug).length" class="tw:rounded-full tw:bg-fn-primary-light tw:px-[7px] tw:py-[1px] tw:text-[11px] tw:text-fn-primary">示例</span>
            </span>
            <span class="tw:mt-[5px] tw:block tw:text-[13px] tw:leading-[1.6] tw:text-fn-text-secondary">{{ item.description }}</span>
          </span>
          <FnIcon name="chevron-right" :size="16" class="tw:mt-[2px] tw:shrink-0 tw:text-fn-text-muted tw:transition-colors tw:group-hover:text-fn-primary" />
        </a>
      </div>
    </section>
  </main>
</template>
