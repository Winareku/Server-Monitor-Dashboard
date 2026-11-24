import { get, ref } from 'firebase/database'
import { database } from '../firebase/firebase'
import type { LogRecord } from '../types/dashboard'

export async function obtenerLogs(collection: string): Promise<LogRecord[]> {
  const referencia = ref(database, collection)
  const snapshot = await get(referencia)

  if (!snapshot.exists()) {
    return []
  }

  const value = snapshot.val() as LogRecord[] | Record<string, LogRecord>
  return Array.isArray(value) ? value : Object.values(value)
}
