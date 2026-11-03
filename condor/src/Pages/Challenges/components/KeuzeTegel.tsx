import { Link } from 'react-router-dom'
import { icoon } from '../hulp'

/*
  Grote vierkante keuzeknop op het keuzescherm: nummer, icoon, titel, korte uitleg en een pijl.
  - naar:    pagina waar de tegel heen gaat
  - bijKlik: extra actie vóór het navigeren, bijvoorbeeld de sessie starten
  Gebruik: <KeuzeTegel nummer="01" icoonNaam="dossier" titel="CASE EN VRAGEN" uitleg="..." naar="/challenge/case" />
*/
type Props = {
  nummer: string
  icoonNaam: string
  titel: string
  uitleg: string
  naar: string
  bijKlik?: () => void
}

function KeuzeTegel({ nummer, icoonNaam, titel, uitleg, naar, bijKlik }: Props) {
  return (
    <Link to={naar} className="ch-tegel" onClick={bijKlik}>
      <span className="ch-tegel-nummer">{nummer}</span>
      <img className="ch-tegel-icoon" src={icoon(icoonNaam)} alt="" />
      <span className="ch-tegel-titel">{titel}</span>
      <span className="ch-tegel-uitleg">{uitleg}</span>
      <span className="ch-tegel-actie">
        OPEN <img src={icoon('pijl')} alt="" />
      </span>
    </Link>
  )
}

export default KeuzeTegel
