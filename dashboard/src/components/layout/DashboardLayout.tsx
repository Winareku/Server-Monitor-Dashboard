import type { ReactNode } from 'react'
import Container from '@mui/material/Container'
import MotionFilters from './MotionFilters'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Container component="main" maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
      <MotionFilters />
      {children}
    </Container>
  )
}
