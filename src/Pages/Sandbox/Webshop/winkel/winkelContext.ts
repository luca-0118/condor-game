import { createContext, useContext } from 'react'

/*
  Gedeelde staat van de shop: of de prijzen ontgrendeld zijn, of de popup open staat en
  wat er in het winkelmandje zit. Elke pagina en elk component kan dit lezen met useWinkel().
  Alles staat alleen in het geheugen, er wordt niets opgeslagen.
*/
export type Winkel = {
  ontgrendeld: boolean
  ontgrendel: () => void
  popupOpen: boolean
  zetPopup: (open: boolean) => void
  mandje: Record<string, number>
  zetAantal: (id: string, aantal: number) => void
  leegMandje: () => void
}

export const WinkelContext = createContext<Winkel | null>(null)

export function useWinkel() {
  const winkel = useContext(WinkelContext)
  if (!winkel) throw new Error('useWinkel werkt alleen binnen WinkelProvider')
  return winkel
}
