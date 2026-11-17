import { useState } from 'react'
import type { FormEvent } from 'react'
import { REKENING } from '../data'
import { euro } from '../hulp'
import { useWinkel } from '../winkel/winkelContext'
import { useMandjeRegels } from '../winkel/useMandjeRegels'
import Pagina from '../components/Pagina'
import Winkelmandje from './Winkelmandje'

/*
  Afrekenen en daarna de bedankpagina. Alleen overboeking en crypto werken, iDEAL en creditcard
  staan uit en het geld moet naar een buitenlandse rekening: allemaal scam-kenmerken.
*/
function Afrekenen() {
  const { leegMandje } = useWinkel()
  const { regels, totaal } = useMandjeRegels()
  const [methode, zetMethode] = useState('overboeking')
  // null = nog niet besteld. Na bestellen bewaren we het bedrag, want het mandje wordt dan leeggemaakt.
  const [besteld, zetBesteld] = useState<number | null>(null)

  const bestellen = (e: FormEvent) => {
    e.preventDefault()
    zetBesteld(totaal)
    leegMandje()
  }

  if (besteld !== null) {
    return (
      <Pagina kruimel="Order">
        <h1>Thank you for your order!</h1>
        <p>Transfer {euro(besteld)} within 24 hours, or your discount expires.</p>
        <dl className="ws-rekening">
          <dt>IBAN</dt><dd>{REKENING.iban}</dd>
          <dt>Account holder</dt><dd>{REKENING.naam}</dd>
          <dt>Reference</dt><dd>Order MJ-48213</dd>
        </dl>
      </Pagina>
    )
  }

  // Wie hier met een leeg mandje komt, ziet gewoon het lege winkelmandje.
  if (regels.length === 0) return <Winkelmandje />

  return (
    <Pagina kruimel="Checkout">
      <h1>Checkout</h1>
      {/* Velden hebben expres geen name: er wordt niets verstuurd of bewaard. */}
      <form className="ws-afrekenen" onSubmit={bestellen} autoComplete="off">
        <label>Name<input required /></label>
        <label>Email address<input type="email" required /></label>
        <label>Address<input required /></label>
        <label>Postal code and city<input required /></label>
        <fieldset>
          <legend>Payment method</legend>
          <label><input type="radio" checked={methode === 'overboeking'} onChange={() => zetMethode('overboeking')} /> Bank transfer</label>
          <label><input type="radio" checked={methode === 'crypto'} onChange={() => zetMethode('crypto')} /> Crypto (10% extra discount)</label>
          <label className="ws-uit"><input type="radio" disabled /> iDEAL (temporarily unavailable)</label>
          <label className="ws-uit"><input type="radio" disabled /> Credit card (temporarily unavailable)</label>
        </fieldset>
        <p className="ws-totaal">Total <strong>{euro(totaal)}</strong></p>
        <button type="submit" className="ws-knop">Place order</button>
      </form>
    </Pagina>
  )
}

export default Afrekenen
