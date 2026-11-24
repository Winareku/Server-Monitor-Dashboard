import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tk } from '../../theme'

interface CellMeterProps {
  // Porcentaje 0-100.
  value: number
  // Umbral de alerta (porcentaje), marcado con una muesca.
  threshold?: number
  alert?: boolean
  label: string
}

const CELLS = 50 // cada celda = 2 %

// Medidor de cincuenta celdas (tema Console): la cifra grande va arriba, el medidor la respalda.
export default function CellMeter({ value, threshold, alert = false, label }: CellMeterProps) {
  const filled = Math.round((Math.min(100, Math.max(0, value)) / 100) * CELLS)
  const thresholdCell = threshold != null ? Math.round((threshold / 100) * CELLS) : null
  const on = alert ? tk.bad : tk.cool

  return (
    <Box role="img" aria-label={label}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${CELLS}, minmax(0, 1fr))`,
          gap: '2px',
          height: 14,
          position: 'relative',
        }}
      >
        {Array.from({ length: CELLS }, (_, i) => (
          <Box
            key={i}
            className={i < filled ? 'meter-cell on' : 'meter-cell'}
            style={{ ['--d' as string]: i }}
            sx={{
              borderRadius: '1px',
              bgcolor: i < filled ? on : tk.paper3,
              transition: `background-color ${tk.durShort} ${tk.ease}`,
              transitionDelay: `${i * 6}ms`,
            }}
          />
        ))}
        {thresholdCell != null && (
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: -4,
              bottom: -4,
              left: `calc(${(thresholdCell / CELLS) * 100}% - 1px)`,
              width: '2px',
              bgcolor: tk.ink,
            }}
          />
        )}
      </Box>
      {threshold != null && (
        <Typography
          component="p"
          sx={{
            mt: 0.75,
            fontSize: '0.75rem',
            color: tk.muted,
            fontVariantNumeric: 'tabular-nums',
            pl: `calc(${((thresholdCell ?? 0) / CELLS) * 100}% - 4px)`,
          }}
        >
          umbral {threshold} %
        </Typography>
      )}
    </Box>
  )
}
