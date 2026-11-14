<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { FnIcon } from '@naspk/fnui/desktop'
import fileManagerSource from '../../playground/src/examples/templates/file-manager/FileManager.vue?raw'
import previewStyles from '../../playground/src/preview.css?raw'
import filesIcon from '../../fnos-static/live/2026-11-13/icons/files.png'
import settingsIcon from '../../fnos-static/live/2026-11-13/icons/settings.png'
import appCenterIcon from '../../fnos-static/live/2026-11-13/icons/app-center.png'
import downloadIcon from '../../fnos-static/live/2026-11-13/icons/download.png'
import backupIcon from '../../fnos-static/live/2026-11-13/icons/backup.png'
import resourcesIcon from '../../fnos-static/live/2026-11-13/icons/resources.png'
import desktopIcon from '../../fnos-reference-icons/desktop.png'
import launchpadIcon from '../../fnos-reference-icons/launchpad.png'
import darkWallpaper from '../wallpaper-4-dark.webp'
import lightWallpaper from '../wallpaper-4-light.webp'

const props = defineProps<{ theme: 'light' | 'dark'; preset: string; accent: string }>()
const windowOpen = ref(false)
const windowStarted = ref(false)
const maximized = ref(false)
const showCode = ref(false)
const sourceFile = ref<'component' | 'styles'>('component')
const desktop = ref<HTMLElement | null>(null)
type WindowRect = { left: number; top: number; width: number; height: number }
type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
const resizeEdges: ResizeEdge[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']
const windowRect = ref<WindowRect>({ left: 76, top: 16, width: 1100, height: 640 })
const interacting = ref(false)
const taskbarWidth = 66
let interaction: { pointerId: number; x: number; y: number; rect: WindowRect; edge?: ResizeEdge } | null = null
const apps = [
  { name: '文件管理', icon: filesIcon, available: true },
  { name: '系统设置', icon: settingsIcon, available: false },
  { name: '应用中心', icon: appCenterIcon, available: false },
  { name: '下载', icon: downloadIcon, available: false },
  { name: '备份', icon: backupIcon, available: false },
  { name: '资源管理', icon: resourcesIcon, available: false },
]
const frameUrl = computed(() => {
  const query = new URLSearchParams({ demo: 'file-manager', theme: props.theme, preset: props.preset, accent: props.accent })
  return `${import.meta.env.BASE_URL}preview-desktop.html?${query}`
})
const windowStyle = computed(() => {
  if (maximized.value) return { left: `${taskbarWidth}px`, top: '0', right: '0', bottom: '0' }
  const { left, top, width, height } = windowRect.value
  return { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }
})

function desktopSize() {
  return { width: desktop.value?.clientWidth ?? 760, height: desktop.value?.clientHeight ?? window.innerHeight }
}

function fitWindow(rect: WindowRect): WindowRect {
  const { width, height } = desktopSize()
  const availableWidth = Math.max(1, width - taskbarWidth)
  const availableHeight = Math.max(1, height)
  const fittedWidth = Math.min(Math.max(rect.width, Math.min(480, availableWidth)), availableWidth)
  const fittedHeight = Math.min(Math.max(rect.height, Math.min(320, availableHeight)), availableHeight)
  return {
    left: Math.max(taskbarWidth, Math.min(rect.left, width - fittedWidth)),
    top: Math.max(0, Math.min(rect.top, height - fittedHeight)),
    width: fittedWidth,
    height: fittedHeight,
  }
}

function startInteraction(event: PointerEvent, edge?: ResizeEdge) {
  if (event.button !== 0 || maximized.value) return
  event.preventDefault()
  interaction = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rect: { ...windowRect.value }, edge }
  interacting.value = true
  window.addEventListener('pointermove', moveInteraction)
  window.addEventListener('pointerup', endInteraction)
  window.addEventListener('pointercancel', endInteraction)
}

function moveInteraction(event: PointerEvent) {
  if (!interaction || event.pointerId !== interaction.pointerId) return
  event.preventDefault()
  const { rect, edge } = interaction
  const dx = event.clientX - interaction.x
  const dy = event.clientY - interaction.y
  if (!edge) {
    windowRect.value = fitWindow({ ...rect, left: rect.left + dx, top: rect.top + dy })
    return
  }
  const { width, height } = desktopSize()
  const minWidth = Math.min(480, Math.max(1, width - taskbarWidth))
  const minHeight = Math.min(320, Math.max(1, height))
  const left = edge.includes('w') ? Math.max(taskbarWidth, Math.min(rect.left + dx, rect.left + rect.width - minWidth)) : rect.left
  const top = edge.includes('n') ? Math.max(0, Math.min(rect.top + dy, rect.top + rect.height - minHeight)) : rect.top
  const right = edge.includes('e') ? Math.min(width, Math.max(rect.left + minWidth, rect.left + rect.width + dx)) : rect.left + rect.width
  const bottom = edge.includes('s') ? Math.min(height, Math.max(rect.top + minHeight, rect.top + rect.height + dy)) : rect.top + rect.height
  windowRect.value = { left, top, width: right - left, height: bottom - top }
}

function endInteraction(event?: PointerEvent) {
  if (event && interaction && event.pointerId !== interaction.pointerId) return
  interaction = null
  interacting.value = false
  window.removeEventListener('pointermove', moveInteraction)
  window.removeEventListener('pointerup', endInteraction)
  window.removeEventListener('pointercancel', endInteraction)
}

function fitOpenWindow() {
  if (windowStarted.value) windowRect.value = fitWindow(windowRect.value)
}

onMounted(() => window.addEventListener('resize', fitOpenWindow))
onBeforeUnmount(() => {
  endInteraction()
  window.removeEventListener('resize', fitOpenWindow)
})

function openWindow() {
  if (!windowStarted.value) {
    const { width, height } = desktopSize()
    const windowWidth = Math.min(1100, Math.max(1, width - taskbarWidth - 26))
    windowRect.value = fitWindow({ left: Math.max(76, (width - windowWidth) / 2), top: height * 0.08, width: windowWidth, height: Math.min(640, height - 32) })
  }
  windowStarted.value = true
  windowOpen.value = true
}

function closeWindow() {
  endInteraction()
  windowStarted.value = false
  windowOpen.value = false
  maximized.value = false
}
</script>

<template>
  <main class="tw:fixed tw:inset-0 tw:z-50 tw:overflow-x-auto" aria-label="应用模板模拟环境">
      <section ref="desktop" aria-label="模拟 fnOS 桌面" :style="{ backgroundImage: `url(${theme === 'dark' ? darkWallpaper : lightWallpaper})` }" class="tw:relative tw:h-[100dvh] tw:min-w-[760px] tw:overflow-hidden tw:bg-[#142b50] tw:bg-cover tw:bg-center tw:text-white tw:[font-family:'PingFang_SC','SF_Pro_Text','Helvetica_Neue',Helvetica,Arial,sans-serif]">
        <aside aria-label="桌面任务栏" class="tw:absolute tw:inset-y-0 tw:left-0 tw:z-10 tw:w-[66px] tw:py-4 tw:pl-3.5">
          <div class="tw:flex tw:h-full tw:flex-col tw:items-center tw:overflow-hidden tw:rounded-[6px] tw:border tw:border-solid tw:border-white/20 tw:bg-[#0c121a]/85">
            <div class="tw:flex tw:w-full tw:shrink-0 tw:flex-col tw:items-center tw:border-b tw:border-solid tw:border-white/20 tw:pt-[12px] tw:pb-[8px]">
              <span aria-label="桌面" class="tw:grid tw:h-[40px] tw:w-full tw:place-items-center"><img :src="desktopIcon" alt="" class="tw:h-[26px] tw:w-[26px]" /></span>
              <span aria-label="全部应用" class="tw:grid tw:h-[40px] tw:w-full tw:place-items-center"><img :src="launchpadIcon" alt="" class="tw:h-[26px] tw:w-[26px]" /></span>
            </div>
            <button v-if="windowStarted" type="button" :aria-label="windowOpen ? '最小化文件管理' : '还原文件管理'" :aria-pressed="windowOpen" class="tw:grid tw:h-[40px] tw:w-full tw:shrink-0 tw:place-items-center tw:border-0 tw:border-l-[3px] tw:border-solid tw:border-l-[#1688ff] tw:bg-white/10 tw:text-white" @click="windowOpen = !windowOpen"><img :src="filesIcon" alt="" class="tw:h-[26px] tw:w-[26px]" /></button>
            <div class="tw:mt-auto tw:flex tw:w-full tw:shrink-0 tw:flex-col tw:items-center tw:pb-[2px] tw:text-[#cdd0d3]">
              <span aria-label="传输状态（模拟）" class="tw:grid tw:h-[40px] tw:w-full tw:place-items-center">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="tw:h-[20px] tw:w-[20px]"><circle cx="12" cy="12" r="11" fill="currentColor" /><path d="M8 16V7m0 0L5.5 9.5M8 7l2.5 2.5M16 8v9m0 0 2.5-2.5M16 17l-2.5-2.5" fill="none" stroke="#111820" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
              <span aria-label="通知（模拟）" class="tw:grid tw:h-[40px] tw:w-full tw:place-items-center">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="tw:h-[20px] tw:w-[20px]" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7v3.4c0 1.9-.7 3.2-1.9 4.5-.7.8-.1 2.1 1 2.1h15.8c1.1 0 1.7-1.3 1-2.1-1.2-1.3-1.9-2.6-1.9-4.5V9a7 7 0 0 0-7-7Zm-2.4 19a2.5 2.5 0 0 0 4.8 0Z" /></svg>
              </span>
              <span aria-label="用户（模拟）" class="tw:grid tw:h-[40px] tw:w-full tw:place-items-center">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="tw:h-[20px] tw:w-[20px]" fill="currentColor"><path d="M12 2c-2.4 0-4 2-4 4.7s1.6 4.8 4 4.8 4-2.1 4-4.8S14.4 2 12 2ZM2.3 20.3C3.5 16.6 7.2 14 12 14s8.5 2.6 9.7 6.3c.3.9-.2 1.7-1.2 1.7h-17c-1 0-1.5-.8-1.2-1.7Z" /></svg>
              </span>
              <span aria-label="设置（模拟）" class="tw:grid tw:h-[40px] tw:w-full tw:place-items-center">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="tw:h-[20px] tw:w-[20px]" fill="currentColor"><path fill-rule="evenodd" d="M10 2.7c.3-1 1-1.7 2-1.7s1.7.7 2 1.7l.4 1.2c.5.1 1 .3 1.4.6l1.2-.6c.9-.5 2-.3 2.7.4s.9 1.8.4 2.7l-.6 1.2c.3.4.5.9.6 1.4l1.2.4c1 .3 1.7 1 1.7 2s-.7 1.7-1.7 2l-1.2.4c-.1.5-.3 1-.6 1.4l.6 1.2c.5.9.3 2-.4 2.7s-1.8.9-2.7.4l-1.2-.6c-.4.3-.9.5-1.4.6l-.4 1.2c-.3 1-1 1.7-2 1.7s-1.7-.7-2-1.7l-.4-1.2c-.5-.1-1-.3-1.4-.6l-1.2.6c-.9.5-2 .3-2.7-.4s-.9-1.8-.4-2.7l.6-1.2c-.3-.4-.5-.9-.6-1.4L2.7 14C1.7 13.7 1 13 1 12s.7-1.7 1.7-2l1.2-.4c.1-.5.3-1 .6-1.4l-.6-1.2c-.5-.9-.3-2 .4-2.7s1.8-.9 2.7-.4l1.2.6c.4-.3.9-.5 1.4-.6L10 2.7ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></svg>
              </span>
            </div>
          </div>
        </aside>

        <div class="tw:absolute tw:inset-y-0 tw:left-[66px] tw:z-10 tw:flex tw:flex-col tw:flex-wrap tw:content-start tw:py-[20px]">
          <div v-for="app in apps" :key="app.name" class="tw:flex tw:h-[120px] tw:w-[144px] tw:flex-col tw:items-center tw:pt-[22px]">
            <button type="button" :disabled="!app.available" :aria-label="app.available ? app.name : `${app.name}（暂未提供）`" class="tw:flex tw:flex-col tw:items-center tw:gap-[10px] tw:rounded-[8px] tw:border-0 tw:bg-transparent tw:p-0 tw:text-white tw:disabled:cursor-default" @click="openWindow">
              <img :src="app.icon" alt="" class="tw:h-[52px] tw:w-[52px] tw:rounded-[10%] tw:shadow-[0_2px_8px_rgba(0,0,0,0.18)]" />
              <span class="tw:text-[14px] tw:leading-[20px] tw:[text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">{{ app.name }}</span>
            </button>
          </div>
        </div>

        <div v-if="windowStarted" v-show="windowOpen" :style="windowStyle" :class="['app-window tw:absolute tw:z-20 tw:flex tw:flex-col tw:overflow-hidden tw:text-fn-text tw:shadow-[0_15px_20px_rgba(12,12,13,0.65)]', theme === 'dark' ? 'tw:bg-[#0c0c0d]' : 'tw:bg-[#f3f3f3]', maximized ? 'tw:rounded-none' : 'tw:rounded-[16px]']">
          <div class="tw:flex tw:h-[44px] tw:shrink-0 tw:cursor-move tw:select-none tw:items-center tw:justify-between tw:bg-transparent tw:[touch-action:none]" @pointerdown="startInteraction($event)" @dblclick="maximized = !maximized">
            <div class="tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden tw:pl-[16px] tw:pr-[36px] tw:text-[14px]">
              <img :src="filesIcon" alt="" draggable="false" class="tw:pointer-events-none tw:mr-[8px] tw:h-[24px] tw:w-[24px] tw:shrink-0" />
              <strong class="tw:truncate tw:font-semibold tw:leading-[20px]">文件管理</strong>
            </div>
            <div class="tw:flex tw:h-full tw:shrink-0" @pointerdown.stop @dblclick.stop>
              <button type="button" aria-label="最小化文件管理" title="最小化" class="window-control" @click="windowOpen = false">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 11a1 1 0 110 2H3a1 1 0 110-2h18z" /></svg>
              </button>
              <button type="button" :aria-label="maximized ? '还原窗口' : '最大化窗口'" :title="maximized ? '还原' : '最大化'" class="window-control" @click="maximized = !maximized">
                <svg v-if="!maximized" aria-hidden="true" viewBox="0 0 16 16"><path d="M3.2591 2.66663H12.7406C13.068 2.66663 13.3332 2.9319 13.3332 3.25922V12.7407C13.3332 13.068 13.068 13.3333 12.7406 13.3333H3.2591C2.9318 13.3333 2.6665 13.068 2.6665 12.7407V3.25922C2.6665 2.9319 2.9318 2.66663 3.2591 2.66663ZM3.85169 3.85181V12.1481H12.148V3.85181H3.85169Z" /></svg>
                <svg v-else aria-hidden="true" viewBox="0 0 16 16"><path d="M5 2h8v8h-2V4H5V2Zm-2 4h7v7H3V6Zm1.2 1.2v4.6h4.6V7.2H4.2Z" /></svg>
              </button>
              <button type="button" aria-label="关闭文件管理" title="关闭" class="window-control window-control-close" @click="closeWindow">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z" /></svg>
              </button>
            </div>
          </div>
          <iframe :src="frameUrl" title="文件管理应用模板" :class="{ 'tw:pointer-events-none': interacting }" class="tw:block tw:min-h-0 tw:w-full tw:flex-1 tw:border-0 tw:bg-fn-container" />
          <template v-if="!maximized">
            <div v-for="edge in resizeEdges" :key="edge" aria-hidden="true" :class="['window-resize', `window-resize--${edge}`]" @pointerdown.stop="startInteraction($event, edge)"></div>
          </template>
        </div>
      <div class="tw:absolute tw:top-[16px] tw:right-[16px] tw:z-10 tw:flex tw:items-center tw:gap-[8px] tw:rounded-[6px] tw:bg-black/50 tw:px-[10px] tw:py-[6px] tw:text-[12px] tw:text-white/80">
        <span>模拟环境 · 不连接 NAS</span>
        <button type="button" :aria-expanded="showCode" aria-label="查看模板源码" title="查看模板源码" class="tw:grid tw:h-[24px] tw:w-[24px] tw:place-items-center tw:border-0 tw:bg-transparent tw:text-white/80 tw:hover:text-white" @click="showCode = !showCode"><FnIcon name="code" :size="17" /></button>
        <a href="/" aria-label="返回文档" title="返回文档" class="tw:grid tw:h-[24px] tw:w-[24px] tw:place-items-center tw:text-white/80 tw:hover:text-white"><FnIcon name="logout" :size="17" /></a>
      </div>
      </section>

    <section v-if="showCode" aria-label="模板源码" class="tw:fixed tw:inset-y-[24px] tw:right-[24px] tw:z-30 tw:flex tw:w-[min(640px,calc(100vw_-_96px))] tw:flex-col tw:overflow-hidden tw:rounded-[12px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:text-fn-text tw:shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
      <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-[4px] tw:border-b tw:border-solid tw:border-fn-border tw:bg-fn-fill tw:p-[8px]">
        <button type="button" :aria-pressed="sourceFile === 'component'" :class="['tw:rounded-[6px] tw:border-0 tw:px-[12px] tw:py-[8px] tw:text-[12px]', sourceFile === 'component' ? 'tw:bg-fn-container tw:text-fn-text' : 'tw:bg-transparent tw:text-fn-text-secondary']" @click="sourceFile = 'component'">FileManager.vue</button>
        <button type="button" :aria-pressed="sourceFile === 'styles'" :class="['tw:rounded-[6px] tw:border-0 tw:px-[12px] tw:py-[8px] tw:text-[12px]', sourceFile === 'styles' ? 'tw:bg-fn-container tw:text-fn-text' : 'tw:bg-transparent tw:text-fn-text-secondary']" @click="sourceFile = 'styles'">preview.css</button>
        <button type="button" aria-label="关闭源码" class="tw:ml-auto tw:grid tw:h-[32px] tw:w-[32px] tw:place-items-center tw:rounded-[6px] tw:border-0 tw:bg-transparent tw:text-fn-text-secondary tw:hover:bg-fn-container" @click="showCode = false"><FnIcon name="close" :size="16" /></button>
      </div>
      <p class="tw:mx-[20px] tw:mt-[16px] tw:mb-0 tw:text-[12px] tw:leading-[1.6] tw:text-fn-text-muted">预览环境全局注册 fnUI 组件并加载 preview.css；在自己的应用中使用时需要导入组件、样式并配置 Provider。</p>
      <pre class="tw:m-0 tw:min-h-0 tw:flex-1 tw:overflow-auto tw:p-[20px] tw:text-[12px] tw:leading-[1.8] tw:text-fn-text-secondary"><code>{{ sourceFile === 'component' ? fileManagerSource : previewStyles }}</code></pre>
    </section>
  </main>
</template>

<style scoped>
.window-control {
  display: grid;
  width: 46px;
  height: 44px;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--fn-text);
}
.window-control:hover, .window-control:active { background: var(--fn-fill); }
.window-control-close:hover, .window-control-close:active { background: var(--fn-danger); color: white; }
.window-control svg { width: 16px; height: 16px; fill: currentColor; }
.window-resize { position: absolute; z-index: 1; touch-action: none; }
.window-resize--n, .window-resize--s { left: 8px; right: 8px; height: 6px; cursor: ns-resize; }
.window-resize--n { top: 0; }
.window-resize--s { bottom: 0; }
.window-resize--e, .window-resize--w { top: 8px; bottom: 8px; width: 6px; cursor: ew-resize; }
.window-resize--e { right: 0; }
.window-resize--w { left: 0; }
.window-resize--ne, .window-resize--nw, .window-resize--se, .window-resize--sw { width: 10px; height: 10px; }
.window-resize--ne { top: 0; right: 0; cursor: nesw-resize; }
.window-resize--nw { top: 0; left: 0; cursor: nwse-resize; }
.window-resize--se { right: 0; bottom: 0; cursor: nwse-resize; }
.window-resize--sw { bottom: 0; left: 0; cursor: nesw-resize; }
</style>
