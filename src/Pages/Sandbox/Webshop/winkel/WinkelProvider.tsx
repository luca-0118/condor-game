import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { WinkelContext } from './winkelContext'
import type { Winkel } from './winkelContext'

/* Houdt de gedeelde staat bij en geeft die door aan alles wat erbinnen staat. */
function WinkelProvider({ children }: { children: ReactNode }) {
  const [ontgrendeld, zetOntgrendeld] = useState(false)
  const [popupOpen, zetPopup] = useState(false)
  const [mandje, zetMandje] = useState<Record<string, number>>({})

  const winkel = useMemo<Winkel>(() => ({
    ontgrendeld,
    ontgrendel: () => zetOntgrendeld(true),
    popupOpen,
    zetPopup,
    mandje,
    zetAantal: (id, aantal) => zetMandje((huidig) => {
      const nieuw = { ...huidig }
      if (aantal > 0) nieuw[id] = aantal
      else delete nieuw[id]
      return nieuw
    }),
    leegMandje: () => zetMandje({}),
  }), [ontgrendeld, popupOpen, mandje])

  return <WinkelContext.Provider value={winkel}>{children}</WinkelContext.Provider>
}

export default WinkelProvider
