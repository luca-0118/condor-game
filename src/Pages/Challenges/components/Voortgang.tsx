import { useSessie } from '../sessie/sessieContext'
import StatBlok from './StatBlok'

/* Percentage en een balkje dat vol loopt naarmate het team meer vragen goed heeft. */
function Voortgang() {
  const { voortgang } = useSessie()
  return (
    <StatBlok label="PROGRESS">
      <span className="ch-voortgang">
        {voortgang}%
        {/* role en aria-waarden laten een schermlezer het percentage voorlezen */}
        <span className="ch-balk" role="progressbar" aria-label="Voortgang" aria-valuenow={voortgang} aria-valuemin={0} aria-valuemax={100}>
          {/* Bij 0% blijft de balk leeg, daarna loopt hij vol met het percentage */}
          <span style={{ width: `${voortgang}%` }} />
        </span>
      </span>
    </StatBlok>
  )
}

export default Voortgang
