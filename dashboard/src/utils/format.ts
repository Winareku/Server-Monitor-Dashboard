const nf = new Intl.NumberFormat('es-EC')
const nf1 = new Intl.NumberFormat('es-EC', { maximumFractionDigits: 1 })

export const formatNumber = (n: number) => nf.format(n)

export const formatDecimal = (n: number) => nf1.format(n)

export const formatPercent = (n: number) => `${n.toFixed(1).replace('.', ',')} %`

// 2024-01-01T00:15:12 -> 01/01/2024 00:15:12
export function formatDateTime(iso: string): string {
  const [date, time] = iso.split('T')
  const [y, m, d] = date.split('-')
  return `${d}/${m}/${y} ${time}`
}

// 2024-01-01T00:15:12 -> 01/01 00:15 (formato corto para móvil)
export function formatDateTimeShort(iso: string): string {
  const [date, time] = iso.split('T')
  const [, m, d] = date.split('-')
  return `${d}/${m} ${time.slice(0, 5)}`
}

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

// 2024-01-05 -> 5 ene
export function formatDayShort(ymd: string): string {
  const [, m, d] = ymd.split('-')
  return `${Number(d)} ${MONTHS[Number(m) - 1]}`
}
