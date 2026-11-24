import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import DashboardLayout from '../components/layout/DashboardLayout'
import DashboardHeader from '../components/layout/DashboardHeader'
import FilterBar from '../components/filters/FilterBar'
import KpiCard from '../components/common/KpiCard'
import SectionCard from '../components/common/SectionCard'
import RequestsLineChart from '../components/charts/RequestsLineChart'
import StatusCodeBars from '../components/charts/StatusCodeBars'
import MethodsDonut from '../components/charts/MethodsDonut'
import Sparkline from '../components/charts/Sparkline'
import CellMeter from '../components/charts/CellMeter'
import RequestsLogSection from '../components/logs/RequestsLogSection'

import useFetchLogs from '../hooks/useFetchLogs'
import { DATE_RANGE_BOUNDS, DEFAULT_FILTERS, ERROR_RATE_ALERT, PAGE_SIZE } from '../constants'
import { filterLogs } from '../utils/filterLogs'
import {
  buildCodeStats,
  buildDailyAvgResponse,
  buildDailyCounts,
  buildMethodStats,
  computeKpis,
  daysBetween,
} from '../utils/metrics'
import { formatDecimal, formatNumber, formatPercent } from '../utils/format'
import type { Filters } from '../types/dashboard'

export default function DashboardPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) // < 768px

  // useState, el estado de los filtros vive aquí y se comparte con los hijos por props.
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  // Datos derivados, se recalculan cuando cambian los filtros.
  const days = useMemo(() => {
    const { start, end } = DATE_RANGE_BOUNDS[filters.dateRange]
    return daysBetween(start, end)
  }, [filters.dateRange])
  const { logs: allLogs, loading, error } = useFetchLogs('access_logs')
  const logs = useMemo(() => filterLogs(allLogs, filters), [allLogs, filters])
  const kpis = useMemo(() => computeKpis(logs, days.length), [logs, days.length])
  const dailyCounts = useMemo(() => buildDailyCounts(logs, days), [logs, days])
  const dailyAvgResponse = useMemo(() => buildDailyAvgResponse(logs, days), [logs, days])
  const codeStats = useMemo(() => buildCodeStats(logs), [logs])
  const methodStats = useMemo(() => buildMethodStats(logs), [logs])

  const errorAlert = kpis.errorRate > ERROR_RATE_ALERT

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert severity="error">No se pudieron cargar los datos: {error}</Alert>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Stack spacing={{ xs: 2.5, md: 3 }}>
        <Box className="enter" style={{ ['--i' as string]: 0 }}>
        <DashboardHeader
          title="Monitoreo de servidores web"
          subtitle="Registros de acceso HTTP de una empresa SaaS con 3 servidores"
          dataInfo={`01/01/2024 – 06/02/2024, ${formatNumber(allLogs.length)} registros`}
        />
        </Box>

        <Box className="enter" style={{ ['--i' as string]: 1 }}>
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </Box>

        {/* KPI: 3 en una fila (escritorio) / 2 + 1 (móvil) */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 4 }} className="enter" style={{ ['--i' as string]: 2 }}>
            <KpiCard
              title="Solicitudes"
              value={formatNumber(kpis.totalRequests)}
              subtitle={`${formatDecimal(kpis.requestsPerDay)} por día en promedio`}
              visual={
                <Sparkline
                  values={dailyCounts.map((d) => d.count)}
                  label="Tendencia de solicitudes por día"
                />
              }
            />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }} className="enter" style={{ ['--i' as string]: 3 }}>
            <KpiCard
              title="Tasa de errores"
              value={formatPercent(kpis.errorRate)}
              subtitle={`${formatNumber(kpis.errorCount)} con código 4xx o 5xx`}
              variant={errorAlert ? 'error' : 'default'}
              alertLabel={`Sobre ${ERROR_RATE_ALERT} %`}
              visual={
                <CellMeter
                  value={kpis.errorRate}
                  threshold={ERROR_RATE_ALERT}
                  alert={errorAlert}
                  label={`Tasa de errores ${formatPercent(kpis.errorRate)}, umbral ${ERROR_RATE_ALERT} %`}
                />
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} className="enter" style={{ ['--i' as string]: 4 }}>
            <KpiCard
              title="Tiempo de respuesta"
              value={formatNumber(kpis.avgResponseMs)}
              unit="ms"
              subtitle="Promedio de todas las solicitudes"
              visual={
                <Sparkline values={dailyAvgResponse} label="Tiempo de respuesta promedio por día" />
              }
            />
          </Grid>
        </Grid>

        {/* Gráficos */}
        <Box className="enter" style={{ ['--i' as string]: 5 }}>
        <SectionCard
          title="Solicitudes por día"
          subtitle="Cantidad de solicitudes recibidas cada día"
          action={
            // Leyenda de la línea de promedio del gráfico
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', pt: 0.5, flexShrink: 0 }}>
              <svg width="18" height="2" aria-hidden>
                <line x1="0" y1="1" x2="18" y2="1" stroke="var(--color-ink)" strokeOpacity="0.55" strokeDasharray="2 3" />
              </svg>
              <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                Promedio {formatDecimal(kpis.requestsPerDay)} por día
              </Typography>
            </Stack>
          }
        >
          <RequestsLineChart data={dailyCounts} isMobile={isMobile} />
        </SectionCard>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }} className="enter" style={{ ['--i' as string]: 6 }}>
            <SectionCard title="Códigos de estado HTTP" subtitle="Solicitudes por código de respuesta">
              <StatusCodeBars items={codeStats} />
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} className="enter" style={{ ['--i' as string]: 7 }}>
            <SectionCard title="Métodos HTTP" subtitle="Proporción de solicitudes por método">
              <MethodsDonut items={methodStats} />
            </SectionCard>
          </Grid>
        </Grid>

        {/* Tabla */}
        <Box className="enter" style={{ ['--i' as string]: 8 }}>
        <SectionCard
          title="Registro de solicitudes"
          subtitle="Más recientes primero"
          action={
            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', pt: 0.5 }}>
              {formatNumber(logs.length)} resultados
            </Typography>
          }
        >
          <RequestsLogSection
            key={`${filters.dateRange}-${filters.serverId}`}
            logs={logs}
            pageSize={PAGE_SIZE}
            isMobile={isMobile}
          />
        </SectionCard>
        </Box>
      </Stack>
    </DashboardLayout>
  )
}
