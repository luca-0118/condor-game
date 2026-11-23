import { useNavigate, useParams } from 'react-router-dom'
import { MERK, VOORRAAD, reviews, voordelen } from '../data'
import { foto, zoekProduct } from '../hulp'
import { useWinkel } from '../winkel/winkelContext'
import Aftelklok from '../components/Aftelklok'
import Pagina from '../components/Pagina'
import Prijs from '../components/Prijs'
import Score from '../components/Score'

/*
  Pagina van één product. Het id komt uit de url (/webshop/product/:id).
  Hier zitten de meeste scam-kenmerken: aftelklok, lage voorraad en reviews die op elkaar lijken.
*/
function ProductPagina() {
  const { id } = useParams()
  const { ontgrendeld, zetPopup, mandje, zetAantal } = useWinkel()
  const navigate = useNavigate()
  const item = zoekProduct(id ?? '')

  if (!item) return <Pagina kruimel="Not found"><p>This product no longer exists.</p></Pagina>

  // Zonder registratie kun je niets kopen: dan gaat eerst de popup open.
  const toevoegen = () => {
    if (!ontgrendeld) return zetPopup(true)
    zetAantal(item.id, (mandje[item.id] ?? 0) + 1)
    navigate('/sandbox/monajewelry/cart')
  }

  return (
    <Pagina kruimel={item.naam}>
      <div className="ws-product">
        <span className="ws-product-foto"><img src={foto(item.foto)} alt={item.naam} /></span>
        <div className="ws-product-info">
          <p className="ws-merk">{MERK}</p>
          <h1>{item.naam}</h1>
          <Score />
          <Prijs item={item} />
          <Aftelklok />
          <p className="ws-voorraad">Hurry, only {VOORRAAD} left in stock!</p>
          <button type="button" className="ws-knop" onClick={toevoegen}>
            {ontgrendeld ? 'Add to cart' : 'Unlock the wholesale price'}
          </button>
          <ul>{voordelen.slice(0, 3).map((v) => <li key={v}>{v}</li>)}</ul>
          <p>Timeless jewelry made from high-quality materials, carefully finished. Perfect as a gift or to treat yourself.</p>
        </div>
      </div>
      <section className="ws-reviews">
        <h2>What customers say</h2>
        {reviews.map((r) => (
          <article key={r.naam}>
            <p><strong>{r.naam}</strong> <span>{r.datum}</span></p>
            <p>{r.tekst}</p>
          </article>
        ))}
      </section>
    </Pagina>
  )
}

export default ProductPagina
