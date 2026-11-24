import { LineChart, lineClasses } from '@mui/x-charts/LineChart'
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine'
import EmptyState from '../common/EmptyState'
import { formatDayShort, formatNumber } from '../../utils/format'
import { hex } from '../../theme'
import type { DailyCount } from '../../types/dashboard'

interface RequestsLineChartProps {
  data: DailyCount[]
  isMobile?: boolean
}

const HEIGHT = 280

export default function RequestsLineChart({ data, isMobile = false }: RequestsLineChartProps) {
  const total = data.reduce((acc, d) => acc + d.count, 0)
  if (total === 0) return <EmptyState height={HEIGHT} />

  const avg = total / data.length
  // Muestra pocas etiquetas en el eje X para que no se encimen.
  const every = Math.max(1, Math.ceil(data.length / (isMobile ? 4 : 8)))

  return (
    <LineChart
      height={HEIGHT}
      margin={{ left: 0, right: 12, top: 16, bottom: 0 }}
      grid={{ horizontal: true }}
      hideLegend
      axisHighlight={{ x: 'line' }}
      xAxis={[
        {
          scaleType: 'point',
          data: data.map((d) => d.date),
          valueFormatter: (v: string) => formatDayShort(v),
          tickLabelInterval: (_v, i) => i % every === 0,
          disableTicks: true,
        },
      ]}
      yAxis={[{ tickMinStep: 1, width: 36, disableLine: true, disableTicks: true }]}
      series={[
        {
          data: data.map((d) => d.count),
          label: 'Solicitudes',
          color: hex.cool,
          area: true,
          showMark: false,
          curve: 'linear',
          valueFormatter: (v) => (v == null ? '' : `${formatNumber(v)} solicitudes`),
        },
      ]}
      sx={{
        [`& .${lineClasses.area}`]: { fill: hex.cool, fillOpacity: 0.14 },
        [`& .${lineClasses.line}`]: { strokeWidth: 2 },
        '& .MuiChartsGrid-line': { stroke: hex.rule, strokeDasharray: 'none' },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: hex.rule2 },
        '& .MuiChartsAxis-tickLabel': {
          fill: hex.muted,
          fontSize: 12,
          fontFamily: '"Atkinson Hyperlegible Mono", ui-monospace, monospace',
        },
        '& .MuiChartsAxisHighlight-root': { stroke: hex.ink, strokeDasharray: 'none', strokeOpacity: 0.35 },
      }}
    >
      {/* Promedio diario como línea de referencia (su leyenda va en la cabecera de la tarjeta) */}
      <ChartsReferenceLine
        y={avg}
        lineStyle={{ stroke: hex.ink, strokeOpacity: 0.55, strokeWidth: 1, strokeDasharray: '2 3' }}
      />
    </LineChart>
  )
}
