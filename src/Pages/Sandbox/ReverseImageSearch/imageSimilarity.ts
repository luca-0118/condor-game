import { imageSearchEntries, type ImageSearchEntry } from './data'

type ImageSignature = {
  hash: boolean[]
  histogram: number[]
}

export type ImageMatch = ImageSearchEntry & { similarity: number }
type CandidateImage = ImageSearchEntry & { signature: ImageSignature }

const HASH_SIZE = 8
const HISTOGRAM_BINS = 4
const MAX_RESULTS = 8

let candidatesPromise: Promise<CandidateImage[]> | undefined

function createSignature(image: CanvasImageSource): ImageSignature {
  const canvas = document.createElement('canvas')
  canvas.width = HASH_SIZE
  canvas.height = HASH_SIZE

  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) {
    throw new Error('The browser could not prepare the image for comparison.')
  }

  context.fillStyle = '#fff'
  context.fillRect(0, 0, HASH_SIZE, HASH_SIZE)
  context.drawImage(image, 0, 0, HASH_SIZE, HASH_SIZE)

  const { data } = context.getImageData(0, 0, HASH_SIZE, HASH_SIZE)
  const brightness = Array.from({ length: HASH_SIZE * HASH_SIZE }, (_, index) => {
    const offset = index * 4
    return data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114
  })
  const average = brightness.reduce((sum, value) => sum + value, 0) / brightness.length
  const hash = brightness.map((value) => value >= average)
  const histogram = Array(HISTOGRAM_BINS ** 3).fill(0) as number[]

  for (let index = 0; index < data.length; index += 4) {
    const red = Math.min(HISTOGRAM_BINS - 1, Math.floor((data[index] / 256) * HISTOGRAM_BINS))
    const green = Math.min(HISTOGRAM_BINS - 1, Math.floor((data[index + 1] / 256) * HISTOGRAM_BINS))
    const blue = Math.min(HISTOGRAM_BINS - 1, Math.floor((data[index + 2] / 256) * HISTOGRAM_BINS))
    histogram[red * HISTOGRAM_BINS ** 2 + green * HISTOGRAM_BINS + blue] += 1
  }

  const pixelCount = data.length / 4
  return {
    hash,
    histogram: histogram.map((count) => count / pixelCount),
  }
}

async function loadImageSignature(url: string): Promise<ImageSignature> {
  const image = new Image()
  image.decoding = 'async'
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error(`Could not load image search asset "${url}".`))
    image.src = url

    if (image.complete && image.naturalWidth > 0) resolve()
  })
  return createSignature(image)
}

function compareSignatures(left: ImageSignature, right: ImageSignature): number {
  const differentBits = left.hash.reduce(
    (count, bit, index) => count + Number(bit !== right.hash[index]),
    0,
  )
  const hashSimilarity = 1 - differentBits / left.hash.length
  const histogramSimilarity = left.histogram.reduce(
    (overlap, value, index) => overlap + Math.min(value, right.histogram[index]),
    0,
  )

  return Math.round((hashSimilarity * 0.7 + histogramSimilarity * 0.3) * 100)
}

function loadCandidates() {
  return candidatesPromise ??= Promise.all(
      imageSearchEntries.map(async (entry) => {
        return {
          ...entry,
          signature: await loadImageSignature(entry.imageUrl),
        }
      }),
    )
}

export async function findSimilarImages(file: File): Promise<ImageMatch[]> {
  const bitmap = await createImageBitmap(file)
  let uploadedSignature: ImageSignature

  try {
    uploadedSignature = createSignature(bitmap)
  } finally {
    bitmap.close()
  }

  const candidates = await loadCandidates()

  return candidates
    .map(({ signature, ...candidate }) => ({
      ...candidate,
      similarity: compareSignatures(uploadedSignature, signature),
    }))
    .sort((left, right) => right.similarity - left.similarity)
    .slice(0, MAX_RESULTS)
}
