import Box from '@mui/material/Box'
import { METHOD_COLORS } from '../../constants'
import { tk } from '../../theme'
import type { HttpMethod } from '../../types/dashboard'

interface MethodTagProps {
  method: HttpMethod
}

// Método HTTP en monoespaciada (valor de máquina). La muestra de color enlaza con el gráfico de métodos;
// el texto se queda en tinta para mantener el contraste.
export default function MethodTag({ method }: MethodTagProps) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        fontFamily: tk.fontMono,
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: tk.ink,
      }}
    >
      <Box
        component="span"
        aria-hidden
        sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: METHOD_COLORS[method] }}
      />
      {method}
    </Box>
  )
}
