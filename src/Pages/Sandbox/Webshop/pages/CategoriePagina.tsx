import { Link, useSearchParams } from 'react-router-dom'
import { categorieen, producten } from '../data'
import { foto } from '../hulp'
import ProductRaster from '../components/ProductRaster'

/* Eén pagina voor alle categorieën. Welke het is, bepaalt het pad. */
function CategoriePagina({ pad }: { pad: string }) {
  const [params] = useSearchParams()
  const zoek = (params.get('zoek') ?? '').toLowerCase()
  const categorie = categorieen.find((c) => c.pad === pad) ?? categorieen[0]
  // Een product komt op de pagina als het in deze categorie valt (Alle sieraden heeft geen filter)
  // en, als er gezocht is, de zoekterm in de naam of categorie staat.
  const items = producten.filter((p) =>
    (!categorie.filter || p.categorie === categorie.filter) &&
    (!zoek || `${p.naam} ${p.categorie}`.toLowerCase().includes(zoek)))

  return (
    <>
      <p className="ws-kruimel"><Link to="/sandbox/monajewelry">Home</Link> / {categorie.naam}</p>
      <section className="ws-banner">
        <div>
          <h1>{categorie.naam}</h1>
          <p>{items.length} sieraden</p>
        </div>
        <img src={foto(categorie.banner)} alt="" />
      </section>
      <section className="ws-sectie">
        {items.length > 0 ? <ProductRaster items={items} /> : <p>Geen producten gevonden voor "{zoek}".</p>}
      </section>
    </>
  )
}

export default CategoriePagina
