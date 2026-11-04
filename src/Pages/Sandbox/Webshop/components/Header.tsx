import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { bovenbalk, categorieen } from '../data'
import { icoon } from '../hulp'
import { useWinkel } from '../winkel/winkelContext'

/*
  Kop van de shop: de beige bovenbalk, logo, menu, zoekbalk en iconen.
  Hij staat één keer in Webshop.tsx en blijft staan als je van pagina wisselt.
*/
function Header() {
  const { mandje, zetPopup } = useWinkel()
  const navigate = useNavigate()
  const [zoek, zetZoek] = useState('')
  // Het mandje bewaart per product een aantal, dus tel die op voor het rondje bij het winkelmandje.
  const aantal = Object.values(mandje).reduce((som, n) => som + n, 0)

  // Zoeken stuurt je naar Alle sieraden met ?zoek=... in de url. CategoriePagina filtert daarop.
  const zoeken = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/sandbox/monajewelry/alle-sieraden?zoek=${encodeURIComponent(zoek.trim())}`)
  }

  return (
    <header className="ws-header">
      <div className="ws-bovenbalk">
        {/* De strook staat er twee keer in zodat hij naadloos doorloopt. */}
        <div className="ws-strook">
          {[0, 1].map((rij) => (
            <div key={rij} aria-hidden={rij === 1}>
              <span className="ws-sterren">
                {[1, 2, 3, 4, 5].map((n) => <img key={n} src={icoon('ster')} alt="" />)}
                100% beveelt ons aan
              </span>
              {bovenbalk.map((tekst) => <span key={tekst}>{tekst}</span>)}
            </div>
          ))}
        </div>
      </div>
      <div className="ws-kop">
        <Link to="/sandbox/monajewelry" className="ws-logo">MONA<small>JEWELRY</small></Link>
        <nav className="ws-menu" aria-label="Categorieën">
          {categorieen.map((c) => <NavLink key={c.pad} to={`/sandbox/monajewelry/${c.pad}`}>{c.naam}</NavLink>)}
        </nav>
        <form className="ws-zoek" onSubmit={zoeken} role="search">
          <img src={icoon('zoek')} alt="" />
          <input value={zoek} onChange={(e) => zetZoek(e.target.value)} placeholder="ZOEKEN..." aria-label="Zoeken" autoComplete="off" />
        </form>
        {/* Favorieten en account hebben geen eigen pagina: ze openen de registratie-popup. */}
        <nav className="ws-iconen" aria-label="Account">
          <button type="button" onClick={() => zetPopup(true)} aria-label="Favorieten"><img src={icoon('hart')} alt="" /></button>
          <Link to="/sandbox/monajewelry/winkelmandje" aria-label={`Winkelmandje, ${aantal} artikelen`}>
            <img src={icoon('mand')} alt="" />
            {aantal > 0 && <span className="ws-teller">{aantal}</span>}
          </Link>
          <button type="button" onClick={() => zetPopup(true)} aria-label="Account"><img src={icoon('account')} alt="" /></button>
        </nav>
      </div>
    </header>
  )
}

export default Header
