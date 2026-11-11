import { Link } from 'react-router-dom'
import { icoon } from '../hulp'

/*
  Kleine knop om een stap terug te gaan. Je geeft zelf aan waar 'terug' heen gaat,
  zodat de knop altijd naar hetzelfde scherm gaat, ook als iemand de pagina direct opende.
  Gebruik: <TerugKnop naar="/challenge/case">Terug naar de case</TerugKnop>
*/
function TerugKnop({ naar, children = 'Terug' }: { naar: string; children?: string }) {
  return (
    <Link to={naar} className="ch-terugknop">
      <img src={icoon('terug')} alt="" />
      {children}
    </Link>
  )
}

export default TerugKnop
