<script setup lang="ts">
import { computed, ref } from 'vue'
import { FnButton, FnIcon, FnTag } from '@naspk/fnui/desktop'
import { catalog, type ComponentEntry } from '../data/catalog'
import { examplesFor } from '../data/examples'
import { componentEvents, componentGuide, componentProps } from '../data/metadata'
import ExamplePreview from './ExamplePreview.vue'

const props = defineProps<{
  entry: ComponentEntry
  theme: 'light' | 'dark'
  preset: string
}>()
const examples = computed(() => examplesFor(props.entry.slug))
const apiProps = computed(() => componentProps(props.entry))
const events = computed(() => componentEvents(props.entry))
const guide = computed(() => componentGuide(props.entry))
type Inline = { kind: 'text' | 'code' | 'strong' | 'link'; text: string; href?: string }
type GuideBlock = { kind: 'heading'; text: string } | { kind: 'paragraph'; content: Inline[] } | { kind: 'list'; items: Inline[][] }
function parseInline(text: string): Inline[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean).map(part => {
    if (part.startsWith('`')) return { kind: 'code', text: part.slice(1, -1) }
    if (part.startsWith('**')) return { kind: 'strong', text: part.slice(2, -2) }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return { kind: 'link', text: link[1], href: link[2] }
    return { kind: 'text', text: part }
  })
}
function parseListItem(text: string): Inline[] {
  const segments = parseInline(text)
  const first = segments[0]
  const match = first?.kind === 'text' ? first.text.match(/^([A-Z][A-Za-z ]{1,24}):\s+/) : null
  if (match && first) segments.splice(0, 1, { kind: 'strong', text: `${match[1]}:` }, { kind: 'text', text: ` ${first.text.slice(match[0].length)}` })
  return segments
}
function parseGuide(markdown: string): GuideBlock[] {
  const blocks: GuideBlock[] = []
  let list: string[] | null = null
  let paragraph: string[] = []
  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ kind: 'paragraph', content: parseInline(paragraph.join(' ')) })
    paragraph = []
  }
  const flushList = () => {
    if (list) blocks.push({ kind: 'list', items: list.map(parseListItem) })
    list = null
  }
  for (const raw of markdown.split('\n')) {
    const line = raw.trim()
    if (!line) { flushParagraph(); flushList(); continue }
    if (/^##\s+/.test(line)) {
      flushParagraph()
      flushList()
      blocks.push({ kind: 'heading', text: line.replace(/^##\s+/, '') })
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph()
      list ??= []
      list.push(line.replace(/^[-*]\s+/, ''))
      continue
    }
    if (list && /^\s{2,}/.test(raw)) {
      list[list.length - 1] += ` ${line}`
      continue
    }
    flushList()
    paragraph.push(line)
  }
  flushParagraph()
  flushList()
  return blocks
}
const guideBlocks = computed(() => {
  const text = guide.value
  if (!text) return []
  const lines = text.split('\n')
  if (/^#\s+/.test(lines[0]?.trim() ?? '')) lines.shift()
  return parseGuide(lines.join('\n'))
})
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
const index = computed(() => catalog.findIndex(item => item.slug === props.entry.slug))
const previous = computed(() => (index.value > 0 ? catalog[index.value - 1] : undefined))
const next = computed(() => (index.value >= 0 && index.value < catalog.length - 1 ? catalog[index.value + 1] : undefined))
async function copyLink() {
  try {
    await navigator.clipboard.writeText(`${location.origin}${location.pathname}#/components/${props.entry.slug}`)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    copied.value = false
  }
}
function scrollToUsage() {
  document.getElementById('usage')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <main class="tw:w-full tw:min-w-0 tw:px-[24px] tw:pt-[32px] tw:pb-[96px] tw:lg:px-[32px]">
    <nav aria-label="面包屑" class="tw:flex tw:flex-wrap tw:items-center tw:gap-[8px] tw:text-[13px] tw:text-fn-text-muted">
      <a href="#/" class="tw:hover:text-fn-text">首页</a>
      <span aria-hidden="true">/</span>
      <a href="#/components" class="tw:hover:text-fn-text">组件</a>
      <span aria-hidden="true">/</span>
      <span>{{ entry.group }}</span>
      <span aria-hidden="true">/</span>
      <span class="tw:text-fn-text-secondary">{{ entry.title }}</span>
    </nav>

    <header class="tw:border-b tw:border-solid tw:border-fn-border tw:pt-[18px] tw:pb-[24px]">
      <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-[10px]">
        <h1 class="tw:m-0 tw:text-[34px] tw:leading-[1.2] tw:font-semibold tw:tracking-[-0.03em]">{{ entry.title }}</h1>
        <span class="tw:rounded-[5px] tw:bg-fn-fill tw:px-[7px] tw:py-[2px] tw:text-[12px] tw:text-fn-text-secondary">{{ entry.name }}</span>
        <FnTag v-if="entry.mobileOnly" tone="primary">移动端</FnTag>
      </div>
      <p class="tw:mt-[12px] tw:mb-0 tw:max-w-[640px] tw:text-[15px] tw:leading-[1.8] tw:text-fn-text-secondary">{{ entry.description || `查看 ${entry.name} 的使用示例、属性和事件。` }}</p>
      <div class="tw:mt-[20px] tw:flex tw:flex-wrap tw:items-center tw:gap-[8px]">
        <FnButton size="small" variant="outline" @click="scrollToUsage">查看示例</FnButton>
        <FnButton size="small" variant="outline" @click="copyLink">{{ copied ? '链接已复制' : '复制链接' }}</FnButton>
        <a :href="`#/components`" class="tw:inline-flex tw:items-center tw:gap-[4px] tw:px-[8px] tw:py-[6px] tw:text-[13px] tw:text-fn-text-muted tw:hover:text-fn-primary">组件总览 <FnIcon name="chevron-right" :size="14" /></a>
      </div>
    </header>

    <section id="usage" class="tw:scroll-mt-[88px] tw:pt-[32px]">
      <div class="tw:flex tw:items-baseline tw:justify-between tw:gap-[16px]">
        <h2 class="tw:m-0 tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">用法</h2>
        <span class="tw:text-[12px] tw:text-fn-text-muted">{{ examples.length ? `${examples.length} 个示例` : '暂无示例' }}</span>
      </div>
      <p v-if="!examples.length" class="tw:mt-[14px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-fill tw:px-[16px] tw:py-[14px] tw:text-[14px] tw:leading-[1.8] tw:text-fn-text-secondary">
        该组件的可运行示例尚未编写，可先查阅下方 API 和使用指南，或到
        <a href="#/components" class="tw:text-fn-primary">组件总览</a> 浏览其他组件。
      </p>
      <section v-for="example in examples" :id="`usage-${example.id}`" :key="example.id" class="tw:scroll-mt-[88px] tw:pt-[28px] tw:first-of-type:pt-[20px]">
        <h3 class="tw:mt-0 tw:mb-[6px] tw:text-[16px] tw:font-semibold">{{ example.title }}</h3>
        <p class="tw:mt-0 tw:mb-[16px] tw:text-[14px] tw:leading-[1.75] tw:text-fn-text-secondary">{{ example.description }}</p>
        <ExamplePreview :name="example.id" :title="`${entry.title}：${example.title}`" :source="example.source" :mobile-only="entry.mobileOnly" :theme="theme" :preset="preset" />
      </section>
      <p v-if="examples.length" class="tw:mt-[18px] tw:text-[12px] tw:leading-[1.7] tw:text-fn-text-muted">源码中的组件导入会随预览平台切换；使用前请先配置对应平台的样式与 Provider。</p>
    </section>

    <section id="api" class="tw:scroll-mt-[88px] tw:mt-[48px] tw:border-t tw:border-solid tw:border-fn-border tw:pt-[32px]">
      <h2 class="tw:m-0 tw:text-[22px] tw:font-semibold tw:tracking-[-0.01em]">API</h2>
      <p class="tw:mt-[10px] tw:text-[14px] tw:leading-[1.7] tw:text-fn-text-secondary">属性与事件来自当前组件实现。</p>
      <template v-if="apiProps.length">
        <h3 class="tw:mt-[24px] tw:mb-[12px] tw:text-[16px] tw:font-semibold">Props</h3>
        <div class="tw:overflow-x-auto tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border">
          <table class="tw:w-full tw:border-collapse tw:text-left tw:text-[13px]">
            <thead class="tw:bg-fn-fill tw:text-fn-text-secondary">
              <tr>
                <th class="tw:p-[12px] tw:font-medium">Prop</th>
                <th class="tw:p-[12px] tw:font-medium">Default</th>
                <th class="tw:p-[12px] tw:font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in apiProps" :key="prop.name" class="tw:border-t tw:border-solid tw:border-fn-border">
                <td class="tw:p-[12px] tw:whitespace-nowrap"><code class="tw:text-fn-primary">{{ prop.name }}</code><span v-if="prop.required" class="tw:ml-[4px] tw:text-fn-danger" aria-label="必填">*</span></td>
                <td class="tw:p-[12px] tw:whitespace-nowrap tw:text-fn-text-secondary"><code>{{ prop.fallback }}</code></td>
                <td class="tw:p-[12px] tw:text-fn-text-secondary">{{ prop.type }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <p v-else class="tw:text-[14px] tw:text-fn-text-muted">当前平台入口未提供可展示的属性定义。</p>
      <template v-if="events.length">
        <h3 class="tw:mt-[28px] tw:mb-[12px] tw:text-[16px] tw:font-semibold">Events</h3>
        <div class="tw:flex tw:flex-wrap tw:gap-[8px]"><code v-for="event in events" :key="event" class="tw:rounded-[5px] tw:bg-fn-fill tw:px-[8px] tw:py-[5px] tw:text-[12px] tw:text-fn-text-secondary">{{ event }}</code></div>
      </template>
    </section>

    <section v-if="guideBlocks.length" id="guide" class="tw:scroll-mt-[88px] tw:mt-[48px] tw:border-t tw:border-solid tw:border-fn-border tw:pt-[32px]">
      <h2 class="tw:m-0 tw:text-[21px] tw:font-semibold tw:tracking-[-0.01em]">使用指南</h2>
      <p class="tw:mt-[8px] tw:text-[14px] tw:text-fn-text-secondary">组件定位、行为规则与设计参考。</p>
      <div class="fn-guide tw:mt-[14px] tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-page tw:px-[20px] tw:py-[18px]">
        <template v-for="(block, index) in guideBlocks" :key="index">
          <h3 v-if="block.kind === 'heading'" class="fn-guide__heading">{{ block.text }}</h3>
          <ul v-else-if="block.kind === 'list'" class="fn-guide__list">
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
              <template v-for="(segment, segmentIndex) in item" :key="segmentIndex">
                <code v-if="segment.kind === 'code'">{{ segment.text }}</code>
                <strong v-else-if="segment.kind === 'strong'">{{ segment.text }}</strong>
                <a v-else-if="segment.kind === 'link'" :href="segment.href" target="_blank" rel="noreferrer">{{ segment.text }}</a>
                <span v-else>{{ segment.text }}</span>
              </template>
            </li>
          </ul>
          <p v-else class="fn-guide__paragraph">
            <template v-for="(segment, segmentIndex) in block.content" :key="segmentIndex">
              <code v-if="segment.kind === 'code'">{{ segment.text }}</code>
              <strong v-else-if="segment.kind === 'strong'">{{ segment.text }}</strong>
              <a v-else-if="segment.kind === 'link'" :href="segment.href" target="_blank" rel="noreferrer">{{ segment.text }}</a>
              <span v-else>{{ segment.text }}</span>
            </template>
          </p>
        </template>
      </div>
    </section>

    <nav v-if="previous || next" aria-label="上下页" class="tw:mt-[56px] tw:grid tw:gap-[12px] tw:border-t tw:border-solid tw:border-fn-border tw:pt-[24px] tw:sm:grid-cols-2">
      <a v-if="previous" :href="`#/components/${previous.slug}`" class="tw:flex tw:flex-col tw:gap-[4px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:px-[16px] tw:py-[12px] tw:hover:border-fn-primary">
        <span class="tw:flex tw:items-center tw:gap-[4px] tw:text-[12px] tw:text-fn-text-muted"><FnIcon name="chevron-left" :size="13" /> 上一页</span>
        <span class="tw:text-[14px] tw:font-medium">{{ previous.title }} <span class="tw:text-[12px] tw:font-normal tw:text-fn-text-muted">{{ previous.name }}</span></span>
      </a>
      <a v-if="next" :href="`#/components/${next.slug}`" :class="['tw:flex tw:flex-col tw:gap-[4px] tw:rounded-[8px] tw:border tw:border-solid tw:border-fn-border tw:px-[16px] tw:py-[12px] tw:hover:border-fn-primary', previous ? 'tw:items-end tw:text-right' : 'tw:col-start-2 tw:items-end tw:text-right']">
        <span class="tw:flex tw:items-center tw:gap-[4px] tw:text-[12px] tw:text-fn-text-muted">下一页 <FnIcon name="chevron-right" :size="13" /></span>
        <span class="tw:text-[14px] tw:font-medium">{{ next.title }} <span class="tw:text-[12px] tw:font-normal tw:text-fn-text-muted">{{ next.name }}</span></span>
      </a>
    </nav>
  </main>
</template>

<style scoped>
.fn-guide {
  color: var(--fn-text-secondary);
  font-size: 14px;
  line-height: 1.85;
}
.fn-guide__heading {
  margin: 20px 0 10px;
  color: var(--fn-text);
  font-size: 14px;
  font-weight: 600;
}
.fn-guide__heading:first-child {
  margin-top: 0;
}
.fn-guide__paragraph {
  margin: 0 0 12px;
}
.fn-guide__paragraph:last-child {
  margin-bottom: 0;
}
.fn-guide__list {
  margin: 0 0 12px;
  padding-left: 20px;
  list-style: disc;
}
.fn-guide__list:last-child {
  margin-bottom: 0;
}
.fn-guide__list li {
  margin-bottom: 10px;
  padding-left: 2px;
}
.fn-guide__list li:last-child {
  margin-bottom: 0;
}
.fn-guide__list li::marker {
  color: var(--fn-text-muted);
}
.fn-guide code {
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--fn-fill);
  color: var(--fn-text);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
}
.fn-guide strong {
  color: var(--fn-text);
  font-weight: 600;
}
.fn-guide a {
  color: var(--fn-primary);
  text-decoration: none;
}
.fn-guide a:hover {
  text-decoration: underline;
}
</style>
