import type {
  CodeStat,
  DailyCount,
  KpiData,
  LogRecord,
  MethodStat,
} from '../types/dashboard'
import { METHOD_ORDER } from '../constants'

const pct = (n: number, total: number) => (total ? (n / total) * 100 : 0)

export function computeKpis(logs: LogRecord[], dayCount: number): KpiData {
  const total = logs.length
  const errorCount = logs.filter((l) => Number(l.status_code) >= 400).length
  const sumMs = logs.reduce((acc, l) => acc + l.response_time_ms, 0)

  return {
    totalRequests: total,
    requestsPerDay: dayCount ? Math.round((total / dayCount) * 10) / 10 : 0,
    errorRate: pct(errorCount, total),
    errorCount,
    avgResponseMs: total ? Math.round(sumMs / total) : 0,
  }
}

// Lista de días YYYY-MM-DD entre start y end (inclusive).
export function daysBetween(start: string, end: string): string[] {
  const days: string[] = []
  const d = new Date(`${start}T00:00:00Z`)
  const last = new Date(`${end}T00:00:00Z`)
  while (d <= last) {
    days.push(d.toISOString().slice(0, 10))
    d.setUTCDate(d.getUTCDate() + 1)
  }
  return days
}

// Agrupar por día -> [{ date, count }], con 0 en los días sin solicitudes.
export function buildDailyCounts(logs: LogRecord[], days: string[]): DailyCount[] {
  const counts = new Map<string, number>(days.map((d) => [d, 0]))
  for (const l of logs) {
    const day = l.timestamp.slice(0, 10)
    if (counts.has(day)) counts.set(day, (counts.get(day) ?? 0) + 1)
  }
  return days.map((date) => ({ date, count: counts.get(date) ?? 0 }))
}

// Promedio de response_time_ms por día (solo días con solicitudes), para la minigráfica del KPI.
export function buildDailyAvgResponse(logs: LogRecord[], days: string[]): number[] {
  const sum = new Map<string, { total: number; n: number }>()
  for (const l of logs) {
    const day = l.timestamp.slice(0, 10)
    const s = sum.get(day) ?? { total: 0, n: 0 }
    s.total += l.response_time_ms
    s.n += 1
    sum.set(day, s)
  }
  return days.filter((d) => sum.has(d)).map((d) => {
    const s = sum.get(d)!
    return s.total / s.n
  })
}

// Contar por status_code -> [{ code, count, percentage }], ordenado por código.
export function buildCodeStats(logs: LogRecord[]): CodeStat[] {
  const counts = new Map<string, number>()
  for (const l of logs) counts.set(l.status_code, (counts.get(l.status_code) ?? 0) + 1)
  return [...counts.entries()]
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([code, count]) => ({ code, count, percentage: pct(count, logs.length) }))
}

// Contar por method -> [{ method, count, percentage }], en orden fijo y sin métodos vacíos.
export function buildMethodStats(logs: LogRecord[]): MethodStat[] {
  const counts = new Map<string, number>()
  for (const l of logs) counts.set(l.method, (counts.get(l.method) ?? 0) + 1)
  return METHOD_ORDER.filter((m) => counts.has(m)).map((method) => {
    const count = counts.get(method) ?? 0
    return { method, count, percentage: pct(count, logs.length) }
  })
}
