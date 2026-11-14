import { createApp, defineAsyncComponent, defineComponent, h, onErrorCaptured, ref, type Component } from 'vue'
import { applyAccent, resolveAccent } from './data/accents'

const examples = import.meta.glob<{ default: Component }>('./examples/*.vue')

export function mountPreview(platform: 'desktop' | 'mobile', components: Record<string, unknown>) {
  const params = new URLSearchParams(location.search)
  const name = params.get('demo') ?? ''
  const wide = params.get('wide') === '1'
  const theme = params.get('theme') === 'dark' ? 'dark' : 'light'
  const requestedPreset = params.get('preset')
  const preset = requestedPreset && ['naspk-blue', 'naspk-soft-blue', 'naspk-bright-blue'].includes(requestedPreset)
    ? requestedPreset : 'naspk-blue'
  applyAccent(resolveAccent(params.get('accent')))
  const loader = name === 'file-manager'
    ? async () => {
        await import('../playground/src/preview.css')
        return import('../playground/src/examples/templates/file-manager/FileManager.vue')
      }
    : examples[`./examples/${name}.vue`]
  const Example = loader ? defineAsyncComponent(loader) : undefined
  const desktopLayout = platform === 'desktop' && name.startsWith('layout-')
  const fullBleed = name === 'file-manager' || name === 'layout-basic' || desktopLayout
  const pageFill = platform === 'mobile' && name.startsWith('tab-bar-')

  const Preview = defineComponent({
    setup() {
      const error = ref('')
      onErrorCaptured(() => {
        error.value = '示例加载失败，请查看浏览器控制台。'
        return false
      })
      return () => h(components.FnProvider as Component, { platform, theme, preset }, {
        default: () => h('main', {
          style: {
            minHeight: '100vh',
            height: fullBleed || pageFill ? '100vh' : undefined,
            padding: fullBleed || platform === 'mobile' ? '0' : '28px',
            display: fullBleed || pageFill ? 'block' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: fullBleed || pageFill ? 'var(--fn-page)' : 'var(--fn-container)',
            color: 'var(--fn-text)',
          },
        }, error.value ? h('p', { role: 'alert' }, error.value)
          : Example ? fullBleed ? h(Example, desktopLayout ? { style: { height: '100%' } } : {}) : h('div', { style: { width: '100%', maxWidth: wide || platform === 'mobile' ? '100%' : '720px' } }, [h(Example)])
          : h('p', { role: 'alert' }, '未找到此示例。')),
      })
    },
  })
  const app = createApp(Preview)
  for (const [key, component] of Object.entries(components)) {
    if (key.startsWith('Fn') && component && (typeof component === 'object' || typeof component === 'function')) {
      app.component(key, component as Component)
    }
  }
  app.mount('#app')
}
