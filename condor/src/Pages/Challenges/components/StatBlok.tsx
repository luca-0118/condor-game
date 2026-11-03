import type { ReactNode } from 'react'

/*
  Klein blokje uit de balk bovenaan: grijs label met de waarde eronder.
  Timer, Score en Voortgang gebruiken dit allemaal, zodat ze er hetzelfde uitzien.
*/
function StatBlok({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ch-stat">
      <span className="ch-stat-label">{label}</span>
      <span className="ch-stat-waarde">{children}</span>
    </div>
  )
}

export default StatBlok
