import { Link } from 'react-router-dom'
import { categorieen, topproducten, voordelen } from '../data'
import type { Product } from '../data'
import { foto, zoekProduct } from '../hulp'
import ProductRaster from '../components/ProductRaster'

/* Beginpagina: hero, topproducten, de vier categorieën en het blok over Mona. */
function Home() {
  // topproducten in data.ts is een lijst met id's. Zoek de producten erbij en sla onbekende id's over.
  const top = topproducten.map(zoekProduct).filter((p): p is Product => Boolean(p))

  return (
    <>
      <section className="ws-hero">
        <div>
          <p className="ws-oog">Al ruim 60 jaar uw juwelier</p>
          <h1>Bekijk de hele collectie</h1>
          <Link to="/sandbox/monajewelry/alle-sieraden" className="ws-hero-knop">HIER <span aria-hidden="true">→</span></Link>
        </div>
        <img src={foto('hero')} alt="Vitrine met gouden sieraden" />
      </section>

      <section className="ws-sectie">
        <div className="ws-sectiekop">
          <h2>Topproducten in sieraden</h2>
          <Link to="/sandbox/monajewelry/alle-sieraden">Alles bekijken <span aria-hidden="true">→</span></Link>
        </div>
        <ProductRaster items={top} />
      </section>

      <section className="ws-sectie ws-categorieen">
        {categorieen.map((c) => (
          <Link key={c.pad} to={`/sandbox/monajewelry/${c.pad}`}>
            <span className="ws-cat-foto"><img src={foto(c.foto)} alt="" loading="lazy" /></span>
            <span className="ws-cat-naam">{c.naam} <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </section>

      <section className="ws-over">
        <div>
          <h2>Mona Jewelry, al ruim 60 jaar uw juwelier</h2>
          <p>Al ruim 60 jaar staat Mona Jewelry voor kwaliteit, vakmanschap en passie. Ontdek onze ruime collectie sieraden en accessoires, zorgvuldig geselecteerd volgens de nieuwste trends.</p>
          <p>Of u nu op zoek bent naar een ring, armband of ketting, bij Mona Jewelry vindt u altijd iets bijzonders.</p>
        </div>
        <ul>{voordelen.map((v) => <li key={v}>{v}</li>)}</ul>
      </section>
    </>
  )
}

export default Home
