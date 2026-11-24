import Box from '@mui/material/Box'
import { statusFamily, statusFamilyOf, tk, type StatusFamilyKey } from '../../theme'

interface StatusBadgeProps {
  code: number
}

// Un ícono por familia: la forma también distingue el estado, no solo el color.
function FamilyIcon({ family }: { family: StatusFamilyKey }) {
  const color = statusFamily[family].mark
  const common = { width: 14, height: 14, flexShrink: 0 }
  switch (family) {
    case 'success':
      return (
        <Box component="svg" viewBox="0 0 16 16" aria-hidden sx={common}>
          <circle cx="8" cy="8" r="7" fill={color} />
          <path d="m4.8 8.2 2.2 2.2 4.2-4.6" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </Box>
      )
    case 'redirect':
      return (
        <Box component="svg" viewBox="0 0 16 16" aria-hidden sx={common}>
          <circle cx="8" cy="8" r="7" fill={color} />
          <path d="M4.5 8h6.5M8.5 5.2 11.3 8l-2.8 2.8" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </Box>
      )
    case 'clientError':
      return (
        <Box component="svg" viewBox="0 0 16 16" aria-hidden sx={common}>
          <path d="M8 1.2 15.2 14H.8L8 1.2Z" fill={color} />
          <path d="M8 6v3.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="8" cy="11.7" r="0.95" fill="#fff" />
        </Box>
      )
    default:
      return (
        <Box component="svg" viewBox="0 0 16 16" aria-hidden sx={common}>
          <rect x="1" y="1" width="14" height="14" rx="3" fill={color} />
          <path d="m5.3 5.3 5.4 5.4m0-5.4-5.4 5.4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
        </Box>
      )
  }
}

// Estado como texto con un ícono (sin cápsula de color); el número siempre va escrito.
export default function StatusBadge({ code }: StatusBadgeProps) {
  const key = statusFamilyOf(code)
  return (
    <Box
      component="span"
      title={statusFamily[key].label}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        fontFamily: tk.fontMono,
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: tk.ink,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <FamilyIcon family={key} />
      {code}
    </Box>
  )
}

export { FamilyIcon }
