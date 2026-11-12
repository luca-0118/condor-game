import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { alleVragen, huidigeCase } from '../data'
import { SessieContext } from './sessieContext'
import type { Sessie } from './sessieContext'

/*
  Houdt de sessie van het team bij en geeft die door aan alles wat erbinnen staat.
  Backend later: vervang de useState-waarden door data van de server (ophalen met teamId en
  luisteren naar updates, bijvoorbeeld met een websocket). Stuur in vraagGoed() het antwoord
  naar de server, zodat de score bij alle teamleden tegelijk omhoog gaat.
*/
function SessieProvider({ children }: { children: ReactNode }) {
  const [startTijd, zetStartTijd] = useState<number | null>(null)
  const [timerDuur, zetTimerDuur] = useState(60*60)
  const [goed, zetGoed] = useState<Record<string, string>>({})

  // Starten doet maar één keer: wie terugkomt op het startscherm reset de timer niet.
  const startSessie = useCallback(() => zetStartTijd((t) => t ?? Date.now()), [])

  const voegTimerTijdToe = useCallback((seconden: number) => {
    const verstrekenSeconden = startTijd === null
      ? 0
      : Math.floor((Date.now() - startTijd) / 1000)
    zetTimerDuur((duur) => Math.max(duur, verstrekenSeconden) + seconden)
  }, [startTijd])

  // We onthouden alleen welke vragen goed zijn. De score rekenen we daaruit uit, zo kan hij nooit dubbel tellen.
  const vraagGoed = useCallback((vraagId: string, antwoord: string) => {
    zetGoed((oud) => (vraagId in oud ? oud : { ...oud, [vraagId]: antwoord }))
  }, [])

  const waarde = useMemo<Sessie>(() => {
    const aantalGoed = Object.keys(goed).length
    const score = alleVragen.filter((v) => v.id in goed).reduce((som, v) => som + v.punten, 0)
    // Het hoofdstuk is het eerste hoofdstuk waarin nog een vraag openstaat
    const open = huidigeCase.hoofdstukken.find((h) => h.vragen.some((v) => !(v.id in goed)))
    return {
      // Tijdelijke vaste waarden tot de backend sessies uitdeelt
      sessieId: 'lokaal',
      teamId: 'team-1',
      startTijd,
      timerDuur,
      zetTimerDuur,
      voegTimerTijdToe,
      score,
      voortgang: Math.round((aantalGoed / alleVragen.length) * 100),
      hoofdstuk: open?.nummer ?? huidigeCase.hoofdstukken.length,
      goed,
      startSessie,
      vraagGoed,
    }
  }, [startTijd, timerDuur, voegTimerTijdToe, goed, startSessie, vraagGoed])

  return <SessieContext.Provider value={waarde}>{children}</SessieContext.Provider>
}

export default SessieProvider
