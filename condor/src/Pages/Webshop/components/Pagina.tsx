import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/* Vaste opbouw van een gewone pagina: kruimelpad bovenaan en daaronder de inhoud. */
function Pagina({ kruimel, children }: { kruimel: string; children: ReactNode }) {
  return (
    <>
      <p className="ws-kruimel"><Link to="/sandbox/webshop">Home</Link> / {kruimel}</p>
      <div className="ws-sectie">{children}</div>
    </>
  )
}

export default Pagina
