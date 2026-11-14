import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { readFile, readdir } from 'node:fs/promises'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'

const components = [
  'App.vue',
  'components/DocsSidebar.vue',
  'components/ComponentDetail.vue',
  'components/ExamplePreview.vue',
  'components/ShowcaseWall.vue',
  'pages/HomePage.vue',
  'pages/DocsPage.vue',
  'pages/GuidePage.vue',
  'pages/TemplatesPage.vue',
]

test('website components and examples have valid Vue templates', async () => {
  const exampleNames = (await readdir(new URL('../src/examples/', import.meta.url)))
    .filter(name => name.endsWith('.vue')).map(name => `examples/${name}`)
  for (const name of [...components, ...exampleNames]) {
    const source = await readFile(new URL(`../src/${name}`, import.meta.url), 'utf8')
    const { descriptor, errors } = parse(source, { filename: name })
    assert.deepEqual(errors, [], name)
    assert.ok(descriptor.template, name)
    if (descriptor.script || descriptor.scriptSetup) {
      assert.doesNotThrow(() => compileScript(descriptor, { id: name, inlineTemplate: true }), name)
    }
    assert.deepEqual(compileTemplate({ source: descriptor.template.content, filename: name, id: name }).errors, [], name)
  }
})

test('examples have unique IDs and corresponding Vue files', async () => {
  const [registry, files] = await Promise.all([
    readFile(new URL('../src/data/examples.ts', import.meta.url), 'utf8'),
    readdir(new URL('../src/examples/', import.meta.url)),
  ])
  const ids = Array.from(registry.matchAll(/id: '([^']+)'/g), match => match[1])
  assert.ok(ids.length > 0)
  assert.equal(new Set(ids).size, ids.length)
  assert.deepEqual(ids.filter(id => !files.includes(`${id}.vue`)), [])
  assert.deepEqual(files.filter(name => name.endsWith('.vue') && !ids.includes(name.slice(0, -4))), [])
})

test('site uses isolated platform previews and provider theme', async () => {
  const [app, desktop, mobile, styles, metadata] = await Promise.all([
    readFile(new URL('../src/App.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/preview-desktop.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/preview-mobile.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/style.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/data/metadata.ts', import.meta.url), 'utf8'),
  ])
  assert.match(app, /<FnProvider[^>]*:theme="theme"/)
  assert.match(desktop, /tdesign-vue-next\/dist\/tdesign\.css/)
  assert.doesNotMatch(desktop, /tdesign-mobile-vue\/dist/)
  assert.match(mobile, /tdesign-mobile-vue\/dist\/tdesign\.css/)
  assert.doesNotMatch(mobile, /tdesign-vue-next\/dist/)
  assert.doesNotMatch(metadata, /packages\/fnui/)
  assert.doesNotMatch(styles, /tailwindcss\/preflight/)
  assert.doesNotMatch(styles, /\.fn-(?:input|textarea|progress)/)
  assert.match(styles, /@layer base\s*\{[\s\S]*a\s*\{\s*color:\s*inherit/)
})

test('component details render one preview per documented usage', async () => {
  const [detail, preview] = await Promise.all([
    readFile(new URL('../src/components/ComponentDetail.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ExamplePreview.vue', import.meta.url), 'utf8'),
  ])
  assert.match(detail, /v-for="example in examples"/)
  assert.match(detail, /:name="example\.id"/)
  assert.match(detail, /:source="example\.source"/)
  assert.match(preview, /@naspk\/fnui\/\$\{platform\.value\}/)
  assert.match(preview, /writeText\(displayedSource\.value\)/)
})

test('application templates have a separate desktop preview page', async () => {
  const [app, home, docs, sidebar, templates] = await Promise.all([
    readFile(new URL('../src/App.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/HomePage.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/DocsPage.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/DocsSidebar.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/TemplatesPage.vue', import.meta.url), 'utf8'),
  ])
  assert.match(app, /<TemplatesPage v-else-if="isTemplates"/)
  assert.match(app, /<header v-if="!isTemplates"/)
  assert.doesNotMatch(home, /preview-\$\{platform\.value\}/)
  assert.doesNotMatch(docs, /isTemplate/)
  assert.doesNotMatch(sidebar, /templates\/file-manager/)
  assert.match(templates, /preview-desktop\.html/)
  assert.match(templates, /模拟环境/)
  assert.match(templates, /文件管理应用模板/)
  assert.match(templates, /tw:h-\[100dvh\]/)
  assert.match(templates, /还原文件管理/)
  assert.match(templates, /返回文档/)
})
