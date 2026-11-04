import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import {
  findBrowserSiteByDomain,
  findBrowserSiteByPath,
  type BrowserSite,
} from './Databases/googleDatabase'
import { getSearchUrl } from '../../utils/search'
import './GameOverlay.css'

function GameOverlay() {
  return <TopBar />
}

function TopBar() {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [editedAddress, setEditedAddress] = useState<{ location: string; value: string } | null>(null)
  const [siteAddress, setSiteAddress] = useState<{ location: string; value: string } | null>(null)
  const [addressError, setAddressError] = useState<string | null>(null)
  const location = `${pathname}${search}`
  useEffect(() => {
    let active = true
    findBrowserSiteByPath(pathname)
      .then((site) => {
        if (active) {
          setSiteAddress({
            location,
            value: site
              ? `${site.displayurl}${pathname.slice(site.route.length)}${search}`
              : `condor.local${pathname}${search}`,
          })
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to resolve the in-game browser address.', error)
        if (active) {
          setAddressError('Could not load the in-game website database.')
        }
      })

    return () => {
      active = false
    }
  }, [location, pathname, search])
  const address = editedAddress?.location === location
    ? editedAddress.value
    : siteAddress?.location === location
      ? siteAddress.value
      : ''
  const [addressFocused, setAddressFocused] = useState(false)
  const displayedAddress = addressFocused ? address : getAddressWithoutProtocol(address)
  const historyIndex = window.history.state?.idx
  const canGoBack = typeof historyIndex === 'number' && historyIndex > 0
  const canGoForward =
    typeof historyIndex === 'number' && historyIndex < window.history.length - 1

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const enteredAddress = address.trim()
    if (!enteredAddress) return
    setAddressError(null)

    if (enteredAddress.startsWith('/')) {
      navigate(enteredAddress.startsWith('/sandbox') ? enteredAddress : `/sandbox${enteredAddress}`)
      setAddressFocused(false)
      return
    }

    let url: URL
    try {
      url = new URL(
        /^https?:\/\//i.test(enteredAddress) ? enteredAddress : `https://${enteredAddress}`,
      )
    } catch {
      navigate(getSearchUrl(enteredAddress))
      setAddressFocused(false)
      return
    }

    let site: BrowserSite | undefined
    try {
      site = await findBrowserSiteByDomain(url.hostname)
    } catch (error) {
      console.error('Failed to look up the in-game website.', error)
      setAddressError('Could not load the in-game website database.')
      return
    }

    if (site) {
      const path = url.pathname === '/' ? '' : url.pathname
      navigate(`${site.route}${path}${url.search}${url.hash}`)
      setAddressFocused(false)
      return
    }

    navigate(getSearchUrl(enteredAddress))
    setAddressFocused(false)
  }

  return (
    <header className="top-bar">
      <nav className="browser-controls" aria-label="Browser controls">
        <button
          type="button"
          className="browser-control"
          aria-label="Go back"
          title="Go back"
          disabled={!canGoBack}
          onClick={() => navigate(-1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          className="browser-control"
          aria-label="Go forward"
          title="Go forward"
          disabled={!canGoForward}
          onClick={() => navigate(1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14m0 0-7-7m7 7-7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="browser-control"
          aria-label="Reload page"
          title="Reload page"
          onClick={() => navigate(0)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 7v5h-5M4.9 9a7.5 7.5 0 0 1 12.4-2L20 12M4 17v-5h5m10.1 3a7.5 7.5 0 0 1-12.4 2L4 12" />
          </svg>
        </button>
        <Link className="browser-control browser-home" to="/sandbox" aria-label="Sandbox home" title="Sandbox home">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" />
          </svg>
        </Link>
      </nav>
      <form className="browser-address-form" role="search" onSubmit={handleSubmit}>
        <svg className="browser-address-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 22s8-7.2 8-13a8 8 0 1 0-16 0c0 5.8 8 13 8 13Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <input
          aria-label="Search or enter an address"
          value={displayedAddress}
          onChange={(event) => setEditedAddress({ location, value: event.target.value })}
          onFocus={(event) => {
            const input = event.currentTarget
            setAddressFocused(true)
            requestAnimationFrame(() => input.select())
          }}
          onBlur={() => setAddressFocused(false)}
          spellCheck={false}
        />
        <button type="submit" className="browser-go" aria-label="Search or go">
          <SearchIcon aria-hidden="true" />
        </button>
      </form>
      {addressError && <p className="browser-address-error" role="alert">{addressError}</p>}
    </header>
  )
}

function getAddressWithoutProtocol(address: string) {
  return address.replace(/^https?:\/\//i, '')
}

export default GameOverlay
