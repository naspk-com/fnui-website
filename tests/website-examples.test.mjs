import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { readFile, readdir } from 'node:fs/promises'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { transform } from 'esbuild'

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

test('quick start describes published packages and both supported platform entries', async () => {
  const [guide, library, theme] = await Promise.all([
    readFile(new URL('../src/pages/GuidePage.vue', import.meta.url), 'utf8'),
    readFile(new URL('../node_modules/@naspk/fnui/package.json', import.meta.url), 'utf8').then(JSON.parse),
    readFile(new URL('../node_modules/@naspk/fnui-theme/package.json', import.meta.url), 'utf8').then(JSON.parse),
  ])
  assert.doesNotMatch(guide, /尚未发布/)
  assert.match(guide, /不建议用于生产环境/)
  for (const platform of ['desktop', 'mobile']) {
    assert.ok(library.exports[`./${platform}`])
    assert.ok(theme.exports[`./${platform}.css`])
    assert.ok(guide.includes(`@naspk/fnui/${platform}`))
    assert.ok(guide.includes(`@naspk/fnui-theme/${platform}.css`))
  }
  for (const packageName of ['tdesign-vue-next', 'tdesign-mobile-vue']) {
    assert.ok(guide.includes(`${packageName}@${library.peerDependencies[packageName]}`))
    assert.ok(guide.includes(`${packageName}/dist/tdesign.css`))
  }
  assert.match(guide, /import \{ FnProvider, FnButton \} from '@naspk\/fnui\/desktop'/)
  assert.match(guide, /createApp\(App\)\.mount\('#app'\)/)
})

test('home showcases NAS workflows with local-only interaction', async () => {
  const [home, showcase] = await Promise.all([
    readFile(new URL('../src/pages/HomePage.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ShowcaseWall.vue', import.meta.url), 'utf8'),
  ])
  assert.match(home, /模拟数据/)
  for (const scene of ['存储池健康', '传输任务', '同步计划', '共享访问', '文件服务', '回收站']) {
    assert.ok(showcase.includes(scene), scene)
  }
  assert.match(showcase, /transferPaused = !transferPaused/)
  assert.match(showcase, /v-model="syncFolders"/)
  assert.match(showcase, /v-model="sharePermission"/)
  assert.match(showcase, /v-model="fileService"/)
  assert.match(showcase, /:disabled="!recycleSelected"/)
})

test('home footer links to the project domain, packages and repositories', async () => {
  const home = await readFile(new URL('../src/pages/HomePage.vue', import.meta.url), 'utf8')
  const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]
  assert.ok(footer)
  for (const url of [
    'https://fnui.design',
    'https://www.npmjs.com/package/@naspk/fnui',
    'https://www.npmjs.com/package/@naspk/fnui-theme',
    'https://github.com/naspk-com/fnUI',
    'https://github.com/naspk-com/fnui-theme',
  ]) assert.ok(footer.includes(`href="${url}"`), url)
  assert.match(footer, /不建议用于生产环境/)
  assert.match(footer, /欢迎反馈、参与讨论和贡献代码/)
})

test('site accent previews apply distinct accessible colors and reach isolated previews', async () => {
  const [source, home, app, preview, template, entry, desktop, mobile, css] = await Promise.all(
    ['data/accents.ts', 'pages/HomePage.vue', 'App.vue', 'preview.ts', 'pages/TemplatesPage.vue',
      'components/ExamplePreview.vue', 'preview-desktop.ts', 'preview-mobile.ts', 'theme-accents.css']
      .map(path => readFile(new URL(`../src/${path}`, import.meta.url), 'utf8')),
  )
  const { code } = await transform(source, { loader: 'ts', format: 'esm' })
  const { accents, applyAccent, resolveAccent } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
  assert.equal(accents.length, 6)
  assert.equal(new Set(accents.map(item => item.color)).size, accents.length)
  const variables = new Map()
  const previousDocument = globalThis.document
  globalThis.document = { documentElement: { style: { setProperty: (key, value) => variables.set(key, value) } } }
  try {
    for (const accent of accents) {
      applyAccent(accent.value)
      assert.equal(variables.get('--site-accent'), accent.color)
      const channels = accent.color.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255)
        .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
      const luminance = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
      assert.ok(1.05 / (luminance + 0.05) >= 4.5, accent.label)
    }
  } finally {
    if (previousDocument === undefined) delete globalThis.document
    else globalThis.document = previousDocument
  }
  assert.equal(resolveAccent('invalid'), 'blue')
  assert.match(home, /颜色仅用于站点体验/)
  assert.match(app, /watch\(accent, applyAccent/)
  assert.match(entry, /accent: props\.accent/)
  assert.match(template, /accent: props\.accent/)
  assert.match(preview, /applyAccent\(resolveAccent\(params\.get\('accent'\)\)\)/)
  assert.match(desktop, /theme-accents\.css/)
  assert.match(mobile, /theme-accents\.css/)
  assert.match(css, /--fn-primary:\s*var\(--site-accent/)
})

test('site uses isolated platform previews and provider theme', async () => {
  const [app, main, desktop, mobile, styles, metadata] = await Promise.all([
    readFile(new URL('../src/App.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/main.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/preview-desktop.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/preview-mobile.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/style.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/data/metadata.ts', import.meta.url), 'utf8'),
  ])
  assert.match(app, /<FnProvider[^>]*:theme="theme"/)
  assert.match(main, /tdesign-vue-next\/dist\/tdesign\.css/)
  assert.ok(main.indexOf('tdesign-vue-next/dist/tdesign.css') < main.indexOf('@naspk/fnui-theme/desktop.css'))
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

test('preview controls group exclusive choices and size the canvas per example', async () => {
  const [preview, styles] = await Promise.all([
    readFile(new URL('../src/components/ExamplePreview.vue', import.meta.url), 'utf8'),
    readFile(new URL('../src/style.css', import.meta.url), 'utf8'),
  ])
  assert.match(preview, /<FnSegmented[^>]+label="预览平台"/)
  assert.match(preview, /<FnSegmented[^>]+label="预览宽度"/)
  assert.match(preview, /height: frameHeight/)
  assert.match(preview, /platform\.value === 'desktop' && props\.name\.startsWith\('layout-'\)/)
  assert.match(preview, /\.layout-preview__frame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/s)
  assert.match(styles, /\.site-shell \.t-button\.fn-button::after\s*\{\s*content:\s*none/)
})

test('desktop layout previews fill the viewport without wrapper padding', async () => {
  const preview = await readFile(new URL('../src/preview.ts', import.meta.url), 'utf8')
  assert.match(preview, /platform === 'desktop' && name\.startsWith\('layout-'\)/)
  assert.match(preview, /fullBleed = .*desktopLayout/)
  assert.match(preview, /padding: fullBleed \|\| platform === 'mobile' \? '0'/)
  assert.match(preview, /h\(Example, desktopLayout \? \{ style: \{ height: '100%' \} \}/)
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
