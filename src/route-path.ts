export function normalizeRoutePath(pathname: string, base: string): string {
  const path = base && (pathname === base || pathname.startsWith(`${base}/`))
    ? pathname.slice(base.length)
    : pathname
  return path.replace(/\/index\.html\/?$/, '').replace(/\/+$/, '') || '/'
}
