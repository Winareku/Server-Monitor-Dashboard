import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tk } from '../../theme'

interface DashboardHeaderProps {
  title: string
  subtitle: string
  dataInfo: string
}

export default function DashboardHeader({
  title,
  subtitle,
  dataInfo,
}: DashboardHeaderProps) {
  return (
    // Banda de grafito con el periodo de los datos, el título y la descripción.
    <Box
      component="header"
      sx={{
        borderRadius: 2,
        bgcolor: tk.paper3,
        color: tk.ink,
        border: `1px solid ${tk.rule}`,
        p: { xs: 3, md: 4 },
      }}
    >
      <Typography
        component="p"
        sx={{
          fontFamily: tk.fontMono,
          fontSize: '0.75rem',
          color: tk.cool,
          mb: 1.5,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {dataInfo}
      </Typography>
      <Typography variant="h1" sx={{ color: tk.ink }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: tk.muted, mt: 1, maxWidth: 420 }}>
        {subtitle}
      </Typography>
    </Box>
  )
}
