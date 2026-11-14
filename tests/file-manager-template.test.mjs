import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { Window } from 'happy-dom'
import { parse, compileScript } from '@vue/compiler-sfc'
import { transform } from 'esbuild'

const window = new Window({ url: 'http://localhost/' })
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'SVGElement', 'Element', 'Node', 'Event', 'MouseEvent']) {
  Object.defineProperty(globalThis, key, { value: key === 'window' ? window : window[key], configurable: true, writable: true })
}

test('file manager supports navigation, selection, views, search and folder creation', async () => {
  const { createApp, h, nextTick } = await import('vue')
  const source = await readFile(new URL('../playground/src/examples/templates/file-manager/FileManager.vue', import.meta.url), 'utf8')
  const { descriptor } = parse(source)
  const script = compileScript(descriptor, { id: 'file-manager-test', inlineTemplate: true })
  const { code } = await transform(script.content, { loader: 'ts', format: 'esm' })
  const vueUrl = pathToFileURL(createRequire(import.meta.url).resolve('vue')).href
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code.replaceAll('from "vue"', `from "${vueUrl}"`)).toString('base64')}`
  const target = document.createElement('div')
  document.body.append(target)
  let app
  try {
    const { default: FileManager } = await import(moduleUrl)
    app = createApp(FileManager)
    app.component('FnLayout', { render() { return h('div', [this.$slots.navigation?.(), this.$slots.default?.(), this.$slots.navigationFooter?.()]) } })
    app.component('FnPage', { render() { return h('div', [this.$slots.default?.(), this.$slots.status?.()]) } })
    app.component('FnButton', { render() { return h('button', this.$attrs, this.$slots.default?.()) } })
    app.component('FnIcon', { render() { return h('span') } })
    app.component('FnInput', {
      props: ['modelValue'],
      emits: ['update:modelValue'],
      render() { return h('input', { ...this.$attrs, value: this.modelValue, onInput: e => this.$emit('update:modelValue', e.target.value) }) },
    })
    app.component('FnDialog', {
      props: ['visible', 'confirmText'],
      emits: ['confirm', 'update:visible'],
      render() { return this.visible ? h('div', [this.$slots.default?.(), h('button', { onClick: () => this.$emit('confirm') }, this.confirmText || '确定')]) : null },
    })
    app.mount(target)
    const byLabel = label => target.querySelector(`[aria-label="${label}"]`)
    const byText = text => [...target.querySelectorAll('button')].find(button => button.textContent.trim() === text)
    const click = async element => { assert.ok(element); element.click(); await nextTick() }
    const input = async (element, value) => { element.value = value; element.dispatchEvent(new window.Event('input', { bubbles: true })); await nextTick() }
    const mouse = async (element, type, options = {}) => { element.dispatchEvent(new window.MouseEvent(type, { bubbles: true, cancelable: true, ...options })); await nextTick() }
    const key = async (element, value, options = {}) => {
      const event = new window.KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...options })
      element.dispatchEvent(event)
      await nextTick()
      return event
    }

    assert.equal(target.querySelectorAll('.file-row').length, 4)
    await click(byLabel('选择全部文件'))
    assert.match(target.textContent, /选中 4 项/)
    await click(byLabel('选择全部文件'))
    assert.doesNotMatch(target.textContent, /选中/)
    await click(byText('文档'))
    await mouse(byText('照片'), 'click', { ctrlKey: true })
    assert.match(target.textContent, /选中 2 项/)
    assert.ok(byText('文档').parentElement.querySelector('.file-chevron'))
    await click(byLabel('选择全部文件'))
    await click(byLabel('选择全部文件'))
    const sortOption = label => [...byLabel('排序方式').querySelectorAll('button')].find(button => button.textContent.trim().endsWith(label))
    await click(byLabel('排序'))
    assert.ok(byLabel('排序方式'))
    await click(sortOption('降序'))
    await click(byLabel('排序'))
    assert.equal(sortOption('降序').getAttribute('aria-checked'), 'true')
    await click(sortOption('修改时间'))
    await click(byLabel('排序'))
    assert.equal(sortOption('修改时间').getAttribute('aria-checked'), 'true')
    await click(sortOption('文件名'))
    await click(byLabel('排序'))
    await click(byLabel('切换图标视图'))
    assert.equal(byLabel('排序方式'), null)
    assert.equal(byLabel('切换图标视图').getAttribute('aria-pressed'), 'true')
    await click(byLabel('切换分栏视图'))
    await click(byText('项目资料'))
    assert.ok(target.querySelector('.column-preview'))
    await click(byLabel('排序'))
    await click(byText('项目方案'))
    assert.equal(byLabel('排序方式'), null)
    assert.equal(target.querySelectorAll('.column-preview').length, 2)
    await click(byText('项目计划.pdf'))
    assert.match(target.querySelector('.column-details').textContent, /项目计划.pdf/)
    await click(byLabel('切换列表视图'))
    await click(byLabel('展开 项目资料'))
    assert.ok(byText('项目方案'))
    await click(byLabel('展开 项目方案'))
    assert.ok(byText('项目计划.pdf'))
    await click(byLabel('折叠 项目资料'))
    assert.equal(byText('项目计划.pdf'), undefined)

    byText('文档').dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }))
    await nextTick()
    assert.equal(byLabel('后退').disabled, false)
    assert.match(target.textContent, /将文件拖拽到此处/)
    assert.ok([...target.querySelectorAll('.empty-actions button')].find(button => button.textContent.includes('上传文件') && button.disabled))
    await click(byText('新建文件夹'))
    await input(target.querySelector('input[placeholder="请输入文件夹名称"]'), '测试目录')
    await click(byText('确定'))
    assert.ok(byText('测试目录'))
    await click(byLabel('后退'))
    assert.equal(target.querySelectorAll('.file-row').length, 4)
    await click(byLabel('前进'))
    assert.ok(byText('测试目录'))
    await input(byLabel('搜索文件'), '不存在')
    assert.match(target.textContent, /没有找到匹配的文件/)
    await input(byLabel('搜索文件'), '')
    await click(byLabel('后退'))

    const list = byLabel('文件列表')
    await click(byText('文档'))
    await mouse(byText('照片'), 'click', { shiftKey: true })
    assert.match(target.textContent, /选中 3 项/)
    await mouse(byText('文档'), 'contextmenu', { button: 2, clientX: 20, clientY: 20 })
    assert.match(target.textContent, /选中 3 项/)
    assert.ok(byLabel('文件操作菜单'))
    await key(byLabel('文件操作菜单').querySelector('button:not(:disabled)'), 'ArrowDown')
    assert.match(document.activeElement.textContent, /复制/)
    await key(list, 'Escape')
    assert.equal(byLabel('文件操作菜单'), null)

    const rect = (left, top, width, height) => ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON() {} })
    list.getBoundingClientRect = () => rect(0, 0, 500, 500)
    const rows = [...list.querySelectorAll('.file-row')]
    rows.forEach((row, index) => { row.getBoundingClientRect = () => rect(0, 50 + index * 40, 500, 40) })
    list.dispatchEvent(new window.PointerEvent('pointerdown', { bubbles: true, button: 0, pointerId: 1, clientX: 200, clientY: 55 }))
    window.dispatchEvent(new window.PointerEvent('pointermove', { bubbles: true, pointerId: 1, clientX: 300, clientY: 125 }))
    await nextTick()
    assert.ok(target.querySelector('.selection-marquee'))
    assert.equal(target.querySelectorAll('.file-row.selected').length, 2)
    window.dispatchEvent(new window.PointerEvent('pointerup', { bubbles: true, pointerId: 1, clientX: 300, clientY: 125 }))
    await nextTick()
    assert.equal(target.querySelector('.selection-marquee'), null)
    await new Promise(resolve => window.setTimeout(resolve, 0))

    assert.equal((await key(list, 'a', { metaKey: true })).defaultPrevented, true)
    assert.match(target.textContent, /选中 4 项/)
    assert.equal((await key(byLabel('搜索文件'), 'a', { metaKey: true })).defaultPrevented, false)
    const inputMenu = new window.MouseEvent('contextmenu', { bubbles: true, cancelable: true })
    byLabel('搜索文件').dispatchEvent(inputMenu)
    assert.equal(inputMenu.defaultPrevented, false)
    await key(list, 'Escape')
    await click(byText('文档'))
    await key(list, 'c', { ctrlKey: true })
    await key(list, 'v', { ctrlKey: true })
    assert.ok(byText('文档 - 副本'))
    byText('文档 - 副本').dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }))
    await nextTick()
    assert.ok(byText('测试目录'))
    await click(byLabel('后退'))
    await click(byText('文档 - 副本'))
    await key(list, 'F2')
    await input(target.querySelector('input[placeholder="请输入名称"]'), '新名称')
    await click(byText('确定'))
    assert.ok(byText('新名称'))
    await key(list, 'Delete')
    assert.match(target.textContent, /确定从预览中删除/)
    await click([...target.querySelectorAll('button')].filter(button => button.textContent.trim() === '删除').at(-1))
    assert.equal(byText('新名称'), undefined)
    await key(list, 'z', { ctrlKey: true })
    assert.ok(byText('新名称'))
    await key(list, 'y', { ctrlKey: true })
    assert.equal(byText('新名称'), undefined)
    assert.ok(byText('文档'))
    await click(byText('文档'))
    await key(list, 'x', { ctrlKey: true })
    byText('文档').dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }))
    await nextTick()
    await key(list, 'v', { ctrlKey: true })
    assert.match(target.textContent, /不能将文件夹粘贴到自身/)
    await click(byLabel('后退'))
    byText('照片').dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }))
    await nextTick()
    await key(list, 'v', { ctrlKey: true })
    assert.ok(byText('文档'))
    byText('文档').dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }))
    await nextTick()
    assert.ok(byText('测试目录'))
    await key(list, 'z', { ctrlKey: true })
    assert.equal(byText('文档'), undefined)
    await key(list, 'z', { metaKey: true, shiftKey: true })
    assert.ok(byText('文档'))
  } finally {
    app?.unmount()
    target.remove()
  }
})
