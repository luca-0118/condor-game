import type { ReactNode } from 'react'
import { SPEL } from '../data'

/* Gedeelde opbouw van het startscherm en het keuzescherm: alles in het midden, disclaimer onderaan. */
function StartLayout({ children }: { children: ReactNode }) {
  return (
    <main className="ch-start">
      <div className="ch-start-midden">{children}</div>
      <p className="ch-disclaimer">{SPEL.disclaimer}</p>
    </main>
  )
}

export default StartLayout
