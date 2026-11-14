import { strict as assert } from 'node:assert'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { transform } from 'esbuild'
import { staticPagePaths, staticPages } from '../static-pages.mjs'

async function importTypeScript(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8')
  const { code } = await transform(source, { loader: 'ts', format: 'esm' })
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
}

test('static pages cover every catalog entry and preserve preview files', async () => {
  const { catalog } = await importTypeScript('../src/data/catalog.ts')
  const paths = staticPagePaths(catalog)
  assert.equal(paths.length, catalog.length + 4)
  for (const path of ['guide/index.html', 'components/index.html', 'templates/index.html', 'templates/file-manager/index.html']) {
    assert.ok(paths.includes(path), path)
  }
  for (const { slug } of catalog) {
    assert.ok(paths.includes(`components/${slug}/index.html`), slug)
  }
  assert.throws(() => staticPagePaths([{ slug: '../assets' }]), /Invalid component slug/)
  assert.throws(() => staticPagePaths([{ slug: 'button' }, { slug: 'button' }]), /Duplicate/)

  const dir = await mkdtemp(join(tmpdir(), 'fnui-static-pages-'))
  try {
    const html = '<html><script type="module" src="/assets/app.js"></script></html>'
    await writeFile(join(dir, 'preview-desktop.html'), 'desktop preview')
    await writeFile(join(dir, 'preview-mobile.html'), 'mobile preview')
    await staticPages(catalog).writeBundle({ dir }, { 'index.html': { type: 'asset', source: html } })
    for (const path of paths) assert.equal(await readFile(join(dir, path), 'utf8'), html, path)
    assert.equal(await readFile(join(dir, 'preview-desktop.html'), 'utf8'), 'desktop preview')
    assert.equal(await readFile(join(dir, 'preview-mobile.html'), 'utf8'), 'mobile preview')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('static page URLs normalize consistently for root and subpath deployments', async () => {
  const { normalizeRoutePath } = await importTypeScript('../src/route-path.ts')
  for (const path of ['/components/button', '/components/button/', '/components/button/index.html']) {
    assert.equal(normalizeRoutePath(path, ''), '/components/button')
    assert.equal(normalizeRoutePath(`/fnui${path}`, '/fnui'), '/components/button')
  }
  assert.equal(normalizeRoutePath('/index.html', ''), '/')
  assert.equal(normalizeRoutePath('/fnui/index.html', '/fnui'), '/')
  assert.equal(normalizeRoutePath('/fnui-other/guide', '/fnui'), '/fnui-other/guide')
})
