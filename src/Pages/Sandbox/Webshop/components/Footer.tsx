import { Link } from 'react-router-dom'
import { CONTACT_MAIL } from '../data'

/*
  Voet van de shop. Er staat bewust geen adres, KvK- of btw-nummer in en het contact loopt
  via een gmail-adres: dat zijn scam-kenmerken die de speler kan opmerken.
*/
function Footer() {
  return (
    <footer className="ws-footer">
      <div>
        <strong>Mona Jewelry</strong>
        <p>Your jeweler for over 60 years.</p>
      </div>
      <div>
        <strong>Service</strong>
        <Link to="/sandbox/monajewelry/customer-service">Customer service</Link>
        <Link to="/sandbox/monajewelry/customer-service">Shipping and returns</Link>
      </div>
      <div>
        <strong>Contact</strong>
        <p>{CONTACT_MAIL}</p>
      </div>
      <p className="ws-copyright">© 2026 Mona Jewelry. All rights reserved.</p>
    </footer>
  )
}

export default Footer
