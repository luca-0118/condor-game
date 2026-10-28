import { Link } from 'react-router-dom'
import './test.css'

function Test() {
  return (
    <main className="test">
      Hier komt dummy omgeving pagina's
      <Link to="/instagram" className="test-link">
        Instagram
      </Link>
      <p>Hier komt dummy omgeving pagina's</p>
      <Link to="/instagram" className="test-link">
        Instagram
      </Link>
      <Link to="/Facebook" className="test-link">
        Facebook
      </Link>
    </main>
  )
}

export default Test
