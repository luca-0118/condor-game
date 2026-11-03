import './Google-style.css'
import { Link } from 'react-router-dom'

const leftLinks = [
  { label: 'About', href: '#about' },
  { label: 'Store', href: '#store' },
]

const rightLinks = [
  { label: 'Gmail', href: '#gmail' },
  { label: 'Images', href: '#images' },
]

const appLinks = [
  { label: 'Instagram', href: '#instagram' },
  { label: 'Facebook', href: '#facebook' },
  { label: 'Scamwebsite', href: '#scamwebsite' },
  { label: 'ReverseImage', href: '#reverse-image' },
]

const footerLeft = ['Advertising', 'Business', 'How Search Works']
const footerMiddle = ['Carbon neutral since 2007']
const footerRight = ['Privacy', 'Terms', 'Settings']

function App() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="google-page">
      <header className="top-section">
        <nav className="left-side" aria-label="Main navigation">
          {leftLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="right-side" aria-label="User navigation">
          {rightLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}

          <div className="apps-menu">
            <button className="apps-button" type="button" aria-label="Google apps">
              <img className="menu-icon" src="/9dots.png" alt="" />
            </button>
            <div className="dropdown-content">
              {appLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <img className="profile-icon" src="/profile-empty.jpg" alt="Profile" />
        </nav>
      </header>

      <main className="middle-section">
        <img className="google-logo" src="/Google-Logo.png" alt="Google" />

        <form className="search-form" role="search" onSubmit={handleSubmit}>
          <div className="search-form-input">
            <img className="search-icon" src="/search-icon.png" alt="" />
            <label htmlFor="search">Search</label>
            <input type="text" name="search" id="search" autoComplete="off" />
            <img className="mic-icon" src="/mic-icon.png" alt="Voice search" />
            <img
              className="camera-icon"
              src="/google-lens-logo-icon.png"
              alt="Search by image"
            />
          </div>

          <div className="search-form-buttons">
            <button type="submit">Google Search</button>
            <button type="submit">I'm Feeling Lucky</button>
          </div>
          <Link to="/instagram" className="test-link">
            Instagram
          </Link>
          <Link to="/Facebook" className="test-link">
            Facebook
          </Link>
        </form>
      </main>

      <footer className="bottom-section">
        <div className="bottom-left-side">
          {footerLeft.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>

        <div className="bottom-middle-side">
          {footerMiddle.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>

        <div className="bottom-right-side">
          {footerRight.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
