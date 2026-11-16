import { useEffect, useState } from 'react'
import { tijd } from '../hulp'
import { useSessie } from '../sessie/sessieContext'
import StatBlok from './StatBlok'

function Timer() {
  const { startTijd, timerDuur } = useSessie()
  const [nu, zetNu] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => zetNu(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const verstrekenSeconden = startTijd ? Math.floor((nu - startTijd) / 1000) : 0
  const seconden = Math.max(0, timerDuur - verstrekenSeconden)

  return (
    <StatBlok label="TIMER">
      <time>{tijd(seconden)}</time>
    </StatBlok>
  )
}

export default Timer
