<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { FnIcon } from '@naspk/fnui/desktop'
import { catalog, groupNames } from '../data/catalog'
import { navigate } from '../router'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [boolean] }>()
const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement>()
const groups = computed(() => {
  const text = query.value.trim().toLowerCase()
  const matches = catalog.filter(item => !text || `${item.title} ${item.name} ${item.slug} ${item.description} ${item.group}`.toLowerCase().includes(text))
  return groupNames.map(name => ({ name, items: matches.filter(item => item.group === name) })).filter(group => group.items.length)
})
const flat = computed(() => groups.value.flatMap(group => group.items))
watch(query, () => { active.value = 0 })
watch(active, () => {
  requestAnimationFrame(() => document.querySelector('.fn-search__item--active')?.scrollIntoView({ block: 'nearest' }))
})
function close() {
  emit('update:open', false)
}
function select(slug: string) {
  navigate(`/components/${slug}`)
  close()
}
function indexOf(slug: string) {
  return flat.value.findIndex(item => item.slug === slug)
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    active.value = Math.min(active.value + 1, flat.value.length - 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    active.value = Math.max(active.value - 1, 0)
  } else if (event.key === 'Enter') {
    const item = flat.value[active.value]
    if (!item) return
    event.preventDefault()
    select(item.slug)
  }
}
watch(() => props.open, async value => {
  if (value) {
    query.value = ''
    active.value = 0
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    input.value?.focus()
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Transition name="fn-search">
    <div v-if="open" class="fn-search" @mousedown.self="close">
      <div class="fn-search__panel" role="dialog" aria-modal="true" aria-label="搜索组件">
        <div class="fn-search__field">
          <FnIcon name="search" :size="18" />
          <input ref="input" v-model="query" type="text" placeholder="搜索组件…" aria-label="搜索组件" autocomplete="off" spellcheck="false" />
          <kbd class="fn-search__esc">esc</kbd>
        </div>
        <div class="fn-search__results">
          <div v-for="group in groups" :key="group.name" class="fn-search__group">
            <div class="fn-search__group-title">{{ group.name }}</div>
            <button
              v-for="item in group.items"
              :key="item.slug"
              type="button"
              :class="['fn-search__item', flat[active]?.slug === item.slug ? 'fn-search__item--active' : '']"
              @mouseenter="active = indexOf(item.slug)"
              @click="select(item.slug)"
            >
              <span class="fn-search__item-title">{{ item.title }}</span>
              <span class="fn-search__item-name">{{ item.name }}</span>
            </button>
          </div>
          <p v-if="!flat.length" class="fn-search__empty">没有找到组件，试试其他关键词。</p>
        </div>
        <div class="fn-search__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>
          <span><kbd>↵</kbd> 打开</span>
          <span><kbd>esc</kbd> 关闭</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fn-search {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh 16px 32px;
  background: color-mix(in oklab, #000 55%, transparent);
  backdrop-filter: blur(4px);
}
.fn-search__panel {
  display: flex;
  width: min(640px, 100%);
  max-height: min(70vh, 680px);
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--fn-border);
  border-radius: 14px;
  background: var(--fn-container);
  color: var(--fn-text);
  box-shadow: 0 24px 64px -16px rgba(0, 0, 0, .55);
}
.fn-search__field {
  display: flex;
  height: 56px;
  flex: none;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  border-bottom: 1px solid var(--fn-border);
  color: var(--fn-text-muted);
}
.fn-search__field input {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--fn-text);
  font: inherit;
  font-size: 15px;
}
.fn-search__field input::placeholder {
  color: var(--fn-text-muted);
}
.fn-search__esc,
.fn-search__footer kbd {
  min-width: 20px;
  padding: 1px 5px;
  border: 1px solid var(--fn-border);
  border-radius: 4px;
  background: var(--fn-fill);
  color: var(--fn-text-muted);
  font-family: inherit;
  font-size: 10.5px;
  text-align: center;
}
.fn-search__esc {
  flex: none;
}
.fn-search__results {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.fn-search__group-title {
  padding: 10px 10px 6px;
  color: var(--fn-text-muted);
  font-size: 11px;
  font-weight: 600;
}
.fn-search__item {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--fn-text-secondary);
  font: inherit;
  font-size: 13.5px;
  text-align: left;
  cursor: pointer;
}
.fn-search__item--active {
  background: var(--fn-fill);
  color: var(--fn-text);
}
.fn-search__item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fn-search__item-name {
  flex: none;
  color: var(--fn-text-muted);
  font-size: 11.5px;
}
.fn-search__empty {
  margin: 0;
  padding: 28px 12px;
  color: var(--fn-text-muted);
  font-size: 13px;
  text-align: center;
}
.fn-search__footer {
  display: flex;
  flex: none;
  gap: 16px;
  padding: 9px 14px;
  border-top: 1px solid var(--fn-border);
  color: var(--fn-text-muted);
  font-size: 11.5px;
}
.fn-search__footer span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.fn-search-enter-active,
.fn-search-leave-active {
  transition: opacity .16s ease;
}
.fn-search-enter-active .fn-search__panel,
.fn-search-leave-active .fn-search__panel {
  transition: transform .16s ease;
}
.fn-search-enter-from,
.fn-search-leave-to {
  opacity: 0;
}
.fn-search-enter-from .fn-search__panel,
.fn-search-leave-to .fn-search__panel {
  transform: translateY(-8px) scale(.985);
}
</style>
