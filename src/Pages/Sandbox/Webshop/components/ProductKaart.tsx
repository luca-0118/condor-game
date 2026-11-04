import { Link } from 'react-router-dom'
import { MERK } from '../data'
import type { Product } from '../data'
import { foto } from '../hulp'
import { useWinkel } from '../winkel/winkelContext'
import Prijs from './Prijs'
import Score from './Score'

/*
  Eén product in het raster: foto, merk, naam, score en prijs. Klik je erop, dan ga je naar de
  productpagina. Zolang de prijzen dicht zitten staat er een knop onder die de popup opent.
*/
function ProductKaart({ item }: { item: Product }) {
  const { ontgrendeld, zetPopup } = useWinkel()
  return (
    <article className="ws-kaart">
      <Link to={`/sandbox/monajewelry/product/${item.id}`}>
        <span className="ws-kaart-foto"><img src={foto(item.foto)} alt={item.naam} loading="lazy" /></span>
        <p className="ws-merk">{MERK}</p>
        <h3>{item.naam}</h3>
        <Score />
        <Prijs item={item} />
      </Link>
      {!ontgrendeld && (
        <button type="button" className="ws-ontgrendel" onClick={() => zetPopup(true)}>
          Ontgrendel de wholesaleprijs <span aria-hidden="true">→</span>
        </button>
      )}
    </article>
  )
}

export default ProductKaart
