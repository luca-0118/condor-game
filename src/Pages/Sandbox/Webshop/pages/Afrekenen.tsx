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
      <Pagina kruimel="Bestelling">
        <h1>Bedankt voor je bestelling!</h1>
        <p>Maak {euro(besteld)} binnen 24 uur over, anders vervalt je korting.</p>
        <dl className="ws-rekening">
          <dt>IBAN</dt><dd>{REKENING.iban}</dd>
          <dt>Ten name van</dt><dd>{REKENING.naam}</dd>
          <dt>Omschrijving</dt><dd>Bestelling MJ-48213</dd>
        </dl>
      </Pagina>
    )
  }

  // Wie hier met een leeg mandje komt, ziet gewoon het lege winkelmandje.
  if (regels.length === 0) return <Winkelmandje />

  return (
    <Pagina kruimel="Afrekenen">
      <h1>Afrekenen</h1>
      {/* Velden hebben expres geen name: er wordt niets verstuurd of bewaard. */}
      <form className="ws-afrekenen" onSubmit={bestellen} autoComplete="off">
        <label>Naam<input required /></label>
        <label>E-mailadres<input type="email" required /></label>
        <label>Adres<input required /></label>
        <label>Postcode en plaats<input required /></label>
        <fieldset>
          <legend>Betaalmethode</legend>
          <label><input type="radio" checked={methode === 'overboeking'} onChange={() => zetMethode('overboeking')} /> Overboeking</label>
          <label><input type="radio" checked={methode === 'crypto'} onChange={() => zetMethode('crypto')} /> Crypto (10% extra korting)</label>
          <label className="ws-uit"><input type="radio" disabled /> iDEAL (tijdelijk niet beschikbaar)</label>
          <label className="ws-uit"><input type="radio" disabled /> Creditcard (tijdelijk niet beschikbaar)</label>
        </fieldset>
        <p className="ws-totaal">Totaal <strong>{euro(totaal)}</strong></p>
        <button type="submit" className="ws-knop">Bestelling plaatsen</button>
      </form>
    </Pagina>
  )
}

export default Afrekenen
