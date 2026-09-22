import { JPEG_QUALITY, MAX_DIMENSION } from './constants'

interface CapturedPhoto {
  blob: Blob
  width: number
  height: number
}

// Captura o frame atual do vídeo, redimensiona para no máximo MAX_DIMENSION
// no lado maior e exporta como JPEG. Como o frame é desenhado do zero num
// canvas novo (nunca lido de um arquivo), o resultado não carrega EXIF/GPS —
// o canvas não preserva metadados do arquivo original.
export async function captureAndCompress(video: HTMLVideoElement): Promise<CapturedPhoto> {
  const sourceWidth = video.videoWidth
  const sourceHeight = video.videoHeight
  const scale = Math.min(1, MAX_DIMENSION / Math.max(sourceWidth, sourceHeight))
  const width = Math.round(sourceWidth * scale)
  const height = Math.round(sourceHeight * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Não foi possível criar o contexto 2D do canvas')

  ctx.drawImage(video, 0, 0, width, height)

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
  )
  if (!blob) throw new Error('Falha ao gerar a imagem comprimida')

  return { blob, width, height }
}
