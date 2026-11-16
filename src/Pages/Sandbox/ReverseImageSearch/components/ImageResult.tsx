import { Link } from 'react-router-dom'
import type { ImageMatch } from '../imageSimilarity'

function ImageResultCard({ result }: { result: ImageMatch }) {
  return (
    <article className="image-result-card">
      <Link
        className="image-result-link"
        to={result.href}
        aria-label={`View ${result.title} at ${result.source}`}
      >
        <img src={result.imageUrl} alt={result.title} loading="lazy" />
        <span className="image-result-source">{result.source}</span>
        <span className="image-result-title">{result.title}</span>
      </Link>
      <span className="image-result-similarity">{result.similarity}% visual match</span>
    </article>
  )
}

export default ImageResultCard
