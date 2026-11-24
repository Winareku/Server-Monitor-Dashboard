import { useEffect, useState } from 'react'
import { obtenerLogs } from '../services/logsService'
import type { LogRecord } from '../types/dashboard'

export default function useFetchLogs(collection: string) {
  const [logs, setLogs] = useState<LogRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    async function cargarDatos() {
      try {
        const datos = await obtenerLogs(collection)
        if (!cancelado) setLogs(datos)
      } catch (e) {
        if (!cancelado) setError(e instanceof Error ? e.message : 'Error desconocido')
      } finally {
        if (!cancelado) setLoading(false)
      }
    }

    cargarDatos()
    return () => {
      cancelado = true
    }
  }, [collection])

  return { logs, loading, error }
}
