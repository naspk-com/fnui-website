import { ref } from 'vue'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function currentPath() {
  const pathname = base && location.pathname.startsWith(base)
    ? location.pathname.slice(base.length)
    : location.pathname
  return pathname.replace(/\/+$/, '') || '/'
}

export const routePath = ref(currentPath())

export function navigate(to: string) {
  const path = to.startsWith('/') ? to : `/${to}`
  const [pathname] = path.split(/[?#]/)
  if (pathname === routePath.value) return
  history.pushState(null, '', `${base}${path}`)
  routePath.value = pathname
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function onClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const anchor = (event.target as Element | null)?.closest?.('a')
  if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return
  const href = anchor.getAttribute('href')
  if (!href || !href.startsWith('/') || href.startsWith('//')) return
  const url = new URL(anchor.href)
  if (url.origin !== location.origin) return
  event.preventDefault()
  navigate(`${url.pathname.slice(base.length)}${url.search}${url.hash}`)
}

export function installRouter() {
  if (location.hash.startsWith('#/')) {
    const legacy = location.hash.slice(1)
    history.replaceState(null, '', `${base}${legacy}`)
    routePath.value = legacy.split(/[?#]/)[0]
  }
  const onPopState = () => {
    routePath.value = currentPath()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  document.addEventListener('click', onClick)
  window.addEventListener('popstate', onPopState)
  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('popstate', onPopState)
  }
}
