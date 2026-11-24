// Datos (access_logs.json)
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Un registro del JSON. server_id y status_code son texto
export interface LogRecord {
  timestamp: string // ISO 8601: 2024-01-01T00:15:12
  server_id: string // '1' , '2' , '3'
  method: HttpMethod
  path: string
  status_code: string // '200', '404', etc.
  user_agent: string
  ip_address: string
  referrer: string
  response_time_ms: number
  bytes_sent: number
}

// Filtros
export type DateRangeKey = 'all' | 'january' | 'february'

export interface Filters {
  dateRange: DateRangeKey
  serverId: string // 'all' , '1' , '2' , '3'
}

export interface SelectOption {
  value: string
  label: string
}

// KPI
export type KpiVariant = 'default' | 'error'

export interface KpiData {
  totalRequests: number
  requestsPerDay: number
  errorRate: number // porcentaje 0-100
  errorCount: number
  avgResponseMs: number
}

// Datos para Graficos
export interface DailyCount {
  date: string // YYYY-MM-DD
  count: number
}

export interface CodeStat {
  code: string
  count: number
  percentage: number
}

export interface MethodStat {
  method: HttpMethod
  count: number
  percentage: number
}

// Tabla
export type LogColumnKey =
  | 'timestamp'
  | 'server_id'
  | 'method'
  | 'path'
  | 'status_code'
  | 'response_time_ms'

export interface LogColumn {
  key: LogColumnKey
  label: string
  align?: 'left' | 'right'
}
