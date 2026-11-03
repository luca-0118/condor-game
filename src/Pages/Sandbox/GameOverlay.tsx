import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import {
  findBrowserSiteByDomain,
  findBrowserSiteByPath,
  mockBrowserSites,
} from '../../data/browserData'
import { getSearchUrl } from '../../utils/search'
import './GameOverlay.css'

function GameOverlay() {
  return <TopBar />
}

function TopBar() {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [editedAddress, setEditedAddress] = useState<{ location: string; value: string } | null>(null)
  const location = `${pathname}${search}`
  const address = editedAddress?.location === location
    ? editedAddress.value
    : getDisplayAddress(pathname, search)
  const historyIndex = window.history.state?.idx
  const canGoBack = typeof historyIndex === 'number' && historyIndex > 0
  const canGoForward =
    typeof historyIndex === 'number' && historyIndex < window.history.length - 1

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const enteredAddress = address.trim()
    if (!enteredAddress) return

    if (enteredAddress.startsWith('/')) {
      navigate(enteredAddress.startsWith('/sandbox') ? enteredAddress : `/sandbox${enteredAddress}`)
      return
    }

    try {
      const url = new URL(
        /^https?:\/\//i.test(enteredAddress) ? enteredAddress : `https://${enteredAddress}`,
      )
      const host = url.hostname.toLowerCase()
      const site = findBrowserSiteByDomain(host)

      if (site) {
        const path = url.pathname === '/' ? '' : url.pathname
        navigate(`${site.route}${path}${url.search}${url.hash}`)
        return
      }

      if (host === 'condor.local') {
        const path = url.pathname === '/' ? '' : url.pathname
        navigate(`${path.startsWith('/sandbox') ? path : `/sandbox${path}`}${url.search}${url.hash}`)
        return
      }
    } catch {
      // Text that is not a recognized in-game address is treated as a search query.
    }

    navigate(getSearchUrl(enteredAddress))
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
          value={address}
          onChange={(event) => setEditedAddress({ location, value: event.target.value })}
          onFocus={(event) => event.currentTarget.select()}
          spellCheck={false}
        />
        <button type="submit" className="browser-go" aria-label="Search or go">
          <SearchIcon aria-hidden="true" />
        </button>
      </form>
    </header>
  )
}

function getDisplayAddress(pathname: string, search: string) {
  const site = findBrowserSiteByPath(pathname, mockBrowserSites)

  if (!site) return `condor.local${pathname}${search}`

  const path = pathname.slice(site.route.length)
  return `${site.domain}${path}${search}`
}

export default GameOverlay
