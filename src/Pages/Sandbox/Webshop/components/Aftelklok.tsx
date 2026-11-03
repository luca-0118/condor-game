import { useEffect, useState } from 'react'
import { AFTELKLOK_SECONDEN } from '../data'

/* Telt af en begint bij elke keer openen opnieuw. Dat is een scam-kenmerk. */
function Aftelklok() {
  const [rest, zetRest] = useState(AFTELKLOK_SECONDEN)

  useEffect(() => {
    const klok = setInterval(() => zetRest((r) => Math.max(r - 1, 0)), 1000)
    return () => clearInterval(klok)
  }, [])

  const tijd = `${String(Math.floor(rest / 60)).padStart(2, '0')}:${String(rest % 60).padStart(2, '0')}`
  return <p className="ws-actie">Aanbieding eindigt over <strong>{tijd}</strong></p>
}

export default Aftelklok
