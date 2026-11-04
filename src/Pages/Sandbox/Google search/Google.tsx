import './Google.css'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'
import { getSearchUrl } from '../../../utils/search'
import {
  googleLensIcon,
  googleLogo,
  profilePlaceholder,
} from './imageAssets'

const leftLinks = [
  { label: 'About', href: '#about' },
  { label: 'Store', href: '#store' },
]

const rightLinks = [
  { label: 'Gmail', href: '#gmail' },
  { label: 'Images', href: '#images' },
]

const footerLeft = ['Advertising', 'Business', 'How Search Works']
const footerMiddle = ['Carbon neutral since 2007']
const footerRight = ['Privacy', 'Terms', 'Settings']

function App() {
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get('q')?.toString().trim() ?? ''
    if (!query) return

    navigate(getSearchUrl(query))
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

          <img className="profile-icon" src={profilePlaceholder} alt="Profile" />
        </nav>
      </header>

      <main className="middle-section">
        <img className="google-logo" src={googleLogo} alt="Google" />

        <form className="search-form" role="search" onSubmit={handleSubmit}>
          <div className="search-form-input">
            <SearchIcon className="search-icon" aria-hidden="true" />
            <label htmlFor="search">Search</label>
            <input type="text" name="q" id="search" autoComplete="off" />
            <img
              className="camera-icon"
              src={googleLensIcon}
              alt="Search by image"
            />
          </div>

          <div className="search-form-buttons">
            <button type="submit">Google Search</button>
            <button type="submit">I'm Feeling Lucky</button>
          </div>
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
