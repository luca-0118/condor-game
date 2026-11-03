import { SCORE } from '../data'
import { icoon } from '../hulp'

/* Ster met de score. Expres overal hetzelfde: dat is een van de scam-kenmerken. */
function Score() {
  return <p className="ws-score"><img src={icoon('ster')} alt="" /> {SCORE}</p>
}

export default Score
