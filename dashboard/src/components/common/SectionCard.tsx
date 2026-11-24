import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { tk } from '../../theme'

interface SectionCardProps {
  title: string
  subtitle?: string
  // Contenido opcional a la derecha del título (p. ej. un total).
  action?: ReactNode
  children: ReactNode
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
}: SectionCardProps) {
  return (
    <Card component="section" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Cabecera separada del contenido por una línea fina */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          columnGap: 2,
          rowGap: 1,
          px: { xs: 2.5, md: 3 },
          pt: { xs: 2.5, md: 3 },
          pb: 2,
          borderBottom: `1px solid ${tk.rule}`,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h2">{title}</Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: tk.muted, mt: 0.25 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, p: { xs: 2.5, md: 3 } }}>{children}</Box>
    </Card>
  )
}
