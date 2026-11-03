import type { Product } from '../data'
import { euro } from '../hulp'
import { useWinkel } from '../winkel/winkelContext'

function Slot() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

/* Toont de prijs, of een slotje zolang de speler zich niet heeft geregistreerd. */
function Prijs({ item }: { item: Product }) {
  const { ontgrendeld } = useWinkel()
  if (!ontgrendeld) return <p className="ws-prijs ws-prijs-dicht"><Slot /> Prijs na registratie</p>
  return <p className="ws-prijs">{euro(item.prijs)} <s>{euro(item.oudePrijs)}</s></p>
}

export default Prijs
