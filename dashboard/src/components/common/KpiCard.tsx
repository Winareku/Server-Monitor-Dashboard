import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { tk } from '../../theme'
import type { KpiVariant } from '../../types/dashboard'

interface KpiCardProps {
  title: string
  value: string
  unit?: string
  subtitle?: string
  variant?: KpiVariant
  // Texto que acompaña al color de alerta, para no depender solo del color.
  alertLabel?: string
  // Gráfico pequeño que respalda la cifra (minigráfica, medidor).
  visual?: ReactNode
}

function AlertIcon() {
  return (
    <Box component="svg" viewBox="0 0 16 16" aria-hidden sx={{ width: 14, height: 14, flexShrink: 0 }}>
      <path d="M8 1.5 15 14H1L8 1.5Z" fill="currentColor" />
      <path d="M8 6v3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="11.6" r="0.9" fill="#fff" />
    </Box>
  )
}

export default function KpiCard({
  title,
  value,
  unit,
  subtitle,
  variant = 'default',
  alertLabel,
  visual,
}: KpiCardProps) {
  const isAlert = variant === 'error'

  return (
    // Animación de hover en styles/tokens.css (.kpi-card): la luz sigue al cursor con --mx / --my.
    <Card
      className="kpi-card"
      data-alert={isAlert}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: 1,
            rowGap: 0.5,
          }}
        >
          <Typography variant="overline" component="h2" sx={{ color: tk.muted }}>
            {title}
          </Typography>
          {isAlert && alertLabel && (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontFamily: tk.fontDisplay,
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: tk.badInk,
                animation: `value-in ${tk.durMedium} ${tk.ease} backwards`,
                whiteSpace: 'nowrap',
              }}
            >
              <AlertIcon />
              {alertLabel}
            </Box>
          )}
        </Box>
        <Typography
          variant="kpi"
          component="p"
          sx={{ color: isAlert ? tk.badInk : tk.ink, m: 0 }}
        >
          {/* La cifra nueva entra con motion blur vertical cada vez que cambia */}
          <Box
            component="span"
            key={value}
            className="kpi-value"
            sx={{ display: 'inline-block', animation: `value-in ${tk.durMedium} ${tk.ease} backwards` }}
          >
            {value}
          </Box>
          {unit && (
            <Box
              component="span"
              sx={{ fontSize: '0.4em', fontWeight: 500, color: tk.muted, ml: 0.75, letterSpacing: 0 }}
            >
              {unit}
            </Box>
          )}
        </Typography>
        {visual && <Box sx={{ mt: 0.5 }}>{visual}</Box>}
        {subtitle && (
          <Typography variant="caption" sx={{ mt: 'auto', color: tk.muted }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
