import { useMemo } from 'react'
import { zoekProduct } from '../hulp'
import { useWinkel } from './winkelContext'

/* Zet het mandje om naar regels met product en aantal, plus het totaal. Gebruikt door Winkelmandje en Afrekenen. */
export function useMandjeRegels() {
  const { mandje } = useWinkel()
  return useMemo(() => {
    const regels = Object.entries(mandje).flatMap(([id, aantal]) => {
      const item = zoekProduct(id)
      return item ? [{ item, aantal }] : []
    })
    return { regels, totaal: regels.reduce((som, r) => som + r.item.prijs * r.aantal, 0) }
  }, [mandje])
}
