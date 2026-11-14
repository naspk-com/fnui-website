import * as desktop from '@naspk/fnui/desktop'
import { FnSegmented, FnNavbar, FnFab, FnActionSheet, FnSwipeCell, FnSwipeCellGroup, FnIndexes } from '@naspk/fnui/mobile'
import type { ComponentEntry } from './catalog'

type Definition = { props?: Record<string, unknown>; emits?: unknown }
const guides = import.meta.glob<string>('../../docs/guides/*.md', { query: '?raw', import: 'default', eager: true })
const mobileOnly = {
  FnSegmented, FnNavbar, FnFab, FnSwipeCell, FnSwipeCellGroup, FnIndexes,
  FnActionSheet,
}

function definition(entry: ComponentEntry): Definition | undefined {
  const exports = entry.mobileOnly ? mobileOnly : desktop
  return (exports as Record<string, unknown>)[entry.name] as Definition | undefined
}

export function componentProps(entry: ComponentEntry) {
  return Object.entries(definition(entry)?.props ?? {}).map(([name, value]) => {
    const spec: { type?: unknown; default?: unknown; required?: boolean } = value && typeof value === 'object' && !Array.isArray(value)
      ? value as { type?: unknown; default?: unknown; required?: boolean } : { type: value }
    const type = (Array.isArray(spec.type) ? spec.type : [spec.type])
      .map(item => typeof item === 'function' ? item.name : '').filter(Boolean).join(' | ') || '—'
    const fallback = spec.default === undefined ? (spec.type === Boolean ? 'false' : '—')
      : typeof spec.default === 'function' ? '函数 / 工厂' : JSON.stringify(spec.default)
    return { name, type, fallback, required: !!spec.required }
  })
}

export function componentEvents(entry: ComponentEntry): string[] {
  const emits = definition(entry)?.emits
  return Array.isArray(emits) ? emits : emits && typeof emits === 'object' ? Object.keys(emits) : []
}

export function componentGuide(entry: ComponentEntry): string {
  return guides[`../../docs/guides/${entry.slug}.md`]?.trim() ?? ''
}
