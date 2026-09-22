import { createStore, del, entries, set } from 'idb-keyval'
import type { Photo } from '../types'

interface PhotoRecord {
  id: string
  blob: Blob
  width: number
  height: number
  sizeBytes: number
  createdAt: string
}

// Fotos ficam salvas no IndexedDB do próprio navegador — "storage local"
// aqui é o dispositivo de quem está fotografando, não um servidor.
const store = createStore('mango-db', 'photos')

function toPhoto(record: PhotoRecord): Photo {
  return {
    id: record.id,
    url: URL.createObjectURL(record.blob),
    width: record.width,
    height: record.height,
    sizeBytes: record.sizeBytes,
    createdAt: record.createdAt,
  }
}

export async function savePhoto(blob: Blob, width: number, height: number): Promise<Photo> {
  const record: PhotoRecord = {
    id: crypto.randomUUID(),
    blob,
    width,
    height,
    sizeBytes: blob.size,
    createdAt: new Date().toISOString(),
  }
  await set(record.id, record, store)
  return toPhoto(record)
}

export async function listPhotos(): Promise<Photo[]> {
  const all = await entries<string, PhotoRecord>(store)
  return all
    .map(([, record]) => record)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(toPhoto)
}

export async function deletePhoto(id: string): Promise<void> {
  await del(id, store)
}
