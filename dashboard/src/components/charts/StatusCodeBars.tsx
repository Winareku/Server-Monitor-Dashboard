import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import EmptyState from '../common/EmptyState'
import { FamilyIcon } from '../common/StatusBadge'
import { formatNumber, formatPercent } from '../../utils/format'
import { statusFamily, statusFamilyOf, tk } from '../../theme'
import type { CodeStat } from '../../types/dashboard'

interface StatusCodeBarsProps {
  items: CodeStat[]
}

// Barras horizontales en HTML: cada código lleva su número, su cantidad y su porcentaje escritos,
// y el ícono de su familia; el color nunca es la única pista.
export default function StatusCodeBars({ items }: StatusCodeBarsProps) {
  if (items.length === 0) return <EmptyState />

  const max = Math.max(...items.map((i) => i.count))
  const families = [...new Set(items.map((i) => statusFamilyOf(Number(i.code))))]

  return (
    <Stack spacing={2.5}>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {items.map((item, idx) => {
          const key = statusFamilyOf(Number(item.code))
          const family = statusFamily[key]
          return (
            <Box
              component="li"
              key={item.code}
              title={`${item.code}, ${family.label}: ${formatNumber(item.count)} solicitudes`}
              sx={{
                display: 'grid',
                gridTemplateColumns: '20px 36px minmax(0, 1fr) 40px 56px',
                alignItems: 'center',
                columnGap: 1.25,
                py: 0.875,
                px: 1,
                mx: -1,
                borderRadius: 1,
                transition: `background-color ${tk.durShort} ${tk.ease}`,
                '&:hover': { bgcolor: tk.paper4 },
                '&:hover .bar': { filter: 'brightness(1.18)' },
              }}
            >
              <FamilyIcon family={key} />
              <Typography
                component="span"
                sx={{ fontFamily: tk.fontMono, fontSize: '0.8125rem', fontWeight: 500, color: tk.ink }}
              >
                {item.code}
              </Typography>
              <Box sx={{ height: 14, display: 'flex', alignItems: 'center' }}>
                {/* La barra crece desde cero con motion blur horizontal (se repite si cambia el valor) */}
                <Box
                  key={item.count}
                  className="bar"
                  sx={{
                    height: '100%',
                    width: `${Math.max((item.count / max) * 100, 1.5)}%`,
                    borderRadius: '0 2px 2px 0',
                    bgcolor: family.mark,
                    transformOrigin: 'left center',
                    animation: `bar-in 520ms ${tk.ease} backwards`,
                    animationDelay: `${idx * 45}ms`,
                    transition: `filter ${tk.durShort} ${tk.ease}`,
                  }}
                />
              </Box>
              <Typography
                component="span"
                sx={{
                  fontFamily: tk.fontDisplay,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: tk.ink,
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatNumber(item.count)}
              </Typography>
              <Typography
                component="span"
                sx={{ fontSize: '0.8125rem', color: tk.muted, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
              >
                {formatPercent(item.percentage)}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* Leyenda de las familias presentes */}
      <Stack
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap', columnGap: 2.5, rowGap: 1, pt: 2, borderTop: `1px solid ${tk.rule}` }}
      >
        {families.map((f) => (
          <Stack key={f} direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <FamilyIcon family={f} />
            <Typography variant="caption" sx={{ color: tk.ink2 }}>
              {statusFamily[f].label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
