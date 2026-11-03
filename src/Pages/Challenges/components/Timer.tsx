import { useEffect, useState } from 'react'
import { tijd } from '../hulp'
import { useSessie } from '../sessie/sessieContext'
import StatBlok from './StatBlok'

/*
  Telt op vanaf het moment dat het team de case startte.
  De begintijd komt uit de sessie, dus iedereen in het team ziet straks dezelfde tijd.
*/
function Timer() {
  const { startTijd } = useSessie()
  const [nu, zetNu] = useState(() => Date.now())

  // Elke seconde opnieuw tekenen. Bij het weggaan van de pagina ruimen we de interval op.
  useEffect(() => {
    const id = setInterval(() => zetNu(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const seconden = startTijd ? Math.max(0, Math.floor((nu - startTijd) / 1000)) : 0
  return (
    <StatBlok label="TIMER">
      <time>{tijd(seconden)}</time>
    </StatBlok>
  )
}

export default Timer
