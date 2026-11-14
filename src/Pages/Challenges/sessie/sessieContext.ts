import { createContext, useContext } from 'react'

/*
  De sessie is alles wat een team samen deelt: score, voortgang, hoofdstuk en de timer.
  Het idee: een groep van 30 à 40 mensen speelt tegelijk, verdeeld over teams. Iedereen in hetzelfde
  team zit in dezelfde sessie en ziet dus dezelfde score en timer, ook als ze op hun eigen laptop
  vragen beantwoorden of in de sandbox zoeken.

  Nu staat alles nog alleen in het geheugen van deze browser. Als de backend er is, haalt
  SessieProvider de sessie op met het teamId en hoeven de componenten zelf niets te veranderen:
  die lezen alles via useSessie().
*/
export type Sessie = {
  sessieId: string
  teamId: string
  // Moment waarop de case begon (Date.now()), of null als het team nog niet gestart is
  startTijd: number | null
  // Totale timerduur in seconden; kan vanuit elk component binnen de provider worden aangepast
  timerDuur: number
  zetTimerDuur: (seconden: number) => void
  voegTimerTijdToe: (seconden: number) => void
  score: number
  // Percentage van 0 tot 100
  voortgang: number
  hoofdstuk: number
  // Per vraag-id het goede antwoord dat het team invulde. Staat een vraag er niet in, dan is hij nog open.
  // We bewaren de tekst zelf, zodat het antwoord blijft staan als je terugkomt (en teamgenoten het later ook zien).
  goed: Record<string, string>
  startSessie: () => void
  // Aanroepen als iemand een vraag goed heeft. De punten komen uit data.ts, dubbel goed telt niet dubbel.
  vraagGoed: (vraagId: string, antwoord: string) => void
}

export const SessieContext = createContext<Sessie | null>(null)

// Gebruik dit in elk component dat iets van de sessie nodig heeft
export function useSessie() {
  const sessie = useContext(SessieContext)
  if (!sessie) throw new Error('useSessie werkt alleen binnen <SessieProvider>')
  return sessie
}
