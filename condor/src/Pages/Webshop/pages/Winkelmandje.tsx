import { Link } from 'react-router-dom'
import { euro, foto } from '../hulp'
import { useWinkel } from '../winkel/winkelContext'
import { useMandjeRegels } from '../winkel/useMandjeRegels'
import Pagina from '../components/Pagina'

/* Overzicht van het mandje. Met min en plus pas je het aantal aan, bij 0 valt het product eruit. */
function Winkelmandje() {
  const { zetAantal } = useWinkel()
  const { regels, totaal } = useMandjeRegels()

  if (regels.length === 0) {
    return (
      <Pagina kruimel="Winkelmandje">
        <h1>Winkelmandje</h1>
        <p>Je winkelmandje is leeg.</p>
        <Link to="/webshop/alle-sieraden" className="ws-knop">Verder winkelen</Link>
      </Pagina>
    )
  }

  return (
    <Pagina kruimel="Winkelmandje">
      <h1>Winkelmandje</h1>
      <ul className="ws-regels">
        {regels.map(({ item, aantal }) => (
          <li key={item.id}>
            <img src={foto(item.foto)} alt="" />
            <Link to={`/webshop/product/${item.id}`}>{item.naam}</Link>
            <span className="ws-aantal">
              <button type="button" onClick={() => zetAantal(item.id, aantal - 1)} aria-label={`Eén ${item.naam} minder`}>−</button>
              {aantal}
              <button type="button" onClick={() => zetAantal(item.id, aantal + 1)} aria-label={`Eén ${item.naam} meer`}>+</button>
            </span>
            <span>{euro(item.prijs * aantal)}</span>
          </li>
        ))}
      </ul>
      <p className="ws-totaal">Totaal <strong>{euro(totaal)}</strong></p>
      <Link to="/webshop/afrekenen" className="ws-knop">Afrekenen</Link>
    </Pagina>
  )
}

export default Winkelmandje
