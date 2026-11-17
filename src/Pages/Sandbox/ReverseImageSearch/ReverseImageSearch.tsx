import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { googleLogo } from '../Google search/imageAssets'
import ImageDropzone from './components/ImageDropzone'
import ImageResultCard from './components/ImageResult'
import { findSimilarImages, type ImageMatch } from './imageSimilarity'
import './reverseImageSearch.css'

function ReverseImageSearch() {
  const [selectedImage, setSelectedImage] = useState<{ file: File; previewUrl: string } | null>(null)
  const [results, setResults] = useState<ImageMatch[]>([])
  const [searchState, setSearchState] = useState<'idle' | 'searching' | 'complete' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const previewUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const file = selectedImage?.file
  useEffect(() => {
    if (!file) return
    let active = true

    findSimilarImages(file)
      .then((matches) => {
        if (active) {
          setResults(matches)
          setSearchState('complete')
        }
      })
      .catch((searchError: unknown) => {
        console.error('Failed to find visually similar product images.', searchError)
        if (active) {
          setError('This image could not be processed. Try another image file.')
          setSearchState('error')
        }
      })

    return () => {
      active = false
    }
  }, [file])

  const handleImageSelected = (nextFile: File) => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    const previewUrl = URL.createObjectURL(nextFile)
    previewUrlRef.current = previewUrl
    setSelectedImage({ file: nextFile, previewUrl })
    setResults([])
    setError(null)
    setSearchState('searching')
  }

  const clearImage = () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    previewUrlRef.current = null
    setSelectedImage(null)
    setResults([])
    setError(null)
    setSearchState('idle')
  }

  return (
    <div className="reverse-image-page">
      <header className="reverse-image-header">
        <Link className="reverse-image-logo" to="/sandbox" aria-label="Google home">
          <img src={googleLogo} alt="Google" />
        </Link>
        <nav className="reverse-image-nav" aria-label="Google search categories">
          <Link to="/sandbox/search">All</Link>
          <span className="is-current" aria-current="page">Images</span>
        </nav>
        <span className="reverse-image-profile" aria-label="Profile">G</span>
      </header>

      <main className="reverse-image-main">
        <section className="reverse-image-intro" aria-labelledby="reverse-image-title">
          <div className="reverse-image-heading">
            <span className="reverse-image-lens-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M5 10.5A3.5 3.5 0 0 1 8.5 7h3l2-2h5l2 2h3a3.5 3.5 0 0 1 3.5 3.5v13a3.5 3.5 0 0 1-3.5 3.5h-15A3.5 3.5 0 0 1 5 23.5z" />
                <circle cx="16" cy="16.5" r="5" />
              </svg>
            </span>
            <div>
              <h1 id="reverse-image-title">Search with an image</h1>
              <p>Find visually similar images in this sandbox</p>
            </div>
          </div>

          {selectedImage ? (
            <div className="image-uploaded-panel">
              <img className="image-uploaded-preview" src={selectedImage.previewUrl} alt={`Selected image: ${selectedImage.file.name}`} />
              <div className="image-uploaded-details">
                <span className="image-uploaded-label">Searching for</span>
                <span className="image-uploaded-name">{selectedImage.file.name}</span>
                <button className="image-change-button" type="button" onClick={clearImage}>
                  Choose another image
                </button>
              </div>
              <button
                className="image-remove-button"
                type="button"
                aria-label="Remove selected image"
                onClick={clearImage}
              >
                ×
              </button>
            </div>
          ) : (
            <ImageDropzone onImageSelected={handleImageSelected} />
          )}
        </section>

        {selectedImage && (
          <section className="image-search-results" aria-live="polite">
            <div className="image-results-heading">
              <h2>Visual matches</h2>
              {results.length > 0 && <span>{results.length} results</span>}
            </div>
            {searchState === 'searching' ? (
              <p className="image-results-message" role="status">Comparing with available images…</p>
            ) : searchState === 'error' ? (
              <p className="image-results-message is-error" role="alert">{error}</p>
            ) : (
              <div className="image-results-grid">
                {results.map((result) => <ImageResultCard key={result.id} result={result} />)}
              </div>
            )}
          </section>
        )}

        <p className="reverse-image-disclaimer">
          Demo search: compares visual patterns with product images in this sandbox. Your image stays on this device.
        </p>
      </main>
    </div>
  )
}

export default ReverseImageSearch
