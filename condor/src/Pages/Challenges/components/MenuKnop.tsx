import { Link } from 'react-router-dom'
import { icoon } from '../hulp'

/*
  Grote knop uit het startmenu: icoon links, tekst in het midden, pijltje rechts.
  - naar:      pagina waar de knop heen gaat. Zonder 'naar' is de knop uitgeschakeld (functie komt nog).
  - opvallend: rode knop voor de hoofdactie
  - bijKlik:   extra actie vóór het navigeren, bijvoorbeeld de sessie starten
*/
type Props = {
  icoonNaam: string
  children: string
  naar?: string
  opvallend?: boolean
  bijKlik?: () => void
}

function MenuKnop({ icoonNaam, children, naar, opvallend = false, bijKlik }: Props) {
  const klasse = opvallend ? 'ch-menuknop ch-menuknop-rood' : 'ch-menuknop'
  const inhoud = (
    <>
      <img src={icoon(icoonNaam)} alt="" />
      <span>{children}</span>
      <img src={icoon(opvallend ? 'pijl-donker' : 'pijl')} alt="" />
    </>
  )

  if (!naar) {
    return (
      <button type="button" className={klasse} disabled title="Komt nog">
        {inhoud}
      </button>
    )
  }
  return (
    <Link to={naar} className={klasse} onClick={bijKlik}>
      {inhoud}
    </Link>
  )
}

export default MenuKnop
