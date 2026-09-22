import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deletePhoto, listPhotos } from '../lib/storage'
import type { Photo } from '../types'

export function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    listPhotos()
      .then(setPhotos)
      .catch(() => setError('Não foi possível carregar as fotos.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    setDeletingId(id)
    setError(null)
    try {
      await deletePhoto(id)
      setPhotos((prev) => prev.filter((photo) => photo.id !== id))
    } catch {
      setError('Não foi possível excluir a foto. Tente novamente.')
    } finally {
      setDeletingId(null)
      setConfirmingId(null)
    }
  }

  return (
    <div className="min-h-svh bg-ink text-cream">
      <header className="flex items-center justify-between px-4 py-4">
        <Link to="/camera" className="text-sm text-muted transition hover:text-cream">
          ← Câmera
        </Link>
        <span className="font-display text-sm">{photos.length} fotos</span>
      </header>

      {loading && <p className="p-6 text-center text-sm text-muted">Carregando...</p>}
      {error && <p className="p-6 text-center text-sm text-red-400">{error}</p>}
      {!loading && !error && photos.length === 0 && (
        <p className="p-6 text-center text-sm text-muted">Nenhuma foto salva ainda.</p>
      )}

      <div className="grid grid-cols-3 gap-1 p-1">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square overflow-hidden bg-cream/5">
            <a href={photo.url} download className="block h-full w-full">
              <img src={photo.url} alt="" className="h-full w-full object-cover" loading="lazy" />
            </a>

            {confirmingId === photo.id ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/90 p-2 text-center backdrop-blur-sm">
                <p className="text-xs leading-tight">Excluir para sempre?</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={deletingId === photo.id}
                    onClick={() => handleDelete(photo.id)}
                    className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium disabled:opacity-50"
                  >
                    {deletingId === photo.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingId(null)}
                    className="rounded-full bg-cream/15 px-3 py-1 text-xs font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingId(photo.id)}
                aria-label="Excluir foto"
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-ink/60 text-sm leading-none backdrop-blur-sm"
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
