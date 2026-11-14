<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { FnPlatform, FnPreset, FnTheme } from '@naspk/fnui/core'
import FileManager from './examples/templates/file-manager/FileManager.vue'

defineProps<{ platform: FnPlatform }>()
const params = new URLSearchParams(location.search)
const theme = ref<FnTheme>(params.get('theme') === 'dark' ? 'dark' : 'light')
const presets: FnPreset[] = ['fnos-desktop-snapshot', 'naspk-blue', 'naspk-soft-blue', 'naspk-bright-blue']
const preset = ref<FnPreset>(presets.includes(params.get('preset') as FnPreset) ? params.get('preset') as FnPreset : 'fnos-desktop-snapshot')
function onMessage(event: MessageEvent) {
  if (event.origin !== location.origin || event.source !== window.parent || event.data?.type !== 'fnui:preview-config' || event.data?.version !== 1 || event.data?.exampleId !== 'file-manager') return
  if (event.data.theme === 'light' || event.data.theme === 'dark') theme.value = event.data.theme
  if (presets.includes(event.data.preset)) preset.value = event.data.preset
}
onMounted(() => {
  window.addEventListener('message', onMessage)
  if (window.parent !== window) window.parent.postMessage({ type: 'fnui:preview-ready', version: 1, exampleId: 'file-manager' }, location.origin)
})
onBeforeUnmount(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <FnProvider :platform="platform" :theme="theme" :preset="preset">
    <FileManager />
  </FnProvider>
</template>
