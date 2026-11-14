<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

type Entry = { id: number; name: string; kind: 'folder' | 'file'; size: string; modified: string; parent: string }
type SortField = 'name' | 'modified' | 'location' | 'type' | 'size' | 'created' | 'owner'
const entries = ref<Entry[]>([
  { id: 1, name: '照片', kind: 'folder', size: '--', modified: '2026-11-10  10:28', parent: '/' },
  { id: 2, name: '文档', kind: 'folder', size: '--', modified: '2026-11-08  16:42', parent: '/' },
  { id: 3, name: '项目资料', kind: 'folder', size: '--', modified: '2026-11-06  09:15', parent: '/' },
  { id: 4, name: '使用说明.pdf', kind: 'file', size: '2.4 MB', modified: '2026-11-01  12:06', parent: '/' },
  { id: 5, name: '项目方案', kind: 'folder', size: '--', modified: '2026-11-06  09:15', parent: '/项目资料/' },
  { id: 6, name: '项目计划.pdf', kind: 'file', size: '1.2 MB', modified: '2026-11-05  15:20', parent: '/项目资料/项目方案/' },
  { id: 7, name: '旅行照片.jpg', kind: 'file', size: '3.8 MB', modified: '2026-11-09  10:28', parent: '/照片/' },
])
const categories = [
  { name: '我的文件', icon: 'chevron-right', group: true },
  { name: '团队文件', icon: 'chevron-right', group: true },
  { name: '外接存储', icon: 'chevron-right', group: true },
  { name: '远程挂载', icon: 'chevron-right', group: true },
  { name: '应用文件', icon: 'app' },
  { name: '他人共享', icon: 'usergroup', separator: true },
  { name: '我的共享', icon: 'share' },
  { name: '外链管理', icon: 'link' },
  { name: '最近访问', icon: 'time', separator: true },
  { name: '我的收藏', icon: 'star' },
  { name: '回收站', icon: 'delete', separator: true },
  { name: '管理员视角', icon: 'usergroup' },
]
const mobileTabs = [
  { name: '我的文件', icon: 'folder-filled' },
  { name: '最近访问', icon: 'time' },
  { name: '我的收藏', icon: 'star' },
  { name: '回收站', icon: 'delete' },
]
const category = ref('我的文件')
const path = ref('/')
const query = ref('')
const selected = ref<number[]>([])
const view = ref<'list' | 'grid' | 'columns'>('list')
const descending = ref(false)
const sortField = ref<SortField>('name')
const sortOptions: { field: SortField; label: string }[] = [
  { field: 'name', label: '文件名' }, { field: 'modified', label: '修改时间' }, { field: 'location', label: '所在位置' },
  { field: 'type', label: '类型' }, { field: 'size', label: '大小' }, { field: 'created', label: '创建时间' }, { field: 'owner', label: '所有者' },
]
const sortMenu = ref<{ x: number; y: number } | null>(null)
const sortMenuElement = ref<HTMLElement | null>(null)
const expanded = ref<number[]>([])
const columnTrail = ref<number[]>([])
const columnFile = ref<number | null>(null)
const history = ref(['/'])
const historyIndex = ref(0)
const dialog = ref(false)
const dialogMode = ref<'create' | 'rename' | 'delete' | 'details'>('create')
const folderName = ref('')
const error = ref('')
const message = ref('')
const fileList = ref<HTMLElement | null>(null)
const menuElement = ref<HTMLElement | null>(null)
const menu = ref<{ x: number; y: number; entry: boolean } | null>(null)
const clipboard = ref<{ ids: number[]; mode: 'copy' | 'cut' } | null>(null)
const undoStack = ref<Entry[][]>([])
const redoStack = ref<Entry[][]>([])
const selectionAnchor = ref<number | null>(null)
const selectionCursor = ref<number | null>(null)
const marquee = ref<{ left: number; top: number; width: number; height: number } | null>(null)
let nextId = 8
let drag: { x: number; y: number; currentX: number; currentY: number; scrollLeft: number; scrollTop: number; initial: number[]; moved: boolean; pointerId: number } | null = null
let scrollFrame = 0
let suppressClick = false
function fileType(entry: Entry) { return entry.kind === 'folder' ? '文件夹' : entry.name.split('.').pop()?.toLowerCase() || '文件' }
function sizeBytes(size: string) {
  const match = size.match(/^([\d.]+)\s*(B|KB|MB|GB|TB)$/i)
  return match ? Number(match[1]) * 1024 ** ['B', 'KB', 'MB', 'GB', 'TB'].indexOf(match[2].toUpperCase()) : 0
}
function sortEntries(items: Entry[]) {
  const value = (entry: Entry) => {
    switch (sortField.value) {
      case 'modified': case 'created': return entry.modified
      case 'location': return entry.parent === '/' ? '存储空间1' : entry.parent
      case 'type': return fileType(entry)
      case 'size': return entry.size
      case 'owner': return '当前用户'
      default: return entry.name
    }
  }
  return [...items].sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'folder' ? -1 : 1
    const compared = sortField.value === 'size' ? sizeBytes(a.size) - sizeBytes(b.size) : value(a).localeCompare(value(b), 'zh-CN', { numeric: true })
    return (descending.value ? -compared : compared) || a.name.localeCompare(b.name, 'zh-CN')
  })
}
const visible = computed(() => sortEntries(entries.value.filter(entry => entry.parent === path.value
  && entry.name.toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase()))))
const visibleRows = computed(() => {
  const rows: { entry: Entry; depth: number }[] = []
  const append = (items: Entry[], depth: number) => {
    for (const entry of items) {
      rows.push({ entry, depth })
      if (view.value === 'list' && entry.kind === 'folder' && expanded.value.includes(entry.id)) {
        append(sortEntries(entries.value.filter(child => child.parent === `${entry.parent}${entry.name}/`)), depth + 1)
      }
    }
  }
  append(visible.value, 0)
  return rows
})
const columnGroups = computed(() => columnTrail.value.flatMap(id => {
  const folder = entries.value.find(entry => entry.id === id && entry.kind === 'folder')
  return folder ? [sortEntries(entries.value.filter(entry => entry.parent === `${folder.parent}${folder.name}/`))] : []
}))
const previewFile = computed(() => entries.value.find(entry => entry.id === columnFile.value))
const selectable = computed(() => view.value === 'columns' ? [...visible.value, ...columnGroups.value.flat()] : visibleRows.value.map(row => row.entry))
const selectedCount = computed(() => selectable.value.filter(entry => selected.value.includes(entry.id)).length)
const allSelected = computed(() => selectable.value.length > 0 && selectedCount.value === selectable.value.length)
const crumbs = computed(() => path.value.split('/').filter(Boolean))
const selectedEntries = computed(() => selectable.value.filter(entry => selected.value.includes(entry.id)))

function changePath(next: string, record = true) {
  if (record && next !== path.value) {
    history.value = [...history.value.slice(0, historyIndex.value + 1), next]
    historyIndex.value = history.value.length - 1
  }
  path.value = next
  query.value = ''
  selected.value = []
  selectionAnchor.value = null
  selectionCursor.value = null
  menu.value = null
  expanded.value = []
  columnTrail.value = []
  columnFile.value = null
}
function selectCategory(value: string) {
  category.value = value
  changePath('/')
}
function travel(offset: number) {
  const nextIndex = historyIndex.value + offset
  if (nextIndex < 0 || nextIndex >= history.value.length) return
  historyIndex.value = nextIndex
  changePath(history.value[nextIndex], false)
}
function enter(entry: Entry) {
  if (entry.kind !== 'folder') return
  changePath(`${entry.parent}${entry.name}/`)
}
function navigate(index: number) {
  changePath(index < 0 ? '/' : `/${crumbs.value.slice(0, index + 1).join('/')}/`)
}
function toggleSelected(id: number) {
  selected.value = selected.value.includes(id) ? selected.value.filter(value => value !== id) : [...selected.value, id]
  selectionAnchor.value = id
  selectionCursor.value = id
}
function toggleAll() {
  selected.value = allSelected.value ? [] : selectable.value.map(entry => entry.id)
  selectionAnchor.value = selected.value[0] ?? null
  selectionCursor.value = selected.value[0] ?? null
}
function selectEntry(entry: Entry, event: MouseEvent) {
  if (suppressClick) { suppressClick = false; return }
  const index = selectable.value.findIndex(item => item.id === entry.id)
  const anchor = selectable.value.findIndex(item => item.id === selectionAnchor.value)
  selectionCursor.value = entry.id
  if (event.shiftKey && anchor >= 0) {
    const range = selectable.value.slice(Math.min(anchor, index), Math.max(anchor, index) + 1).map(item => item.id)
    selected.value = event.ctrlKey || event.metaKey ? [...new Set([...selected.value, ...range])] : range
  } else if (event.ctrlKey || event.metaKey) {
    toggleSelected(entry.id)
  } else {
    selected.value = [entry.id]
    selectionAnchor.value = entry.id
  }
}
function toggleExpanded(entry: Entry) {
  if (expanded.value.includes(entry.id)) {
    expanded.value = expanded.value.filter(id => id !== entry.id)
    const prefix = `${entry.parent}${entry.name}/`
    selected.value = selected.value.filter(id => !entries.value.some(item => item.id === id && item.parent.startsWith(prefix)))
  } else expanded.value = [...expanded.value, entry.id]
}
function setView(next: 'list' | 'grid' | 'columns') {
  view.value = next
  selected.value = []
  selectionAnchor.value = null
  selectionCursor.value = null
  columnTrail.value = []
  columnFile.value = null
}
function selectColumn(entry: Entry, index: number, event: MouseEvent) {
  if (suppressClick) { suppressClick = false; return }
  columnTrail.value = columnTrail.value.slice(0, index)
  columnFile.value = entry.kind === 'file' ? entry.id : null
  if (entry.kind === 'folder') columnTrail.value.push(entry.id)
  selected.value = [entry.id]
  selectionAnchor.value = entry.id
  selectionCursor.value = entry.id
  if (event.detail) nextTick(() => document.querySelector('.column-view')?.scrollTo({ left: 100000, behavior: 'smooth' }))
}
function showSortMenu(event: MouseEvent) {
  if (sortMenu.value) { sortMenu.value = null; return }
  menu.value = null
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect()
  sortMenu.value = { x: bounds.right, y: bounds.bottom + 4 }
  nextTick(() => {
    if (!sortMenu.value || !sortMenuElement.value) return
    const rect = sortMenuElement.value.getBoundingClientRect()
    sortMenu.value = { x: Math.max(0, Math.min(bounds.right - rect.width, window.innerWidth - rect.width)), y: Math.max(0, Math.min(bounds.bottom + 4, window.innerHeight - rect.height)) }
    sortMenuElement.value.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus()
  })
}
function setSort(field: SortField) { sortField.value = field; sortMenu.value = null }
function setDirection(isDescending: boolean) { descending.value = isDescending; sortMenu.value = null }
function openDialog(mode: 'create' | 'rename' | 'delete' | 'details' = 'create') {
  if (((mode === 'rename' || mode === 'details') && selectedEntries.value.length !== 1) || (mode === 'delete' && !selectedEntries.value.length)) return
  dialogMode.value = mode
  folderName.value = mode === 'rename' ? selectedEntries.value[0].name : ''
  error.value = ''
  menu.value = null
  dialog.value = true
}
function snapshot() { return entries.value.map(entry => ({ ...entry })) }
function rememberChange() {
  undoStack.value = [...undoStack.value.slice(-49), snapshot()]
  redoStack.value = []
}
function restoreSnapshot(direction: 'undo' | 'redo') {
  const source = direction === 'undo' ? undoStack.value : redoStack.value
  if (!source.length) return
  const previous = source.pop()!
  const destination = direction === 'undo' ? redoStack : undoStack
  destination.value = [...destination.value.slice(-49), snapshot()]
  entries.value = previous
  while (path.value !== '/' && !entries.value.some(entry => entry.kind === 'folder' && `${entry.parent}${entry.name}/` === path.value)) {
    const parts = path.value.split('/').filter(Boolean).slice(0, -1)
    path.value = parts.length ? `/${parts.join('/')}/` : '/'
  }
  history.value = [path.value]
  historyIndex.value = 0
  selected.value = []
  selectionAnchor.value = null
  selectionCursor.value = null
  clipboard.value = null
  menu.value = null
  expanded.value = []
  columnTrail.value = []
  columnFile.value = null
  message.value = direction === 'undo' ? '已撤销预览中的操作' : '已重做预览中的操作'
}
function confirmDialog() {
  if (dialogMode.value === 'details') { dialog.value = false; return }
  if (dialogMode.value === 'delete') {
    const removed = selectedEntries.value
    if (!removed.length) { dialog.value = false; return }
    rememberChange()
    entries.value = entries.value.filter(entry => !removed.some(item => entry.id === item.id
      || (item.kind === 'folder' && entry.parent.startsWith(`${item.parent}${item.name}/`))))
    clipboard.value = null
    selected.value = []
    selectionAnchor.value = null
    history.value = [path.value]
    historyIndex.value = 0
    dialog.value = false
    message.value = '已从预览中删除所选项目'
    return
  }
  const name = folderName.value.trim()
  if (!name || /[\\/:*?"<>|]/.test(name) || name === '.' || name === '..') {
    error.value = '请输入有效名称，不能包含 / \\ : * ? " < > |。'
    return
  }
  const renamed = dialogMode.value === 'rename' ? selectedEntries.value[0] : undefined
  if (entries.value.some(entry => entry.parent === (renamed?.parent ?? path.value) && entry.name === name && entry.id !== renamed?.id)) {
    error.value = '当前位置已存在同名项目。'
    return
  }
  if (renamed?.name === name) { dialog.value = false; return }
  rememberChange()
  if (renamed) {
    const oldPath = `${renamed.parent}${renamed.name}/`
    const newPath = `${renamed.parent}${name}/`
    if (renamed.kind === 'folder') {
      entries.value.forEach(entry => { if (entry.parent.startsWith(oldPath)) entry.parent = newPath + entry.parent.slice(oldPath.length) })
      history.value = history.value.map(item => item.startsWith(oldPath) ? newPath + item.slice(oldPath.length) : item)
    }
    renamed.name = name
  } else {
    entries.value.push({ id: nextId++, name, kind: 'folder', size: '--', modified: '刚刚', parent: path.value })
  }
  category.value = '我的文件'
  query.value = ''
  dialog.value = false
}
function copySelection(mode: 'copy' | 'cut') {
  if (!selectedEntries.value.length) return
  const selectedFolders = selectedEntries.value.filter(entry => entry.kind === 'folder')
  clipboard.value = { ids: selectedEntries.value.filter(entry => !selectedFolders.some(folder => entry.id !== folder.id && entry.parent.startsWith(`${folder.parent}${folder.name}/`))).map(entry => entry.id), mode }
  menu.value = null
  message.value = mode === 'copy' ? '已复制到预览剪贴板' : '已剪切到预览剪贴板'
}
function pasteSelection() {
  const buffer = clipboard.value
  if (!buffer) return
  const sources = entries.value.filter(entry => buffer.ids.includes(entry.id))
  if (sources.some(entry => entry.kind === 'folder' && path.value.startsWith(`${entry.parent}${entry.name}/`))) {
    message.value = '不能将文件夹粘贴到自身或其子文件夹中'
    return
  }
  if (!sources.length) { clipboard.value = null; return }
  if (buffer.mode === 'copy' || sources.some(entry => entry.parent !== path.value)) rememberChange()
  const newSelection: number[] = []
  for (const source of sources) {
    if (buffer.mode === 'cut' && source.parent === path.value) { newSelection.push(source.id); continue }
    let name = source.name
    const dot = source.kind === 'file' ? name.lastIndexOf('.') : -1
    const stem = dot > 0 ? name.slice(0, dot) : name
    const extension = dot > 0 ? name.slice(dot) : ''
    let suffix = 1
    while (entries.value.some(entry => entry.parent === path.value && entry.name === name)) {
      name = `${stem} - 副本${suffix > 1 ? ` (${suffix})` : ''}${extension}`
      suffix++
    }
    const oldPath = `${source.parent}${source.name}/`
    const newPath = `${path.value}${name}/`
    const descendants = source.kind === 'folder' ? entries.value.filter(entry => entry.parent.startsWith(oldPath)) : []
    if (buffer.mode === 'cut') {
      source.parent = path.value
      source.name = name
      descendants.forEach(entry => { entry.parent = newPath + entry.parent.slice(oldPath.length) })
      history.value = history.value.map(item => item.startsWith(oldPath) ? newPath + item.slice(oldPath.length) : item)
      newSelection.push(source.id)
    } else {
      const copy = { ...source, id: nextId++, parent: path.value, name }
      entries.value.push(copy, ...descendants.map(entry => ({ ...entry, id: nextId++, parent: newPath + entry.parent.slice(oldPath.length) })))
      newSelection.push(copy.id)
    }
  }
  if (buffer.mode === 'cut') clipboard.value = null
  selected.value = newSelection
  selectionAnchor.value = newSelection[0] ?? null
  selectionCursor.value = newSelection[0] ?? null
  menu.value = null
  message.value = '已粘贴到预览'
}
function showMenu(event: MouseEvent, entry?: Entry) {
  event.preventDefault()
  sortMenu.value = null
  if (entry && !selected.value.includes(entry.id)) {
    selected.value = [entry.id]
    selectionAnchor.value = entry.id
    selectionCursor.value = entry.id
  } else if (!entry) {
    selected.value = []
    selectionAnchor.value = null
  }
  menu.value = { x: event.clientX, y: event.clientY, entry: !!entry }
  nextTick(() => {
    if (!menu.value || !menuElement.value) return
    const rect = menuElement.value.getBoundingClientRect()
    menu.value = { ...menu.value, x: Math.max(0, Math.min(menu.value.x, window.innerWidth - rect.width)), y: Math.max(0, Math.min(menu.value.y, window.innerHeight - rect.height)) }
    menuElement.value.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus()
  })
}
function suppressBrowserMenu(event: MouseEvent) {
  if (!(event.target instanceof Element) || !event.target.closest('input, textarea, [contenteditable="true"]')) event.preventDefault()
}
function startSelection(event: PointerEvent) {
  if (event.button !== 0 || !fileList.value || (event.target as Element).closest('.file-head, input')) return
  menu.value = null
  message.value = ''
  fileList.value.focus({ preventScroll: true })
  drag = { x: event.clientX, y: event.clientY, currentX: event.clientX, currentY: event.clientY, scrollLeft: fileList.value.scrollLeft, scrollTop: fileList.value.scrollTop, initial: event.ctrlKey || event.metaKey ? [...selected.value] : [], moved: false, pointerId: event.pointerId }
  event.preventDefault()
}
function moveSelection(event: PointerEvent) {
  if (!drag || event.pointerId !== drag.pointerId || !fileList.value) return
  drag.currentX = event.clientX
  drag.currentY = event.clientY
  if (!drag.moved && Math.hypot(drag.currentX - drag.x, drag.currentY - drag.y) < 4) return
  if (!drag.moved) {
    try { fileList.value.setPointerCapture(event.pointerId) } catch { /* The pointer may already have left the document. */ }
  }
  drag.moved = true
  updateMarquee()
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(scrollSelection)
}
function updateMarquee() {
  if (!drag || !fileList.value) return
  const bounds = fileList.value.getBoundingClientRect()
  const x1 = Math.max(bounds.left, Math.min(bounds.right, drag.x - (fileList.value.scrollLeft - drag.scrollLeft)))
  const x2 = Math.max(bounds.left, Math.min(bounds.right, drag.currentX))
  const y1 = Math.max(bounds.top, Math.min(bounds.bottom, drag.y - (fileList.value.scrollTop - drag.scrollTop)))
  const y2 = Math.max(bounds.top, Math.min(bounds.bottom, drag.currentY))
  const left = Math.min(x1, x2), right = Math.max(x1, x2), top = Math.min(y1, y2), bottom = Math.max(y1, y2)
  marquee.value = { left, top, width: right - left, height: bottom - top }
  const hit = [...fileList.value.querySelectorAll<HTMLElement>('.file-row')].filter(row => {
    const rect = row.getBoundingClientRect()
    return rect.right > left && rect.left < right && rect.bottom > top && rect.top < bottom
  }).map(row => Number(row.dataset.id))
  selected.value = [...new Set([...drag.initial, ...hit])]
  selectionAnchor.value = hit[0] ?? null
  selectionCursor.value = hit[0] ?? null
}
function scrollSelection() {
  scrollFrame = 0
  if (!drag?.moved || !fileList.value) return
  const bounds = fileList.value.getBoundingClientRect()
  const vertical = drag.currentY < bounds.top + 24 ? -12 : drag.currentY > bounds.bottom - 24 ? 12 : 0
  const horizontal = drag.currentX < bounds.left + 24 ? -12 : drag.currentX > bounds.right - 24 ? 12 : 0
  if (vertical || horizontal) {
    fileList.value.scrollBy(horizontal, vertical)
    updateMarquee()
  }
  scrollFrame = window.requestAnimationFrame(scrollSelection)
}
function endSelection(event: PointerEvent) {
  if (!drag || event.pointerId !== drag.pointerId) return
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
  scrollFrame = 0
  suppressClick = drag.moved
  if (!drag.moved && !(event.target instanceof Element && event.target.closest('.file-row'))) {
    selected.value = []
    selectionAnchor.value = null
  }
  drag = null
  marquee.value = null
  if (suppressClick) window.setTimeout(() => { suppressClick = false }, 0)
}
function closeMenu(event: Event) {
  if (menu.value && !menuElement.value?.contains(event.target as Node)) menu.value = null
  if (sortMenu.value && !sortMenuElement.value?.contains(event.target as Node) && !(event.target instanceof Element && event.target.closest('.sort-button'))) sortMenu.value = null
}
function handleKey(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  if (dialog.value || target?.matches('input, textarea, select, [contenteditable="true"]')) return
  if (sortMenu.value && event.key === 'Escape') { event.preventDefault(); sortMenu.value = null; fileList.value?.focus(); return }
  if (sortMenu.value) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const buttons = [...(sortMenuElement.value?.querySelectorAll<HTMLButtonElement>('button') ?? [])]
      if (buttons.length) {
        event.preventDefault()
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
        buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length].focus()
      }
    }
    return
  }
  if (menu.value && event.key === 'Escape') { event.preventDefault(); menu.value = null; fileList.value?.focus(); return }
  if (menu.value) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
      const buttons = [...(menuElement.value?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])]
      if (buttons.length) {
        event.preventDefault()
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1
          : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length
        buttons[next].focus()
      }
    }
    return
  }
  const mod = event.ctrlKey || event.metaKey
  const key = event.key.toLowerCase()
  const listFocused = target === document.body || !!fileList.value?.contains(target)
  if (listFocused && (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10'))) {
    event.preventDefault()
    const entry = selectedEntries.value[0]
    const element = entry ? fileList.value?.querySelector<HTMLElement>(`.file-row[data-id="${entry.id}"]`) : fileList.value
    const rect = element?.getBoundingClientRect()
    showMenu(new MouseEvent('contextmenu', { clientX: rect?.left ?? 0, clientY: rect?.bottom ?? 0, cancelable: true }), entry)
  }
  else if (mod && key === 'a') { event.preventDefault(); selected.value = selectable.value.map(entry => entry.id); selectionAnchor.value = selected.value[0] ?? null; selectionCursor.value = selected.value[0] ?? null }
  else if (mod && key === 'c' && selectedEntries.value.length) { event.preventDefault(); copySelection('copy') }
  else if (mod && key === 'x' && selectedEntries.value.length) { event.preventDefault(); copySelection('cut') }
  else if (mod && key === 'v' && clipboard.value) { event.preventDefault(); pasteSelection() }
  else if (mod && event.shiftKey && key === 'n') { event.preventDefault(); openDialog() }
  else if (mod && key === 'z') { event.preventDefault(); restoreSnapshot(event.shiftKey ? 'redo' : 'undo') }
  else if (event.ctrlKey && key === 'y') { event.preventDefault(); restoreSnapshot('redo') }
  else if (mod && key === 'f') { event.preventDefault(); document.querySelector<HTMLInputElement>('.files-template input[aria-label="搜索文件"]')?.focus() }
  else if (event.key === 'F5' || (mod && key === 'r')) { event.preventDefault(); selected.value = []; selectionAnchor.value = null; message.value = '预览已刷新' }
  else if (event.key === 'F2' && selectedEntries.value.length === 1) { event.preventDefault(); openDialog('rename') }
  else if ((event.key === 'Delete' || (event.metaKey && event.key === 'Backspace')) && selectedEntries.value.length) { event.preventDefault(); openDialog('delete') }
  else if (listFocused && event.key === 'Enter' && selectedEntries.value.length === 1 && selectedEntries.value[0].kind === 'folder') { event.preventDefault(); enter(selectedEntries.value[0]) }
  else if ((event.altKey && event.key === 'ArrowLeft') || (!mod && event.key === 'Backspace')) { event.preventDefault(); travel(-1) }
  else if (event.altKey && event.key === 'ArrowRight') { event.preventDefault(); travel(1) }
  else if (event.altKey && event.key === 'ArrowUp' && path.value !== '/') { event.preventDefault(); navigate(crumbs.value.length - 2) }
  else if (event.key === 'Escape') { selected.value = []; selectionAnchor.value = null }
  else if (listFocused && !mod && !event.altKey && (event.key === 'ArrowDown' || event.key === 'ArrowUp') && selectable.value.length) {
    event.preventDefault()
    const index = selectable.value.findIndex(entry => entry.id === (selectionCursor.value ?? selected.value[0]))
    const nextIndex = index < 0 ? (event.key === 'ArrowDown' ? 0 : selectable.value.length - 1) : index + (event.key === 'ArrowDown' ? 1 : -1)
    const next = selectable.value[Math.max(0, Math.min(selectable.value.length - 1, nextIndex))]
    selectEntry(next, event as unknown as MouseEvent)
    nextTick(() => fileList.value?.querySelector<HTMLElement>(`.file-row[data-id="${next.id}"]`)?.scrollIntoView({ block: 'nearest' }))
  }
}
onMounted(() => {
  window.addEventListener('pointermove', moveSelection)
  window.addEventListener('pointerup', endSelection)
  window.addEventListener('pointercancel', endSelection)
  window.addEventListener('pointerdown', closeMenu, true)
  window.addEventListener('click', closeMenu, true)
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
  window.removeEventListener('pointermove', moveSelection)
  window.removeEventListener('pointerup', endSelection)
  window.removeEventListener('pointercancel', endSelection)
  window.removeEventListener('pointerdown', closeMenu, true)
  window.removeEventListener('click', closeMenu, true)
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <FnLayout shell="fnos-iframe" class="files-template" @contextmenu="suppressBrowserMenu">
    <template #navigation>
      <button v-for="(item, index) in categories" :key="item.name" type="button" class="nav-item" :class="{ active: category === item.name, 'nav-separator': item.separator }" :disabled="index !== 0" @click="selectCategory(item.name)">
        <svg v-if="item.group" aria-hidden="true" viewBox="0 0 24 24" class="nav-icon nav-group-icon"><path d="M9.617 5.076a1 1 0 011.09.217l6 6a1 1 0 010 1.414l-6 6A1 1 0 019 18V6a1 1 0 01.617-.924z" /></svg>
        <FnIcon v-else :name="item.icon" :size="16" class="nav-icon" aria-hidden="true" />{{ item.name }}
      </button>
    </template>
    <template #navigationFooter><div class="nav-note"><FnIcon name="setting-1" :size="16" /> 设置</div></template>
    <template #bottomNavigation>
      <button v-for="tab in mobileTabs" :key="tab.name" type="button" :class="{ active: category === tab.name }" :aria-pressed="category === tab.name" @click="selectCategory(tab.name)">
        <FnIcon :name="tab.icon" :size="20" />
        <span>{{ tab.name }}</span>
      </button>
    </template>
    <FnPage scroll="content" padding="none">
      <div class="files-content">
        <div class="path-row">
          <div class="history-buttons" role="group" aria-label="导航">
            <button type="button" class="icon-button" aria-label="后退" title="后退" :disabled="historyIndex === 0" @click="travel(-1)"><FnIcon name="chevron-left" :size="16" /></button>
            <button type="button" class="icon-button" aria-label="前进" title="前进" :disabled="historyIndex === history.length - 1" @click="travel(1)"><FnIcon name="chevron-right" :size="16" /></button>
          </div>
          <button type="button" class="icon-button refresh-button" aria-label="刷新" title="刷新" @click="selected = []"><FnIcon name="refresh" :size="16" /></button>
          <div class="breadcrumb" aria-label="当前位置">
            <button @click="navigate(-1)">我的文件</button>
            <template v-for="(crumb, index) in crumbs" :key="index"><FnIcon name="chevron-right" :size="14" /><button @click="navigate(index)">{{ crumb }}</button></template>
          </div>
          <div class="search">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11 4a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1116.032 5.618l3.675 3.675a1 1 0 01-1.414 1.414l-3.675-3.675A9 9 0 012 11z" /></svg>
            <FnInput v-model="query" size="small" placeholder="搜索" aria-label="搜索文件" />
          </div>
        </div>
        <div class="toolbar">
          <div class="toolbar-actions">
            <FnButton size="small" variant="outline" disabled><FnIcon name="upload" :size="16" />上传文件夹</FnButton>
            <FnButton size="small" variant="outline" @click="openDialog()"><FnIcon name="folder-add" :size="16" />新建文件夹</FnButton>
            <FnButton size="small" variant="outline" disabled><FnIcon name="download" :size="16" />下载</FnButton>
            <FnButton size="small" variant="outline" :disabled="!selectedCount" @click="openDialog('delete')"><FnIcon name="delete" :size="16" />删除</FnButton>
            <FnButton size="small" variant="outline" disabled><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a11 11 0 100 22 11 11 0 000-22zm0 2a9 9 0 110 18 9 9 0 010-18zm-4.7 7.8a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zm4.8 0a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zm4.6 0a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6z" /></svg>更多</FnButton>
          </div>
          <div class="display-actions">
            <button type="button" class="sort-button" aria-label="排序" title="排序" aria-haspopup="menu" :aria-expanded="!!sortMenu" @click="showSortMenu">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 4a1 1 0 112 0v13.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L6 17.586V4zm9 7a1 1 0 110 2h-4a1 1 0 110-2h4zm3-4a1 1 0 010 2h-7a1 1 0 110-2h7zm3-4a1 1 0 010 2H11a1 1 0 110-2h10z" /></svg>
            </button>
            <div class="view-switch" role="group" aria-label="显示方式">
              <button type="button" :class="{ active: view === 'list' }" :aria-pressed="view === 'list'" aria-label="切换列表视图" title="列表视图" @click="setView('list')"><FnIcon name="view-list" :size="16" /></button>
              <button type="button" :class="{ active: view === 'grid' }" :aria-pressed="view === 'grid'" aria-label="切换图标视图" title="图标视图" @click="setView('grid')"><FnIcon name="view-module" :size="16" /></button>
              <button type="button" :class="{ active: view === 'columns' }" :aria-pressed="view === 'columns'" aria-label="切换分栏视图" title="分栏视图" @click="setView('columns')"><FnIcon name="view-column" :size="16" /></button>
            </div>
          </div>
        </div>
        <div class="file-area" :class="{ 'column-view': view === 'columns' && visible.length }" @contextmenu.prevent="showMenu($event)" @dragover.prevent @drop.prevent="message = '预览暂不支持上传文件'">
          <div class="file-list-shell">
          <div ref="fileList" class="file-list" :class="{ grid: view === 'grid' && visible.length, columns: view === 'columns' && visible.length }" tabindex="0" aria-label="文件列表" @pointerdown="startSelection">
            <div v-if="view === 'list' && (visible.length || query)" class="file-head">
              <span class="head-name"><input type="checkbox" aria-label="选择全部文件" :checked="allSelected" :indeterminate="selectedCount > 0 && !allSelected" @change="toggleAll" />文件名 <span class="sort-arrows">▲<br />▼</span></span>
              <span>修改时间</span><span>所在位置</span><span>类型</span><span>大小</span><span>创建时间</span><span>所有者</span>
            </div>
            <div v-for="{ entry, depth } in visibleRows" :key="entry.id" class="file-row" :data-id="entry.id" :class="{ selected: selected.includes(entry.id), active: view === 'columns' && columnTrail.includes(entry.id), cut: clipboard?.mode === 'cut' && clipboard.ids.includes(entry.id) }" @click="view === 'columns' ? selectColumn(entry, 0, $event) : selectEntry(entry, $event)" @dblclick="enter(entry)" @contextmenu.stop.prevent="showMenu($event, entry)">
              <span class="file-name" :style="view === 'list' ? { paddingLeft: `${8 + depth * 16}px` } : undefined">
                <button v-if="view === 'list' && entry.kind === 'folder'" type="button" class="file-chevron" :aria-label="`${expanded.includes(entry.id) ? '折叠' : '展开'} ${entry.name}`" :aria-expanded="expanded.includes(entry.id)" @pointerdown.stop @click.stop="toggleExpanded(entry)">
                  <FnIcon :name="expanded.includes(entry.id) ? 'chevron-down' : 'chevron-right'" :size="16" class="file-chevron-icon" />
                </button>
                <span v-else-if="view === 'list'" class="file-chevron"></span>
                <span :class="['file-icon', entry.kind]" aria-hidden="true"></span>
                <button type="button" class="file-name-button" :aria-pressed="selected.includes(entry.id)" @keydown.enter.stop="enter(entry)">{{ entry.name }}</button>
              </span>
              <span class="file-date">{{ entry.modified }}</span><span class="file-location">{{ depth ? '–' : '存储空间1' }}</span><span class="file-type">{{ fileType(entry) }}</span><span class="file-size">{{ entry.size }}</span><span class="file-created">{{ entry.modified }}</span><span class="file-owner">当前用户</span>
            </div>
            <div v-if="!visible.length && query" class="empty"><strong>暂无文件</strong><span>没有找到匹配的文件，试试其他关键词</span></div>
            <div v-else-if="!visible.length" class="empty-state">
              <strong>将文件拖拽到此处</strong><span>或者</span>
              <div class="empty-actions">
                <button type="button" @pointerdown.stop @click="openDialog()"><span class="empty-action-icon create"><span class="file-icon folder"></span><b>+</b></span>新建文件夹</button>
                <button type="button" disabled title="预览中暂不支持上传"><span class="empty-action-icon upload"><span class="file-icon folder"></span><FnIcon name="arrow-up" :size="25" /></span>上传文件夹</button>
                <button type="button" disabled title="预览中暂不支持上传"><span class="empty-action-icon upload-file"><FnIcon name="file-add" :size="38" /></span>上传文件</button>
              </div>
            </div>
          </div>
          <button v-if="view === 'list' && (visible.length || query)" type="button" class="column-settings" aria-label="列设置（暂未提供）" title="列设置（暂未提供）" disabled>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 5h18v2H3zm0 5h18v2H3zm0 5h10v2H3zm15 0a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" /></svg>
          </button>
          </div>
          <div v-for="(group, index) in view === 'columns' ? columnGroups : []" :key="columnTrail[index]" class="column-preview">
            <button v-for="child in group" :key="child.id" type="button" class="column-child" :class="{ active: columnTrail.includes(child.id), selected: selected.includes(child.id) }" :aria-pressed="selected.includes(child.id)" @click="selectColumn(child, index + 1, $event)" @dblclick="enter(child)" @contextmenu.stop.prevent="showMenu($event, child)">
              <span :class="['file-icon', child.kind]" aria-hidden="true"></span><span class="column-child-name">{{ child.name }}</span>
            </button>
            <div v-if="!group.length" class="column-empty">暂无文件</div>
          </div>
          <div v-if="view === 'columns' && previewFile" class="column-details">
            <span class="file-icon file large" aria-hidden="true"></span>
            <strong>{{ previewFile.name }}</strong>
            <dl><div><dt>类型</dt><dd>{{ fileType(previewFile) }} 文件</dd></div><div><dt>大小</dt><dd>{{ previewFile.size }}</dd></div><div><dt>占用空间</dt><dd>{{ previewFile.size }}</dd></div><div><dt>所有者</dt><dd>当前用户</dd></div><div><dt>修改时间</dt><dd>{{ previewFile.modified }}</dd></div></dl>
          </div>
        </div>
        <div v-if="marquee" class="selection-marquee" :style="{ left: `${marquee.left}px`, top: `${marquee.top}px`, width: `${marquee.width}px`, height: `${marquee.height}px` }" aria-hidden="true"></div>
        <div v-if="sortMenu" ref="sortMenuElement" class="file-sort-menu" role="menu" aria-label="排序方式" :style="{ left: `${sortMenu.x}px`, top: `${sortMenu.y}px` }">
          <button v-for="option in sortOptions" :key="option.field" type="button" role="menuitemradio" :aria-checked="sortField === option.field" @click="setSort(option.field)"><span class="sort-check">{{ sortField === option.field ? '✓' : '' }}</span>{{ option.label }}</button>
          <div class="menu-divider"></div>
          <button type="button" role="menuitemradio" :aria-checked="!descending" @click="setDirection(false)"><span class="sort-check">{{ !descending ? '✓' : '' }}</span>升序</button>
          <button type="button" role="menuitemradio" :aria-checked="descending" @click="setDirection(true)"><span class="sort-check">{{ descending ? '✓' : '' }}</span>降序</button>
        </div>
        <div v-if="menu" ref="menuElement" class="file-context-menu" role="menu" aria-label="文件操作菜单" :style="{ left: `${menu.x}px`, top: `${menu.y}px` }" @contextmenu.prevent>
          <template v-if="menu.entry">
            <button type="button" role="menuitem" :disabled="selectedEntries.length !== 1 || selectedEntries[0]?.kind !== 'folder'" @click="enter(selectedEntries[0])"><FnIcon name="arrow-right-up" :size="16" />打开</button>
            <button type="button" role="menuitem" disabled title="预览中暂不支持"><FnIcon name="app" :size="16" />打开方式 <FnIcon name="chevron-right" :size="16" class="menu-arrow" /></button>
            <button type="button" role="menuitem" disabled title="预览中暂不支持下载"><FnIcon name="download" :size="16" />下载</button>
            <div class="menu-divider"></div>
            <button type="button" role="menuitem" disabled title="请使用剪切、复制和粘贴"><FnIcon name="file-copy" :size="16" />复制到/移动到 <FnIcon name="chevron-right" :size="16" class="menu-arrow" /></button>
            <button type="button" role="menuitem" @click="copySelection('cut')"><FnIcon name="cut" :size="16" />剪切</button>
            <button type="button" role="menuitem" @click="copySelection('copy')"><FnIcon name="copy" :size="16" />复制</button>
            <button type="button" role="menuitem" @click="openDialog('delete')"><FnIcon name="delete" :size="16" />删除</button>
            <button type="button" role="menuitem" :disabled="selectedEntries.length !== 1" @click="openDialog('rename')"><FnIcon name="edit" :size="16" />重命名</button>
            <div class="menu-divider"></div>
            <button type="button" role="menuitem" disabled title="预览中暂不支持收藏"><FnIcon name="star" :size="16" />收藏</button>
            <button type="button" role="menuitem" disabled title="预览中暂不支持分享"><FnIcon name="share" :size="16" />分享外部链接</button>
            <div class="menu-divider"></div>
            <button type="button" role="menuitem" :disabled="selectedEntries.length !== 1" @click="openDialog('details')"><FnIcon name="info-circle" :size="16" />详细信息</button>
          </template>
          <template v-else>
            <button type="button" role="menuitem" @click="openDialog()"><FnIcon name="folder-add" :size="16" />新建文件夹</button>
            <button type="button" role="menuitem" :disabled="!clipboard" @click="pasteSelection"><FnIcon name="paste" :size="16" />粘贴</button>
            <button type="button" role="menuitem" :disabled="!undoStack.length" @click="restoreSnapshot('undo')"><FnIcon name="rollback" :size="16" />撤销</button>
            <button type="button" role="menuitem" :disabled="!redoStack.length" @click="restoreSnapshot('redo')"><FnIcon name="rollfront" :size="16" />重做</button>
            <button type="button" role="menuitem" :disabled="!selectable.length" @click="selected = selectable.map(entry => entry.id); selectionAnchor = selected[0] ?? null; selectionCursor = selected[0] ?? null; menu = null"><FnIcon name="check" :size="16" />全选</button>
          </template>
        </div>
      </div>
      <template #status><span aria-live="polite"><span v-if="selectedCount">选中 {{ selectedCount }} 项（共 {{ selectable.length }} 项）</span><span v-else>共 {{ selectable.length }} 项</span></span><span class="file-message" role="status">{{ message }}</span></template>
    </FnPage>
    <FnDialog v-model:visible="dialog" :title="dialogMode === 'create' ? '新建文件夹' : dialogMode === 'rename' ? '重命名' : dialogMode === 'details' ? '详细信息' : '删除项目'" :confirm-text="dialogMode === 'delete' ? '删除' : '确定'" @confirm="confirmDialog">
      <div v-if="dialogMode === 'create' || dialogMode === 'rename'" class="folder-form">
        <label><span>{{ dialogMode === 'create' ? '文件夹名称' : '名称' }}</span>
          <FnInput v-model="folderName" :placeholder="dialogMode === 'create' ? '请输入文件夹名称' : '请输入名称'" />
        </label>
        <p id="folder-error" class="form-error" role="status">{{ error }}</p>
      </div>
      <div v-else-if="dialogMode === 'details' && selectedEntries[0]" class="file-details-dialog"><p>名称：{{ selectedEntries[0].name }}</p><p>类型：{{ fileType(selectedEntries[0]) }}</p><p>大小：{{ selectedEntries[0].size }}</p><p>修改时间：{{ selectedEntries[0].modified }}</p></div>
      <p v-else>确定从预览中删除选中的 {{ selectedCount }} 项吗？文件夹内的内容也会被删除。</p>
    </FnDialog>
  </FnLayout>
</template>
