import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import EmptyState from '../common/EmptyState'
import MethodTag from '../common/MethodTag'
import StatusBadge from '../common/StatusBadge'
import { formatDateTime, formatDateTimeShort, formatNumber } from '../../utils/format'
import { tk } from '../../theme'
import type { LogColumn, LogRecord } from '../../types/dashboard'

interface RequestsTableProps {
  rows: LogRecord[]
  columns: LogColumn[]
  page: number
  pageSize: number
  totalRecords: number
  isMobile: boolean
  onPageChange: (page: number) => void
  onLoadMore: () => void
}

function renderCell(row: LogRecord, key: LogColumn['key'], isMobile: boolean) {
  switch (key) {
    case 'timestamp':
      return (
        <Box component="span" sx={{ fontFamily: tk.fontMono, fontSize: '0.8125rem', color: tk.ink2 }}>
          {isMobile ? formatDateTimeShort(row.timestamp) : formatDateTime(row.timestamp)}
        </Box>
      )
    case 'server_id':
      return `Servidor ${row.server_id}`
    case 'method':
      return <MethodTag method={row.method} />
    case 'path':
      return (
        <Box
          component="span"
          title={row.path}
          sx={{
            display: 'block',
            maxWidth: 320,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: tk.fontMono,
            fontSize: '0.8125rem',
            color: tk.muted,
          }}
        >
          {row.path}
        </Box>
      )
    case 'status_code':
      return <StatusBadge code={Number(row.status_code)} />
    case 'response_time_ms':
      return (
        <Box component="span" sx={{ fontFamily: tk.fontMono, fontSize: '0.8125rem', color: tk.ink }}>
          {formatNumber(row.response_time_ms)}
          <Box component="span" sx={{ color: tk.muted, ml: 0.5 }}>
            ms
          </Box>
        </Box>
      )
    default:
      return row[key]
  }
}

export default function RequestsTable({
  rows,
  columns,
  page,
  pageSize,
  totalRecords,
  isMobile,
  onPageChange,
  onLoadMore,
}: RequestsTableProps) {
  if (totalRecords === 0) return <EmptyState height={160} />

  const remaining = totalRecords - rows.length
  const px = { xs: 1, md: 2 }

  return (
    <>
      {/* Tabla con reglas a todo el ancho de la tarjeta (sin caja dentro de la caja) */}
      <TableContainer
        sx={{
          overflowX: 'auto',
          mx: { xs: -2.5, md: -3 },
          mt: { xs: -2.5, md: -3 },
          width: { xs: 'calc(100% + 40px)', md: 'calc(100% + 48px)' },
        }}
      >
        <Table size="small" aria-label="Registro de solicitudes">
          <TableHead>
            <TableRow>
              {columns.map((c, i) => (
                <TableCell
                  key={c.key}
                  align={c.align ?? 'left'}
                  sx={{
                    px,
                    py: 1.25,
                    pl: i === 0 ? { xs: 2.5, md: 3 } : px,
                    pr: i === columns.length - 1 ? { xs: 2.5, md: 3 } : px,
                  }}
                >
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={`${row.timestamp}-${i}`}
                sx={{
                  // Cada página (o cada bloque de "Ver más") entra fila por fila con motion blur horizontal
                  animation: `row-in ${tk.durMedium} ${tk.ease} backwards`,
                  animationDelay: `${(i % pageSize) * 32}ms`,
                  transition: `background-color ${tk.durShort} ${tk.ease}`,
                  '& td:first-of-type': {
                    boxShadow: 'inset 0 0 0 transparent',
                    transition: `box-shadow ${tk.durShort} ${tk.ease}`,
                  },
                  '&:hover': { bgcolor: tk.paper4 },
                  '&:hover td:first-of-type': { boxShadow: `inset 2px 0 0 ${tk.accent}` },
                }}
              >
                {columns.map((c, ci) => (
                  <TableCell
                    key={c.key}
                    align={c.align ?? 'left'}
                    sx={{
                      whiteSpace: 'nowrap',
                      py: 1.5,
                      px,
                      pl: ci === 0 ? { xs: 2.5, md: 3 } : px,
                      pr: ci === columns.length - 1 ? { xs: 2.5, md: 3 } : px,
                    }}
                  >
                    {renderCell(row, c.key, isMobile)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isMobile ? (
        // Móvil: botón "Ver más" (solo si quedan registros)
        remaining > 0 && (
          <Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={onLoadMore}>
            Ver más registros ({formatNumber(remaining)} restantes)
          </Button>
        )
      ) : (
        // Escritorio: paginación
        <TablePagination
          component="div"
          count={totalRecords}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          sx={{ mb: -1.5 }}
        />
      )}
    </>
  )
}
