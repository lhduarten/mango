import { useEffect, useRef, useState } from 'react'

interface CameraViewProps {
  onCapture: (video: HTMLVideoElement) => void
  disabled?: boolean
}

export function CameraView({ onCapture, disabled }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let stream: MediaStream | null = null
    let cancelled = false

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setReady(true)
        }
      } catch (err) {
        if (!cancelled) setError(describeCameraError(err))
      }
    }

    startCamera()

    return () => {
      cancelled = true
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="font-display text-lg">Não foi possível acessar a câmera</p>
        <p className="text-sm text-muted">{error}</p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-9 flex justify-center">
        <button
          type="button"
          disabled={!ready || disabled}
          onClick={() => videoRef.current && onCapture(videoRef.current)}
          aria-label="Tirar foto"
          className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[3px] border-cream/70 bg-black/20 backdrop-blur-sm transition active:scale-95 disabled:opacity-30"
        >
          <span className="h-[58px] w-[58px] rounded-full bg-gradient-to-b from-mango-300 to-mango-500 shadow-[0_4px_20px_-4px_rgba(255,138,61,0.7)]" />
        </button>
      </div>
    </div>
  )
}

function describeCameraError(err: unknown): string {
  if (err instanceof DOMException) {
    if (err.name === 'NotAllowedError') {
      return 'Permissão de câmera negada. Habilite o acesso à câmera nas configurações do navegador.'
    }
    if (err.name === 'NotFoundError') {
      return 'Nenhuma câmera foi encontrada neste dispositivo.'
    }
    if (err.name === 'NotReadableError') {
      return 'A câmera está sendo usada por outro aplicativo.'
    }
  }
  return 'Verifique as permissões do navegador e tente novamente.'
}
