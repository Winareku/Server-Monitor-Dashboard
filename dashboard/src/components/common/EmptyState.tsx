import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tk } from '../../theme'

interface EmptyStateProps {
  height?: number
  message?: string
}

// Se muestra cuando los filtros no devuelven registros.
export default function EmptyState({
  height = 220,
  message = 'No hay solicitudes para los filtros seleccionados. Prueba con otro periodo o servidor.',
}: EmptyStateProps) {
  return (
    <Box
      role="status"
      sx={{
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        textAlign: 'center',
        px: 3,
        borderRadius: 1.5,
        border: `1px dashed ${tk.rule2}`,
        // Rejilla de puntos sobre la celda de 8 x 16 del tema
        backgroundColor: tk.paper,
        backgroundImage: `radial-gradient(${tk.rule2} 1px, transparent 1px)`,
        backgroundSize: '8px 16px',
      }}
    >
      <Typography
        component="span"
        aria-hidden
        sx={{ fontFamily: tk.fontMono, fontSize: '0.875rem', color: tk.muted, bgcolor: tk.paper, px: 1 }}
      >
        0 registros
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: 320, color: tk.ink2, bgcolor: tk.paper, px: 1 }}>
        {message}
      </Typography>
    </Box>
  )
}
