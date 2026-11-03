import { CONTACT_MAIL } from '../data'
import Pagina from '../components/Pagina'

/* De kleine lettertjes. Lees je goed, dan zie je dat de 14 dagen bedenktijd in de praktijk niets voorstelt. */
function Klantenservice() {
  return (
    <Pagina kruimel="Klantenservice">
      <h1>Klantenservice</h1>
      <h2>Contact</h2>
      <p>Mail ons via {CONTACT_MAIL}. We reageren binnen 5 tot 7 werkdagen.</p>
      <h2>Verzenden</h2>
      <p>Bestellingen worden binnen 10 tot 25 werkdagen geleverd vanuit ons internationale magazijn.</p>
      <h2>Retourneren</h2>
      <p>U heeft 14 dagen bedenktijd. Retourzendingen gaan op eigen kosten naar ons logistieke centrum buiten de EU. Afgeprijsde artikelen zijn uitgesloten van retour.</p>
    </Pagina>
  )
}

export default Klantenservice
