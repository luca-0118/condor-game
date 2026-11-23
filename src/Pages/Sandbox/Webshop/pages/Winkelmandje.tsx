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
      <Pagina kruimel="Cart">
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/sandbox/monajewelry/all-jewelry" className="ws-knop">Continue shopping</Link>
      </Pagina>
    )
  }

  return (
    <Pagina kruimel="Cart">
      <h1>Cart</h1>
      <ul className="ws-regels">
        {regels.map(({ item, aantal }) => (
          <li key={item.id}>
            <img src={foto(item.foto)} alt="" />
            <Link to={`/sandbox/monajewelry/product/${item.id}`}>{item.naam}</Link>
            <span className="ws-aantal">
              <button type="button" onClick={() => zetAantal(item.id, aantal - 1)} aria-label={`Remove one ${item.naam}`}>−</button>
              {aantal}
              <button type="button" onClick={() => zetAantal(item.id, aantal + 1)} aria-label={`Add one ${item.naam}`}>+</button>
            </span>
            <span>{euro(item.prijs * aantal)}</span>
          </li>
        ))}
      </ul>
      <p className="ws-totaal">Total <strong>{euro(totaal)}</strong></p>
      <Link to="/sandbox/monajewelry/checkout" className="ws-knop">Checkout</Link>
    </Pagina>
  )
}

export default Winkelmandje
