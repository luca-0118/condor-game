import { Link } from 'react-router-dom'
import { huidigeCase } from '../data'
import AdminKnop from './AdminKnop'
import Hoofdstuk from './Hoofdstuk'
import Logo from './Logo'
import Score from './Score'
import Timer from './Timer'
import Voortgang from './Voortgang'

/*
  De balk bovenaan elk challengescherm: logo, case, hoofdstuk, voortgang, score en timer.
  Alle getallen komen uit de sessie, dus deze balk hoef je nooit per pagina aan te passen.
*/
function SpelBalk() {
  return (
    <header className="ch-balk-boven">
      <Link to="/challenge" aria-label="Terug naar het startscherm">
        <Logo />
      </Link>
      <div className="ch-case-label">
        <span>CASE {huidigeCase.code}</span>
        <span>{huidigeCase.titel}</span>
      </div>
      <Hoofdstuk />
      <Voortgang />
      <Score />
      <Timer />
      <AdminKnop />
    </header>
  )
}

export default SpelBalk
