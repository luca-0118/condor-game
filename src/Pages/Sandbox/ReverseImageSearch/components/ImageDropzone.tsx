import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'

type ImageDropzoneProps = {
  onImageSelected: (file: File) => void
}

function ImageDropzone({ onImageSelected }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectImage = (file: File | undefined) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }

    setError(null)
    onImageSelected(file)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectImage(event.currentTarget.files?.[0])
    event.currentTarget.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    selectImage(event.dataTransfer.files[0])
  }

  return (
    <div
      className={`image-dropzone${isDragging ? ' is-dragging' : ''}`}
      onDragEnter={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        const nextTarget = event.relatedTarget
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setIsDragging(false)
        }
      }}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        className="image-file-input"
        type="file"
        accept="image/*"
        aria-label="Choose an image"
        onChange={handleFileChange}
      />
      <div className="image-dropzone-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M24 32V8m0 0-8 8m8-8 8 8M9 29v10h30V29" />
        </svg>
      </div>
      <p className="image-dropzone-title">Drag an image here</p>
      <p className="image-dropzone-subtitle">or</p>
      <button
        className="image-select-button"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        Upload a file
      </button>
      <p className="image-dropzone-hint">PNG, JPG, GIF or WEBP</p>
      {error && <p className="image-dropzone-error" role="alert">{error}</p>}
    </div>
  )
}

export default ImageDropzone
