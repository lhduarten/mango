import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CameraView } from '../components/CameraView'
import { MangoLogo } from '../components/MangoLogo'
import { listPhotos, savePhoto } from '../lib/storage'
import { MAX_PHOTOS } from '../lib/constants'
import { captureAndCompress } from '../lib/compress'

type Status = 'idle' | 'uploading' | 'error'

export function CameraPage() {
  const [photosTaken, setPhotosTaken] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    listPhotos().then((photos) => setPhotosTaken(photos.length))
  }, [])

  const filmeEsgotado = photosTaken >= MAX_PHOTOS

  async function handleCapture(video: HTMLVideoElement) {
    setStatus('uploading')
    setErrorMessage(null)
    try {
      const { blob, width, height } = await captureAndCompress(video)
      await savePhoto(blob, width, height)
      setPhotosTaken((n) => n + 1)
      setStatus('idle')
    } catch (err) {
      console.error('Falha ao salvar foto:', err)
      setErrorMessage('Não foi possível salvar a foto. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <div className="flex h-svh flex-col bg-ink text-cream">
      <header className="flex items-center justify-between px-4 py-3 text-sm">
        <Link to="/" className="flex items-center gap-1.5 font-display tracking-tight">
          <MangoLogo className="h-5 w-5" />
          Mango
        </Link>
        <span className="text-muted">
          {filmeEsgotado ? 'Filme esgotado' : `${MAX_PHOTOS - photosTaken} fotos restantes`}
        </span>
      </header>

      <div className="relative flex-1 overflow-hidden">
        {filmeEsgotado ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="font-display text-xl">Filme esgotado 🎞️</p>
            <p className="text-sm text-muted">
              Você já tirou todas as {MAX_PHOTOS} fotos disponíveis.
            </p>
            <Link
              to="/galeria"
              className="rounded-full bg-gradient-to-b from-mango-300 to-mango-500 px-5 py-2.5 text-sm font-semibold text-ink"
            >
              Ver fotos salvas
            </Link>
          </div>
        ) : (
          <CameraView onCapture={handleCapture} disabled={status === 'uploading'} />
        )}

        {status === 'uploading' && (
          <div className="absolute inset-x-0 top-4 flex justify-center">
            <span className="rounded-full bg-ink/80 px-3 py-1 text-xs">Salvando...</span>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="bg-red-900/60 px-4 py-2 text-center text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      <Link
        to="/galeria"
        className="border-t border-cream/10 px-4 py-3 text-center text-sm text-muted transition hover:text-cream"
      >
        Ver galeria →
      </Link>
    </div>
  )
}
