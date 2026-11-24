import { useId } from 'react'
import Box from '@mui/material/Box'
import { tk } from '../../theme'

interface SparklineProps {
  values: number[]
  height?: number
  label: string
}

// Línea mínima dentro de un KPI: sin ejes ni rejilla, un solo color y un relleno que se desvanece.
export default function Sparkline({ values, height = 40, label }: SparklineProps) {
  const gradientId = useId()
  if (values.length < 2) return null

  const W = 100
  const max = Math.max(1, ...values)
  const step = W / (values.length - 1)
  const pts = values.map((v, i) => [i * step, height - 2 - (v / max) * (height - 6)] as const)
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  const area = `${line} L${W},${height} L0,${height} Z`

  return (
    <Box
      component="svg"
      role="img"
      aria-label={label}
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      // Al pasar el cursor por la tarjeta, toda la minigráfica se revela de izquierda a derecha (tokens.css)
      className="spark"
      sx={{ display: 'block', width: '100%', height, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-cool)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-cool)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke={tk.cool}
        strokeWidth={1.75}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </Box>
  )
}
