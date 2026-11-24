import type { DateRangeKey, Filters, HttpMethod, LogColumn, SelectOption } from './types/dashboard'

export const DATE_RANGE_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'Todo el periodo' },
  { value: 'january', label: 'Enero 2024' },
  { value: 'february', label: 'Febrero 2024' },
]

// Días que cubre cada rango (inclusive). Se usan para rellenar con 0 los días sin solicitudes.
export const DATE_RANGE_BOUNDS: Record<DateRangeKey, { start: string; end: string }> = {
  all: { start: '2024-01-01', end: '2024-02-06' },
  january: { start: '2024-01-01', end: '2024-01-31' },
  february: { start: '2024-02-01', end: '2024-02-06' },
}

export const SERVER_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'Todos los servidores' },
  { value: '1', label: 'Servidor 1' },
  { value: '2', label: 'Servidor 2' },
  { value: '3', label: 'Servidor 3' },
]

export const DEFAULT_FILTERS: Filters = { dateRange: 'all', serverId: 'all' }

export const PAGE_SIZE = 10

// Tasa de errores a partir de la cual el KPI se marca en rojo (porcentaje).
export const ERROR_RATE_ALERT = 5

// Orden y color fijos por método: el color sigue al método, nunca a su posición.
export const METHOD_ORDER: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

// Paleta categórica (validada con el validador de dataviz sobre el fondo #15191C:
// separación para daltonismo, separación normal y contraste >= 3:1). Un color distinto por método.
export const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: '#3987E5',
  POST: '#D95926',
  PUT: '#199E70',
  PATCH: '#C98500',
  DELETE: '#D55181',
}

export const COLUMNS_DESKTOP: LogColumn[] = [
  { key: 'timestamp', label: 'Fecha y hora' },
  { key: 'server_id', label: 'Servidor' },
  { key: 'method', label: 'Método' },
  { key: 'path', label: 'Ruta' },
  { key: 'status_code', label: 'Código' },
  { key: 'response_time_ms', label: 'Tiempo', align: 'right' },
]

export const COLUMNS_MOBILE: LogColumn[] = [
  { key: 'timestamp', label: 'Fecha' },
  { key: 'method', label: 'Método' },
  { key: 'status_code', label: 'Código' },
  { key: 'response_time_ms', label: 'Tiempo', align: 'right' },
]
