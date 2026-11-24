import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { PieChart } from '@mui/x-charts/PieChart'
import EmptyState from '../common/EmptyState'
import { METHOD_COLORS } from '../../constants'
import { formatNumber, formatPercent } from '../../utils/format'
import { tk } from '../../theme'
import type { MethodStat } from '../../types/dashboard'

interface MethodsDonutProps {
  items: MethodStat[]
}

const SIZE = 184

// Versión más clara del color de un método para usarlo en texto sobre el fondo oscuro (contraste legible).
const textTint = (color: string) => `color-mix(in oklab, ${color} 72%, white)`
const SERIES_ID = 'methods'

// Dona enlazada con su leyenda: pasar por un segmento o por una fila resalta ambos
// y el centro muestra el valor de ese método.
export default function MethodsDonut({ items }: MethodsDonutProps) {
  const [active, setActive] = useState<number | null>(null)
  if (items.length === 0) return <EmptyState />

  const total = items.reduce((acc, i) => acc + i.count, 0)
  const current = active != null ? items[active] : null

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
      spacing={3}
      sx={{ alignItems: 'center' }}
    >
      <Box sx={{ position: 'relative', width: SIZE, height: SIZE, flexShrink: 0 }}>
        <PieChart
          width={SIZE}
          height={SIZE}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          hideLegend
          slots={{ tooltip: () => null }}
          highlightedItem={active != null ? { seriesId: SERIES_ID, dataIndex: active } : null}
          onHighlightChange={(item) =>
            setActive(item && 'dataIndex' in item && item.dataIndex != null ? item.dataIndex : null)
          }
          series={[
            {
              id: SERIES_ID,
              data: items.map((i) => ({
                id: i.method,
                value: i.count,
                label: i.method,
                color: METHOD_COLORS[i.method],
              })),
              innerRadius: 62,
              outerRadius: 88,
              paddingAngle: 1.2,
              cornerRadius: 2,
              highlightScope: { highlight: 'item', fade: 'global' },
              highlighted: { additionalRadius: 4 },
              faded: { additionalRadius: -2, color: 'var(--color-rule)' },
            },
          ]}
        />
        {/* Centro: total, o el método activo */}
        <Box
          aria-live="polite"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* El valor del centro cambia con motion blur vertical */}
          <Typography
            key={current ? current.method : 'total'}
            sx={{
              fontFamily: tk.fontMono,
              fontSize: '1.625rem',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums slashed-zero',
              // Total en tinta; al resaltar un método, su porcentaje toma el color de ese método
              color: current ? textTint(METHOD_COLORS[current.method]) : tk.ink,
              animation: `value-in ${tk.durShort} ${tk.ease} backwards`,
            }}
          >
            {current ? formatPercent(current.percentage) : formatNumber(total)}
          </Typography>
          <Typography
            key={current ? `${current.method}-l` : 'total-l'}
            variant="caption"
            sx={{
              color: current ? textTint(METHOD_COLORS[current.method]) : tk.muted,
              mt: 0.5,
              fontFamily: current ? tk.fontMono : undefined,
              animation: `value-in ${tk.durShort} ${tk.ease} 40ms backwards`,
            }}
          >
            {current ? current.method : 'solicitudes'}
          </Typography>
        </Box>
      </Box>

      {/* Leyenda con valores: identifica cada método sin depender del color */}
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, width: '100%' }}>
        {items.map((i, idx) => {
          const isActive = active === idx
          const isFaded = active != null && !isActive
          const color = METHOD_COLORS[i.method]
          return (
            <Box
              component="li"
              key={i.method}
              tabIndex={0}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(idx)}
              onBlur={() => setActive(null)}
              sx={{
                display: 'grid',
                gridTemplateColumns: '10px minmax(0, 1fr) auto 60px',
                alignItems: 'center',
                columnGap: 1.25,
                py: 1,
                px: 1,
                mx: -1,
                borderRadius: 1,
                cursor: 'default',
                fontVariantNumeric: 'tabular-nums',
                opacity: isFaded ? 0.45 : 1,
                // Fila activa: fondo teñido y barra lateral con el color de su método
                bgcolor: isActive ? `color-mix(in oklab, ${color} 16%, transparent)` : 'transparent',
                boxShadow: isActive ? `inset 3px 0 0 ${color}` : `inset 0 0 0 ${color}`,
                transition: `opacity ${tk.durShort} ${tk.ease}, background-color ${tk.durShort} ${tk.ease}, box-shadow ${tk.durShort} ${tk.ease}`,
                '& + &': { borderTop: `1px solid ${tk.rule}` },
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '2px',
                  bgcolor: color,
                  transform: isActive ? 'scale(1.3)' : 'none',
                  boxShadow: isActive ? `0 0 0 3px color-mix(in oklab, ${color} 30%, transparent)` : 'none',
                  transition: `transform ${tk.durShort} ${tk.ease}, box-shadow ${tk.durShort} ${tk.ease}`,
                }}
              />
              <Box component="span" sx={{ fontFamily: tk.fontMono, fontSize: '0.8125rem', fontWeight: 500, color: tk.ink }}>
                {i.method}
              </Box>
              <Box component="span" sx={{ fontSize: '0.8125rem', color: tk.muted }}>
                {formatNumber(i.count)}
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: tk.fontDisplay,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isActive ? textTint(color) : tk.ink,
                  textAlign: 'right',
                  transition: `color ${tk.durShort} ${tk.ease}`,
                }}
              >
                {formatPercent(i.percentage)}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Stack>
  )
}
