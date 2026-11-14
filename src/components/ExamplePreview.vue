<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { FnButton, FnIcon } from '@naspk/fnui/desktop'

const props = defineProps<{
  name: string
  title: string
  source: string
  theme: 'light' | 'dark'
  preset: string
  mobileOnly?: boolean
  template?: boolean
}>()
const platform = ref<'desktop' | 'mobile'>('desktop')
const width = ref<'fluid' | 'tablet' | 'phone'>('fluid')
const showCode = ref(false)
const copied = ref(false)
const copyError = ref(false)
const revision = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined

const wideExamples = new Set(['table-basic', 'table-sort', 'table-pagination', 'table-expand', 'table-empty', 'form-basic', 'form-async', 'form-reset', 'form-item-basic', 'form-item-validator', 'descriptions-title', 'descriptions-custom', 'timeline-basic', 'timeline-custom', 'data-view-basic', 'data-view-list', 'data-view-grid', 'transfer-basic', 'transfer-sortable', 'transfer-disabled', 'file-browser-basic', 'file-browser-grid', 'file-browser-loading', 'layout-basic', 'layout-plain', 'layout-sidebar', 'page-basic', 'page-scroll-content', 'page-padding-none', 'anchor-basic', 'anchor-multi', 'navigation-basic', 'navigation-bottom', 'guide-basic', 'guide-custom', 'indexes-basic', 'indexes-track', 'breadcrumb-max', 'pagination-size', 'tree-draggable', 'swipe-cell-group-basic', 'swipe-cell-group-multi', 'swipe-cell-group-disabled', 'navigation-many', 'anchor-wrap', 'timeline-status', 'form-item-no-label'])
const frameUrl = computed(() => {
  const query = new URLSearchParams({ demo: props.name, theme: props.theme, preset: props.preset, revision: String(revision.value) })
  if (wideExamples.has(props.name)) query.set('wide', '1')
  return `${import.meta.env.BASE_URL}preview-${platform.value}.html?${query}`
})
const frameWidth = computed(() => width.value === 'phone' ? '375px' : width.value === 'tablet' ? '768px' : '100%')
const heights: Record<string, string> = {
  'form-basic': '400px', 'form-item-basic': '300px', 'table-basic': '320px', 'collapse-basic': '280px', 'descriptions-basic': '300px',
  'timeline-basic': '300px', 'menu-basic': '280px', 'pagination-basic': '190px', 'empty-basic': '260px',
  'loading-basic': '240px', 'skeleton-basic': '200px', 'card-basic': '230px', 'typography-basic': '230px',
  'color-picker-basic': '210px', 'fab-basic': '260px', 'drawer-basic': '190px', 'date-picker-basic': '190px',
  'time-picker-basic': '190px', 'layout-basic': '380px', 'page-basic': '320px', 'data-view-basic': '340px',
  'transfer-basic': '360px', 'file-browser-basic': '320px', 'file-upload-basic': '340px', 'image-upload-basic': '300px',
  'qr-code-basic': '260px', 'image-basic': '260px', 'image-viewer-basic': '220px', 'swiper-basic': '300px',
  'popup-basic': '200px', 'popover-basic': '220px', 'popconfirm-basic': '200px', 'tooltip-basic': '200px',
  'guide-basic': '300px', 'navigation-basic': '320px', 'tab-bar-basic': '200px', 'tab-bar-text': '180px',
  'tab-bar-icon-only': '180px', 'tab-bar-sub': '230px', 'tab-bar-badge': '300px', 'tab-bar-round': '210px',
  'tab-bar-custom': '180px', 'side-bar-basic': '280px',
  'anchor-basic': '240px', 'sticky-basic': '280px', 'load-more-basic': '220px', 'action-sheet-basic': '200px',
  'swipe-cell-group-basic': '280px', 'indexes-basic': '380px', 'authorized-path-field-basic': '200px',
  'authorization-panel-basic': '260px', 'comment-basic': '260px', 'checkbox-group-basic': '200px',
  'radio-group-basic': '220px', 'input-number-exact-basic': '200px', 'cascader-basic': '200px',
  'tree-select-basic': '200px',
  'layout-plain': '280px', 'layout-sidebar': '320px', 'page-scroll-content': '280px', 'page-padding-none': '280px',
  'icon-gallery': '200px', 'typography-editable': '220px',
  'date-picker-range': '200px', 'date-picker-bounds': '200px', 'date-picker-editable': '200px', 'date-picker-disabled-value': '200px',
  'table-sort': '280px', 'table-pagination': '420px', 'table-expand': '300px', 'table-empty': '240px',
  'data-view-list': '300px', 'data-view-grid': '300px', 'tree-search': '280px', 'tree-multiple': '260px', 'tree-draggable': '300px',
  'transfer-sortable': '400px', 'transfer-disabled': '360px', 'tabs-panel': '240px',
  'card-simple': '200px', 'card-actions': '240px', 'descriptions-title': '280px', 'descriptions-custom': '240px',
  'statistic-value': '180px', 'timeline-custom': '280px', 'comment-plain': '200px', 'comment-actions': '260px',
  'qr-code-styled': '260px', 'qr-code-expired': '280px', 'progress-circle': '220px', 'progress-status': '260px',
  'progress-indeterminate': '220px', 'steps-vertical': '240px', 'steps-status': '200px', 'steps-clickable': '220px',
  'collapse-accordion': '240px', 'collapse-disabled': '220px', 'collapse-animated': '240px',
  'swiper-autoplay': '240px', 'swiper-fade': '240px', 'swiper-loop': '240px', 'alert-tones': '280px',
  'empty-custom': '240px', 'empty-description': '220px', 'loading-size': '220px',
  'skeleton-avatar': '200px', 'skeleton-text': '200px', 'skeleton-animation': '220px',
  'guide-overlay': '220px', 'guide-custom': '320px', 'navigation-bottom': '220px',
  'menu-disabled': '220px', 'menu-item-slot': '240px', 'side-bar-disabled': '240px', 'side-bar-item-slot': '240px',
  'breadcrumb-max': '180px', 'breadcrumb-disabled': '160px', 'pagination-size': '200px', 'pagination-disabled': '180px',
  'anchor-multi': '200px', 'sticky-offset': '260px', 'form-async': '280px', 'form-reset': '320px',
  'form-item-validator': '240px', 'file-upload-single': '280px', 'file-upload-limit': '340px',
  'image-upload-multiple': '300px', 'image-upload-drop': '300px', 'file-browser-grid': '340px', 'file-browser-loading': '260px',
  'authorized-path-selected': '180px', 'authorized-path-disabled': '160px',
  'authorization-panel-empty': '220px', 'authorization-panel-disabled': '260px',
  'load-more-auto': '200px', 'load-more-error': '200px', 'segmented-disabled': '180px', 'segmented-slot': '180px',
  'navbar-no-back': '160px', 'navbar-title': '160px', 'fab-icon': '260px', 'fab-disabled': '260px',
  'action-sheet-children': '200px', 'action-sheet-lazy': '200px', 'swipe-cell-left': '200px',
  'swipe-cell-width': '200px', 'swipe-cell-group-multi': '220px', 'indexes-track': '380px',
  'timeline-status': '280px', 'anchor-wrap': '200px', 'sticky-nested': '260px', 'form-item-no-label': '240px',
  'navigation-many': '280px', 'swipe-cell-group-disabled': '220px', 'indexes-unsorted': '360px',
  'toast-basic': '180px', 'toast-tone': '200px', 'toast-position': '180px', 'toast-component': '180px',
  'notification-basic': '180px', 'notification-tone': '200px', 'notification-actions': '200px', 'notification-component': '200px',
}
const frameHeight = computed(() => {
  if (props.template) return '620px'
  if (width.value === 'phone') return '667px'
  if (width.value === 'tablet') return '560px'
  if (heights[props.name]) return heights[props.name]
  if (props.name.startsWith('calendar-')) return '420px'
  if (props.name.startsWith('tree-') || props.name.startsWith('dialog-')) return '340px'
  if (props.name.startsWith('select-')) return '280px'
  if (props.name.startsWith('textarea-')) return '240px'
  return '220px'
})
const displayedSource = computed(() => {
  const names = [...new Set(Array.from(props.source.matchAll(/<\s*(Fn[A-Z]\w*)\b/g), match => match[1]))]
  if (!names.length) return props.source
  const imports = `import { ${names.join(', ')} } from '@naspk/fnui/${platform.value}'`
  return /<script setup\b[^>]*>/.test(props.source)
    ? props.source.replace(/<script setup\b[^>]*>/, tag => `${tag}\n${imports}`)
    : `<script setup>\n${imports}\n<\/script>\n\n${props.source}`
})
function selectPlatform(value: 'desktop' | 'mobile') {
  platform.value = value
  width.value = value === 'mobile' ? 'phone' : 'fluid'
}
async function copy() {
  try {
    await navigator.clipboard.writeText(displayedSource.value)
    copied.value = true
    copyError.value = false
    clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    copyError.value = true
  }
}
watch(() => [props.name, props.mobileOnly], () => {
  selectPlatform(props.mobileOnly ? 'mobile' : 'desktop')
  showCode.value = false
  copied.value = false
  copyError.value = false
  clearTimeout(timer)
  revision.value++
}, { immediate: true })
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="tw:overflow-hidden tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border">
    <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-[6px] tw:border-b tw:border-solid tw:border-fn-border tw:bg-fn-fill tw:px-[10px] tw:py-[8px]">
      <div role="group" aria-label="预览平台" class="tw:flex tw:items-center tw:gap-[2px]">
        <FnButton size="small" :variant="platform === 'desktop' ? 'filled' : 'text'" :disabled="mobileOnly" :aria-pressed="platform === 'desktop'" @click="selectPlatform('desktop')">桌面</FnButton>
        <FnButton size="small" :variant="platform === 'mobile' ? 'filled' : 'text'" :aria-pressed="platform === 'mobile'" @click="selectPlatform('mobile')">移动</FnButton>
      </div>
      <div role="group" aria-label="预览宽度" class="tw:flex tw:items-center tw:gap-[2px]">
        <FnButton size="small" :variant="width === 'fluid' ? 'filled' : 'text'" :aria-pressed="width === 'fluid'" @click="width = 'fluid'">自适应</FnButton>
        <FnButton size="small" :variant="width === 'tablet' ? 'filled' : 'text'" :aria-pressed="width === 'tablet'" @click="width = 'tablet'">768</FnButton>
        <FnButton size="small" :variant="width === 'phone' ? 'filled' : 'text'" :aria-pressed="width === 'phone'" @click="width = 'phone'">375</FnButton>
      </div>
      <div class="tw:ml-auto tw:flex tw:items-center">
        <FnButton size="small" variant="text" aria-label="重置示例" @click="revision++"><FnIcon name="refresh" :size="16" /></FnButton>
        <FnButton size="small" variant="text" :aria-expanded="showCode" @click="showCode = !showCode"><FnIcon name="code" :size="16" /> {{ showCode ? '收起代码' : '查看代码' }}</FnButton>
      </div>
    </div>
    <div v-if="width === 'fluid'" :class="['tw:flex tw:w-full tw:justify-center tw:bg-fn-fill', platform === 'desktop' ? 'fn-preview-canvas' : 'tw:overflow-auto']">
      <iframe
        :key="frameUrl"
        :src="frameUrl"
        loading="lazy"
        :style="platform === 'desktop' ? { width: '100%', height: '100%' } : { width: frameWidth, height: frameHeight }"
        class="tw:block tw:w-full tw:border-0 tw:bg-fn-container"
        :title="`${title} ${platform === 'desktop' ? '桌面端' : '移动端'}预览`"
      />
    </div>
    <div v-else class="fn-preview-stage">
      <div :class="['fn-preview-device', `fn-preview-device--${width}`]">
        <span v-if="width === 'phone'" class="fn-preview-speaker" aria-hidden="true"></span>
        <div class="fn-preview-screen-wrap">
          <iframe :key="frameUrl" :src="frameUrl" loading="lazy" :style="{ width: frameWidth, height: frameHeight }" class="fn-preview-screen" :title="`${title} ${platform === 'desktop' ? '桌面端' : '移动端'}预览`" />
        </div>
        <span v-if="width === 'phone'" class="fn-preview-bar" aria-hidden="true"></span>
      </div>
    </div>
    <div v-if="showCode" class="tw:border-t tw:border-solid tw:border-fn-border tw:bg-fn-fill">
      <div class="tw:flex tw:items-center tw:justify-between tw:gap-[12px] tw:border-b tw:border-solid tw:border-fn-border tw:px-[16px] tw:py-[8px] tw:text-[12px] tw:text-fn-text-muted">
        <span>{{ template ? 'FileManager.vue' : `${name}.vue` }}</span>
        <FnButton size="small" variant="text" @click="copy">{{ copied ? '已复制' : '复制代码' }}</FnButton>
      </div>
      <p v-if="copyError" role="status" class="tw:px-[16px] tw:text-[12px] tw:text-fn-danger">无法访问剪贴板，请手动选择代码。</p>
      <pre class="tw:m-0 tw:overflow-auto tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>{{ displayedSource }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.fn-preview-stage {
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: auto;
  padding: 28px 16px 32px;
  background-color: var(--fn-fill);
  background-image: radial-gradient(color-mix(in oklab, var(--fn-text-muted) 18%, transparent) 1px, transparent 1px);
  background-size: 18px 18px;
}
.fn-preview-canvas {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}
.fn-preview-device {
  position: relative;
  flex: none;
  padding: 10px 10px 18px;
  border-radius: 46px;
  background: linear-gradient(155deg, #43434a 0%, #232327 42%, #111113 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    inset 0 2px 3px rgba(255, 255, 255, 0.14),
    0 30px 60px -28px rgba(0, 0, 0, 0.7);
}
.fn-preview-device--tablet {
  padding: 12px;
  border-radius: 30px;
}
.fn-preview-screen-wrap {
  width: max-content;
  overflow: hidden;
  border-radius: 36px;
  background: var(--fn-container);
}
.fn-preview-screen {
  display: block;
  border: 0;
  background: var(--fn-container);
}
.fn-preview-device--tablet .fn-preview-screen-wrap {
  border-radius: 18px;
}
.fn-preview-speaker {
  position: absolute;
  top: 3px;
  left: 50%;
  width: 54px;
  height: 4px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.3);
}
.fn-preview-bar {
  position: absolute;
  bottom: 7px;
  left: 50%;
  width: 112px;
  height: 4px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.32);
}
</style>
