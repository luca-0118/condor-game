import { MAX_SCORE } from '../data'
import { useSessie } from '../sessie/sessieContext'
import StatBlok from './StatBlok'

/* Score van het team, bijvoorbeeld '20 / 100'. */
function Score() {
  const { score } = useSessie()
  return (
    <StatBlok label="SCORE">
      {String(score).padStart(2, '0')} / {MAX_SCORE}
    </StatBlok>
  )
}

export default Score
