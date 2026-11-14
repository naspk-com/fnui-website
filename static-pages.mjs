import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

export function staticPagePaths(catalog) {
  const routes = [
    'guide',
    'components',
    'templates',
    'templates/file-manager',
    ...catalog.map(({ slug }) => {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(`Invalid component slug: ${slug}`)
      }
      return `components/${slug}`
    }),
  ]
  if (new Set(routes).size !== routes.length) {
    throw new Error('Duplicate static page route')
  }
  return routes.map(route => `${route}/index.html`)
}

export function staticPages(catalog) {
  return {
    name: 'fnui-static-pages',
    apply: 'build',
    async writeBundle(options, bundle) {
      const entry = bundle['index.html']
      if (!options.dir || !entry || entry.type !== 'asset' || typeof entry.source !== 'string') {
        throw new Error('Cannot generate static pages without the built index.html')
      }
      await Promise.all(staticPagePaths(catalog).map(async path => {
        const target = join(options.dir, path)
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, entry.source)
      }))
    },
  }
}
