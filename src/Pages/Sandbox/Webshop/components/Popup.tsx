import { useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { useWinkel } from '../winkel/winkelContext'

/* De popup die om je gegevens vraagt voordat je de prijzen ziet. Er wordt niets opgeslagen. */
function Popup() {
  const { popupOpen, zetPopup, ontgrendel } = useWinkel()
  const eersteVeld = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!popupOpen) return
    eersteVeld.current?.focus()
    const sluit = (e: KeyboardEvent) => { if (e.key === 'Escape') zetPopup(false) }
    window.addEventListener('keydown', sluit)
    return () => window.removeEventListener('keydown', sluit)
  }, [popupOpen, zetPopup])

  if (!popupOpen) return null

  const klaar = (e?: FormEvent) => {
    e?.preventDefault()
    ontgrendel()
    zetPopup(false)
  }

  return (
    <div className="ws-laag">
      <div className="ws-popup-achter" onClick={() => zetPopup(false)}>
        <div className="ws-popup" role="dialog" aria-modal="true" aria-labelledby="ws-popup-titel" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="ws-sluit" onClick={() => zetPopup(false)} aria-label="Sluiten">×</button>
          <h2 id="ws-popup-titel">Ontgrendel wholesaleprijzen</h2>
          <form onSubmit={klaar}>
            <label htmlFor="ws-mail">E-mailadres</label>
            <input id="ws-mail" ref={eersteVeld} type="email" required autoComplete="off" />
            <button type="submit" className="ws-knop">Registreer gratis</button>
          </form>
          <button type="button" className="ws-knop ws-knop-licht" onClick={() => klaar()}>Doorgaan met Google</button>
          <p className="ws-klein">Door verder te gaan, ga je akkoord met onze Voorwaarden en ons Privacybeleid.</p>
          <p>Heb je al een account? <button type="button" className="ws-link" onClick={() => klaar()}>Aanmelden</button></p>
        </div>
      </div>
    </div>
  )
}

export default Popup
