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
          <p className="ws-oog">Your jeweler for over 60 years</p>
          <h1>View the full collection</h1>
          <Link to="/sandbox/monajewelry/all-jewelry" className="ws-hero-knop">HERE <span aria-hidden="true">→</span></Link>
        </div>
        <img src={foto('hero')} alt="Display case with gold jewelry" />
      </section>

      <section className="ws-sectie">
        <div className="ws-sectiekop">
          <h2>Top jewelry picks</h2>
          <Link to="/sandbox/monajewelry/all-jewelry">View all <span aria-hidden="true">→</span></Link>
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
          <h2>Mona Jewelry, your jeweler for over 60 years</h2>
          <p>For over 60 years, Mona Jewelry has stood for quality, craftsmanship and passion. Discover our wide collection of jewelry and accessories, carefully selected to follow the latest trends.</p>
          <p>Whether you are looking for a ring, bracelet or necklace, at Mona Jewelry you will always find something special.</p>
        </div>
        <ul>{voordelen.map((v) => <li key={v}>{v}</li>)}</ul>
      </section>
    </>
  )
}

export default Home
