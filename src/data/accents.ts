export const accents = [
  { value: 'blue', label: '经典蓝', color: '#0066ff', hover: '#0056d6', active: '#0043b8', light: 'rgba(0, 102, 255, .12)' },
  { value: 'violet', label: '紫罗兰', color: '#7044c8', hover: '#5e36af', active: '#4f2996', light: 'rgba(112, 68, 200, .12)' },
  { value: 'teal', label: '海青', color: '#007b83', hover: '#00666d', active: '#00565c', light: 'rgba(0, 123, 131, .12)' },
  { value: 'green', label: '森林绿', color: '#087b50', hover: '#066943', active: '#045638', light: 'rgba(8, 123, 80, .12)' },
  { value: 'orange', label: '琥珀橙', color: '#b74d09', hover: '#9b4008', active: '#803506', light: 'rgba(183, 77, 9, .12)' },
  { value: 'rose', label: '玫瑰红', color: '#b7305e', hover: '#9e2750', active: '#842041', light: 'rgba(183, 48, 94, .12)' },
] as const

export type Accent = typeof accents[number]['value']

export function resolveAccent(value: string | null | undefined): Accent {
  return accents.find(item => item.value === value)?.value ?? 'blue'
}

export function applyAccent(value: Accent) {
  const accent = accents.find(item => item.value === value) ?? accents[0]
  const style = document.documentElement.style
  style.setProperty('--site-accent', accent.color)
  style.setProperty('--site-accent-hover', accent.hover)
  style.setProperty('--site-accent-active', accent.active)
  style.setProperty('--site-accent-light', accent.light)
}
