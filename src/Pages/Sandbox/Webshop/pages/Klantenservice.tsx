import { CONTACT_MAIL } from '../data'
import Pagina from '../components/Pagina'

/* De kleine lettertjes. Lees je goed, dan zie je dat de 14 dagen bedenktijd in de praktijk niets voorstelt. */
function Klantenservice() {
  return (
    <Pagina kruimel="Customer service">
      <h1>Customer service</h1>
      <h2>Contact</h2>
      <p>Email us at {CONTACT_MAIL}. We respond within 5 to 7 business days.</p>
      <h2>Shipping</h2>
      <p>Orders are delivered within 10 to 25 business days from our international warehouse.</p>
      <h2>Returns</h2>
      <p>You have a 14-day cooling-off period. Returns are sent at your own expense to our logistics center outside the EU. Discounted items cannot be returned.</p>
    </Pagina>
  )
}

export default Klantenservice
